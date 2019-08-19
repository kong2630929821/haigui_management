import { popNew } from '../../../pi/ui/root';
import { notify } from '../../../pi/widget/event';
import { Widget } from '../../../pi/widget/widget';
import { perPage } from '../../components/pagination';
import { changeBindding, getAmountDetail, getUserLevelChange, getVipDetail,  userLevelChange } from '../../net/pull';
import { popNewMessage, priceFormat, timestampFormat, unicode2ReadStr, unicode2Str } from '../../utils/logic';
import { addressFormat, exportExcel, getUserType, rippleShow } from '../../utils/tools';
interface Props {
    userData:any[];  // 个人数据
    showDataList:any[];  // 显示数据
    showTitleList:string[];  // 显示标题
    activeTab:number;  // 活跃tab
    uid:number;  // uid
    hBaoDatas:any[]; // 原始海宝数据
    hWangDatas:any[]; // 原始海王数据
    baikDatas:any[]; // 原始百科数据
    userLabel:string;  // 查看用户的标签
    curShowDataList:any[]; // 当前页显示数据
    curPage:number; // 当前页码
    fundDetails:any[];// 资金明细
    seaShell:any[];// 海贝
    integral:any[];// 积分
    userShowDataList:any[];// 用户等级变更信息
    userTitleList:any[];// 用户等级变更信息标题
    currendUid:number;// 当前查看的用户ID
    status:boolean;// true显示详情 false显示下级资金明细
    perPage:number;// 每页多少条数据
    expandIndex:boolean;// 分页下拉显示
    perPageIndex:number;// 一页显示多少个的下标
    indirectPeople:number;// 间推人数   
    title:any; 
}
const UserTypeLabel = ['白客','海宝','海宝（体验）','海王','市代理','省代理','海王（体验）'];
const tableTitle = [
    ['用户ID','微信名','手机号','注册时间','身份','地址','ta的本月收益','ta的总收益'],
    ['时间','类型','金额','备注'],
    ['时间','类型','海贝','备注'],
    ['时间','类型','积分','备注']

];
const showData = [
    { title:'资金',num:0,note:'' },
    { title:'海贝',num:1,note:'' },
    { title:'积分',num:2,note:'' }
];

/**
 * 会员详情查看
 */
