import { deepCopy } from '../../../pi/util/util';
import { Widget } from '../../../pi/widget/widget';
import { getVipMember } from '../../net/pull';
import { getStore, register, setStore } from '../../store/memstore';
import { timestampFormat, unicode2ReadStr } from '../../utils/logic';
import { addressFormat } from '../../utils/tools';

interface Props {
    showDataList:any[];  // 显示数据
    showTitleList:string[];  // 标题
    showDetail:boolean;  // 查看详情
    hBaoDatas:any[]; // 原始海宝数据
    hWangDatas:any[]; // 原始海王数据
    baikDatas:any[]; // 原始白客数据
    hBaoNum:number;  // 海宝数量
    hWangNum:number; // 海王数量
    baikNum:number; // 白客数量
    uid:number;  // uid
    searUid:string;  // 查询的UID
    active:number;
    optionsList:string[]; // 下拉框
    showFilterBox:boolean;  // 展开过滤器
    curShowDataList:any[]; // 当前页显示数据
    curPage:number; // 当前页码
    perPage:number;// 每页多少条数据
}
const UserLabel = ['','市代理','省代理','体验号'];
// 每页多少数据
const perPage = [20,50,100];
/**
 * 会员管理
 */
export class VipManage extends Widget {
    public props:Props = {
        showDataList:[
            // ['123456','张三','15534429570','四川省成都市金牛区XX街道XX小区XX','￥1200','￥1200']
        ],
        showTitleList:['用户ID','微信名','手机号','地址信息','ta的总收益','注册时间','邀请人ID','邀请人昵称'],
        showDetail:false,
        hBaoDatas:[],
        hWangDatas:[],
        baikDatas:[],
        baikNum:0,
        hBaoNum:0,
        hWangNum:0,
        uid:0,
        searUid:'',
        active:0,
        optionsList:['白客','海宝','海王','市代理','省代理','海王（体验）','海宝（体验）'],
        showFilterBox:false,
        curShowDataList:[],
        curPage:0,
        perPage:perPage[0]
    };

    public create() {
        super.create();
        this.getDatas(false);
    }

    // 获取数据  fg为true则强制执行请求getVipMember
    public getDatas(fg:boolean) {
        const vipTotal = getStore('vipTotal',{});
        // 其中一项统计数据不为0表示已经请求过数据 不再重复请求
        if ((vipTotal.hBaoNum || vipTotal.hWangNum || vipTotal.baikNum) && !fg) {  
            this.props.hBaoNum = vipTotal.hBaoNum;
            this.props.hWangNum = vipTotal.hWangNum;
            this.props.baikNum = vipTotal.baikNum;
            this.props.hBaoDatas = vipTotal.hBaoDatas;
            this.props.hWangDatas = vipTotal.hWangDatas;
            this.props.baikDatas = vipTotal.baikDatas;
            this.updateDatas(this.props.active);

            return;
        }
        getVipMember().then(r => {
            vipTotal.hBaoNum = this.props.hBaoNum = r.haib_count;
            vipTotal.hWangNum = this.props.hWangNum = r.haiw_count;
            vipTotal.baikNum = this.props.baikNum = r.baik_count;
            if (r.haib) {
                vipTotal.hBaoDatas = this.props.hBaoDatas = r.haib.map(item => {
                    return [
                        item[0],           // uid
                        unicode2ReadStr(item[1]),           // 微信名
                        item[2],           // 手机号
                        addressFormat(item[3]),           // 地址信息
                        `￥${item[4] / 100}`,            // ta的总收益
                        timestampFormat(item[6]),// 注册时间
                        item[7],// 邀请人ID
                        unicode2ReadStr(item[8]),// 邀请人名字
                        UserLabel[item[5]]     // 标签
                        
                    ];
                });
            }
            if (r.haiw) {
                vipTotal.hWangDatas = this.props.hWangDatas = r.haiw.map(item => {
                    return [
                        item[0],           // uid
                        unicode2ReadStr(item[1]),           // 微信名
                        item[2],           // 手机号
                        addressFormat(item[3]),           // 地址信息
                        `￥${item[4] / 100}`,            // ta的总收益
                        timestampFormat(item[6]),// 注册时间
                        item[7],// 邀请人ID
                        unicode2ReadStr(item[8]),// 邀请人名字
                        UserLabel[item[5]]     // 标签
                    ];
                });
            }
            if (r.baik) {
                vipTotal.baikDatas = this.props.baikDatas = r.baik.map(item => {
                    return [
                        item[0],           // uid
                        unicode2ReadStr(item[1]),           // 微信名
                        item[2],           // 手机号
                        addressFormat(item[3]),           // 地址信息
                        `￥${item[4] / 100}`,            // ta的总收益
                        timestampFormat(item[6]),// 注册时间
                        item[7],// 邀请人ID
                        unicode2ReadStr(item[8]),// 邀请人名字
                        UserLabel[item[5]]     // 标签
                    ];
                });
            }
            setStore('vipTotal', vipTotal);
            this.updateDatas(this.props.active);
        });
    }

