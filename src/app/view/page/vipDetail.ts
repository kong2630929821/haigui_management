import { popNew } from '../../../pi/ui/root';
import { notify } from '../../../pi/widget/event';
import { Widget } from '../../../pi/widget/widget';
import { getVipDetail, setHwangLabel } from '../../net/pull';
import { popNewMessage, priceFormat, timestampFormat, unicode2ReadStr, unicode2Str } from '../../utils/logic';
import { addressFormat } from '../../utils/tools';
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
}
const userType = ['','海王','海宝','白客'];
const UserLabel = ['海王','市代理','省代理'];
const showData = [
    { title:'资金',num:0 },
    { title:'海贝',num:1 },
    { title:'积分',num:2 }
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
        showTitleList:['用户ID','微信名','手机号','地址信息','ta的本月收益','ta的总收益'],
        activeTab:0,
        uid:0,
        hBaoDatas:[],
        hWangDatas:[],
        baikDatas:[],
        userLabel:'',
        curShowDataList:[],
        curPage:0
    };

    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        console.log(props);
        getVipDetail(props.uid).then(r => {
            const v = r.userTotal;
            if (v) {
                let user = userType[v[9]];
                if (v[9] === 1) {  // 海王有标签 省代理 市代理
                    user = UserLabel[v[10]];
                }
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
                    { th:'身份证号',td:v[7][1] }
                ];
            }
            if (r.haib) {
                this.props.hBaoDatas = r.haib.map(v => {
                    return [
                        v[0],  // UID
                        unicode2ReadStr(v[1]),  // 微信名
                        v[2],  // 手机
                        addressFormat(v[3]),  // 地址
                        priceFormat(v[4]),  // 本月收益
                        priceFormat(v[5])   // 总收益
                    ];
                });
            }
            if (r.haiw) {
                this.props.hWangDatas = r.haiw.map(v => {
                    return [
                        v[0],  // UID
                        unicode2ReadStr(v[1]),  // 微信名
                        v[2],  // 手机
                        addressFormat(v[3]),  // 地址
                        priceFormat(v[4]),  // 本月收益
                        priceFormat(v[5])   // 总收益
                    ];
                });
            }
            if (r.baik) {
                this.props.baikDatas = r.baik.map(v => {
                    return [
                        v[0],  // UID
                        unicode2ReadStr(v[1]),  // 微信名
                        v[2],  // 手机
                        addressFormat(v[3]),  // 地址
                        priceFormat(v[4]),  // 本月收益
                        priceFormat(v[5])   // 总收益
                    ];
                });
            }
            this.changeTab(0);
            this.paint();
        });
    }

    // 切换
    public changeTab(num:number) {
        this.props.activeTab = num;
        if (num === 0) {
            this.props.showDataList = this.props.hWangDatas;
        } else if (num === 1) {
            this.props.showDataList = this.props.hBaoDatas;
        } else {
            this.props.showDataList = this.props.baikDatas;
        }
        this.props.curPage = 0;
        this.changePage({ value:0 });
    }

    // 升级 
    public upUserType(e:any,num:number) {
        popNew('app-components-modalBox',{ content:`将用户“<span style="color:#1991EB">${this.props.userData[2].td}</span>”升级至${UserLabel[num]}` },() => {
            setHwangLabel(this.props.uid,num).then(r => {
                popNewMessage('升级成功');
                this.props.userLabel = this.props.userData[4].td = UserLabel[num];
                this.paint();
                notify(e.node,'ev-change-userType',{});
            });
        });
    }

    // 降级
    public dnUserType(e:any,num:number) {
        popNew('app-components-modalBox',{ content:`将用户“<span style="color:#1991EB">${this.props.userData[2].td}</span>”降级至${UserLabel[num]}` },() => {
            setHwangLabel(this.props.uid,num).then(r => {
                popNewMessage('降级成功');
                this.props.userLabel = this.props.userData[4].td = UserLabel[num];
                this.paint();
                notify(e.node,'ev-change-userType',{});
            });
        });
    }

    public goBack(e:any) {
        notify(e.node,'ev-detail-back',{});
    }

     // 查看某一页数据
    public changePage(e:any) {
        this.props.curPage = e.value;
        this.props.curShowDataList = this.props.showDataList.slice(e.value * 5,e.value * 5 + 5);
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
            this.paint();
        });
    }
}