export class VipDetail extends Widget {
    public props:Props = {
        userData: [],
        showDataList:[
            // ['123456','张三','15534429570','四川省成都市金牛区XX街道XX小区XX','￥1200','￥1200']
        ],
        showTitleList:tableTitle[0],
        activeTab:0,
        uid:0,
        hBaoDatas:[],
        hWangDatas:[],
        baikDatas:[],
        userLabel:'',
        curShowDataList:[],
        curPage:0,
        fundDetails:[],
        seaShell:[],
        integral:[],
        userShowDataList:[],
        userTitleList:['用户id','改动之前等级','改动之后等级','邀请人id','邀请人昵称','类型'],
        currendUid:0,
        status:true,
        perPage:perPage[0],
        expandIndex:false,
        perPageIndex:0,
        indirectPeople:0,
        title:['海王','海宝','白客','资金明细','海贝明细','积分明细']
    };

    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        console.log(props);
        this.init();
    }
    // tslint:disable-next-line:max-func-body-length
    public init() {
        this.props.hWangDatas = [];
        this.props.hBaoDatas = [];
        this.props.baikDatas = [];
        getVipDetail(this.props.uid).then(r => {
            const v = r.userTotal;
            this.props.indirectPeople = r.inderect_invite;
            if (v) {
                // 获取用户身份
                const user = getUserType(v[9],v[10]);
                this.props.userLabel = user;
                this.props.userData = [
                    { th:'用户ID',td:v[0] },
                    { th:'注册时间',td:timestampFormat(v[8]) },
                    { th:'姓名',td:unicode2Str(v[7][0]) },
                    { th:'微信名',td:unicode2ReadStr(v[1]) },
                    { th:'身份',td:user },
                    { th:'手机号',td:v[2] },
                    { th:'资产信息',td:`现金(￥${priceFormat(v[6][0])}) 海贝(${v[6][1]}) 积分(${v[6][2]})` },
                    { th:'本月收益',td:`现金(￥${priceFormat(v[4][0])}) 海贝(${v[4][1]}) 积分(${v[4][2]})` },
                    { th:'总收益',td:`现金(￥${priceFormat(v[5][0])}) 海贝(${v[5][1]}) 积分(${v[5][2]})` },
                    { th:'地址信息',td:addressFormat(unicode2Str(v[3])) },
                    { th:'身份证号',td:v[7][1] },
                    { th:'邀请码',td:v[11] },
                    { th:'最新关系变动时间',td:timestampFormat(v[13]) }
                ];
            } 
            if (r.sub_tree) {
                r.sub_tree[0][2].length && r.sub_tree[0][2].forEach(v => {
                    const data = [
                        v[0],  // UID
                        unicode2ReadStr(v[1][0]),  // 微信名
                        v[1][1],  // 手机
                        timestampFormat(v[1][2]),  // 注册时间
                        getUserType(v[1][3],v[1][4]),// 身份
                        addressFormat(v[1][5]),// 地址
                        `现金(￥${priceFormat(v[1][6][0])}) 海贝(${v[1][6][1]}) 积分(${v[1][6][2]})`,// 本月收益
                        `现金(￥${priceFormat(v[1][7][0])}) 海贝(${v[1][7][1]}) 积分(${v[1][7][2]})`// 总收益
                    ];
                    if (v[1][3] === 1) {
                        // 海王
                        this.props.hWangDatas.push(data);
                    } else if (v[1][3] === 2) {
                        // 海宝
                        this.props.hBaoDatas.push(data);
                    } else {
                        // 白客
                        this.props.baikDatas.push(data);
                    }
                });
            }
            this.changeTab(0);
            this.paint();
        });
        // 获取当前用户资金明细
        getAmountDetail(this.props.uid,1).then(r => {
            this.props.fundDetails = r;
            this.paint();
        });
        // 获取当前用户海贝明细
        getAmountDetail(this.props.uid,2).then(r => {
            this.props.seaShell = r;
            this.paint();
        });
        // 获取当前用户积分明细
        getAmountDetail(this.props.uid,3).then(r => {
            this.props.integral = r;
            this.paint();
        });
        // 获取用户等级变动详细
        this.userLevel();
    }
    // 切换
    public changeTab(num:number) {
        this.props.activeTab = num;
        this.props.showTitleList = tableTitle[0];
        switch (num) {
            case 0:
                this.props.showDataList = this.props.hWangDatas;
                break;
            case 1:
                this.props.showDataList = this.props.hBaoDatas;
                break;
            case 2:
                this.props.showDataList = this.props.baikDatas;
                break;
            case 3:// 资金 
                this.props.showDataList = this.props.fundDetails;
                this.props.showTitleList = tableTitle[1];
                break;
            case 4:// 海贝 
                this.props.showDataList = this.props.seaShell;
                this.props.showTitleList = tableTitle[2];
                break;
            case 5:// 积分 
                this.props.showDataList = this.props.integral;
                this.props.showTitleList = tableTitle[3];
                break;
            default:
        }
        this.props.curPage = 0;
        this.changePage({ value:0 });
    }

    // 升级 
    public upUserType(e:any,num:number,level:number,label:any) {// e,下标，等级，标签
        popNew('app-components-modalBox',{ content:`将用户“<span style="color:#1991EB">${this.props.userData[2].td}</span>”升级至${UserTypeLabel[num]}` },() => {
            userLevelChange(this.props.uid,level,label).then(r => {
                if (r.result === 1) {
                    popNewMessage('升级成功');
                    this.props.userLabel = this.props.userData[4].td = UserTypeLabel[num];
                    this.userLevel();
                    this.paint();
                    notify(e.node,'ev-change-userType',{});
                } else {
                    popNewMessage('升级失败');
                }
                
            }).catch(e => {
                popNewMessage('升级失败');
            });
        });
    }

    // 降级
    public dnUserType(e:any,num:number,level:number,label:any) {
        popNew('app-components-modalBox',{ content:`将用户“<span style="color:#1991EB">${this.props.userData[2].td}</span>”降级至${UserTypeLabel[num]}` },() => {
            userLevelChange(this.props.uid,level,label).then(r => {
                if (r.result === 1) {
                    popNewMessage('降级成功');
                    this.props.userLabel = this.props.userData[4].td = UserTypeLabel[num];
                    this.userLevel();
                    this.paint();
                    notify(e.node,'ev-change-userType',{});
                } else {
                    popNewMessage('降级失败');
                }
               
            }).catch(e => {
                popNewMessage('降级失败');
            });
        });
    }

    public goBack(e:any) {
        notify(e.node,'ev-detail-back',{});
    }

     // 查看某一页数据
    public changePage(e:any) {
        this.props.curPage = e.value;
        this.props.curShowDataList = this.props.showDataList.slice(e.value * this.props.perPage,e.value * this.props.perPage + this.props.perPage);
        this.paint();
    }

    public changeMoney() {
        console.log(this.props.userData[6]);
        const uid = this.props.userData[0].td;
        const data = this.props.userData[6].td;
        const arr = data.split(' ');
        showData[0].num = arr[0].substring(4,arr[0].length - 1);
        showData[1].num = arr[1].substring(3,arr[1].length - 1);
        showData[2].num = arr[2].substring(3,arr[2].length - 1);
        popNew('app-components-modifyFunds',{ showData ,uid },(r) => {
            console.log(r);
        },() => {
            this.init();
        });
    }

    // 更改绑定人
    public changeBinding(e:any) {
        popNew('app-components-modalBox',{ title:'将用户的邀请人更改为',style:true,uid:this.props.userData[0].td },() => {
            notify(e.node,'ev-change-userType',{});
        });
    }

    // 获取用户等级变动详细
    public userLevel() {     
        getUserLevelChange(this.props.uid).then(r => {
            if (r.length) {
                this.props.userShowDataList = r;
                this.paint();
            }
        });
    }

    // 查看下级的明细
    public goDetail(e:any) {
        this.props.currendUid = e.value[0];
        this.props.status = false;
        this.paint();
    }

    // 下级明细放回
    public getDatas() {
        this.props.status = true;
        this.paint();
    }
        // 每页展示多少数据
    public perPage(e:any) {
        this.props.perPage = e.value; 
        this.props.expandIndex = false;
        this.props.perPageIndex = e.index;
        this.changePage({ value:0 });   
    }
    
    // 过滤器
    public expand(e:any) {
        this.props.expandIndex = e.value;
        this.paint();
    }
    
    // 页面点击
    public close() {
        this.props.expandIndex = false;
        this.paint();
    }

    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }

    // 导出全部数据
    public exportAllInfo() {
        const jsonHead = this.props.showTitleList;
        const aoa = [jsonHead];
        const jsonData = this.props.showDataList;
        for (const v of jsonData) {
            for (let i = 0;i < v.length;i++) {
                if (v[i]) {
                    v[i] = v[i].toString();
                }  
            }
            aoa.push(v);
        }
        console.log(aoa);
        exportExcel(aoa,`${this.props.title[this.props.activeTab]}信息.xlsx`);
    }
}