    // 查看详情
    public goDetail(e:any) {
        this.props.showDetail = true;
        this.props.uid = e.value[0];
        this.paint();
    }

    // 过滤用户
    public filterUser(e:any) {
        this.props.active = e.value;
        this.props.showFilterBox = false;
        this.updateDatas(e.value);
    }

    // 更新数据
    public updateDatas(num:number) {
        let list = [];
        switch (num) {
            case 0:
                list = this.props.baikDatas;
                break;
            case 1:
                list = this.props.hBaoDatas;
                break;
            case 2:
                list = this.props.hWangDatas.filter(item => {
                    return item[8] === '';
                });
                break;
            case 3:// 市代理 
                list = this.props.hWangDatas.filter(item => {
                    return item[8] === '市代理';
                });
                break;
            case 4:// 省代理 
                list = this.props.hWangDatas.filter(item => {
                    return item[8] === '省代理';
                });
                break;
            case 5:// 海王体验
                list = this.props.hWangDatas.filter(item => {
                    return item[8] === '体验号';
                });
            case 6:// 海宝体验
                list = this.props.hBaoDatas.filter(item => {
                    return item[8] === '体验号';
                });
            default:
        }
        this.props.showDataList = list.map(t => {
            const r = deepCopy(t);
            r.pop(); // 删除最后一项用户类型

            return r;
        });
        this.props.curPage = 0;
        this.changePage({ value:0 });
    }

    // 查询uid输入
    public uidChange(e:any) {
        this.props.searUid = e.value;
    }

    // 返回列表
    public detailBack() {
        this.props.showDetail = false;
        this.paint();
    }

    // 查询
    public search() {
        if (this.props.searUid) {
            const uid = Number(this.props.searUid);
            let res = [];
            res = this.props.hWangDatas.filter(item => item[0] === uid);
            if (res.length === 0) {
                res = this.props.hBaoDatas.filter(item => item[0] === uid);
            }
            if (res.length === 0) {
                res = this.props.baikDatas.filter(item => item[0] === uid);
            }
            this.props.showDataList = res.map(t => {
                const r = deepCopy(t);
                r.pop(); // 删除最后一项用户类型
    
                return r;
            });
            this.changePage({ value:0 });

        } else {
            this.updateDatas(this.props.active);
        }
    }

    // 过滤器展开
    public changeFilterBox(e:any) {
        this.props.showFilterBox = e.value;
        this.paint();
    }

    public pageClick() {
        this.props.showFilterBox = false;
        this.paint();
    }

    // 查看某一页数据
    public changePage(e:any) {
        this.props.curPage = e.value;
        this.props.curShowDataList = this.props.showDataList.slice(e.value * this.props.perPage,e.value * this.props.perPage + this.props.perPage);
        this.paint();
    }

        // 每页展示多少数据
    public perPage(e:any) {
        this.props.perPage = perPage[e.value];
        if (this.props.searUid) {
            this.search();
        } else {
            this.changePage({ value:0 });   
        }
            
    }
}
