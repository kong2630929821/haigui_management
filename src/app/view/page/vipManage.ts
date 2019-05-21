import { deepCopy } from '../../../pi/util/util';
import { Widget } from '../../../pi/widget/widget';
import { getVipMember } from '../../net/pull';
import { unicode2Str } from '../../utils/logic';

interface Props {
    showDataList:any[];  // 数据
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
}
const UserLabel = ['','市代理','省代理'];
/**
 * 会员管理
 */
export class VipManage extends Widget {
    public props:Props = {
        showDataList:[
            // ['123456','张三','15534429570','四川省成都市金牛区XX街道XX小区XX','￥1200','￥1200']
        ],
        showTitleList:['用户ID','姓名','手机号','地址信息','ta的总收益'],
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
        optionsList:['白客','海宝','海王','市代理','省代理']
    };

    public create() {
        super.create();
        this.getDatas();
    }

    // 获取数据
    public getDatas() {
        getVipMember().then(r => {
            this.props.hBaoNum = r.haib_count;
            this.props.hWangNum = r.haiw_count;
            this.props.baikNum = r.baik_count;
            if (r.haib) {
                this.props.hBaoDatas = r.haib.map(item => {
                    return [
                        item[0],           // uid
                        unicode2Str(item[1]),           // 姓名
                        item[2],           // 手机号
                        unicode2Str(item[3]),           // 地址信息
                        `￥${item[4] / 100}`,            // ta的总收益
                        UserLabel[item[5]]       // 标签
                    ];
                });
            }
            if (r.haiw) {
                this.props.hWangDatas = r.haiw.map(item => {
                    return [
                        item[0],           // uid
                        unicode2Str(item[1]),           // 姓名
                        item[2],           // 手机号
                        unicode2Str(item[3]),           // 地址信息
                        `￥${item[4] / 100}`,            // ta的总收益
                        UserLabel[item[5]]       // 标签
                    ];
                });
            }
            if (r.baik) {
                this.props.baikDatas = r.baik.map(item => {
                    return [
                        item[0],           // uid
                        unicode2Str(item[1]),           // 姓名
                        item[2],           // 手机号
                        unicode2Str(item[3]),           // 地址信息
                        `￥${item[4] / 100}`,            // ta的总收益
                        UserLabel[item[5]]       // 标签
                    ];
                });
            }
            this.updateDatas(0);
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
                list = this.props.hWangDatas;
                break;
            case 3:// 市代理 
                list = this.props.hWangDatas.filter(item => {
                    return item[5] === '市代理';
                });
                break;
            case 4:// 省代理 
                list = this.props.hWangDatas.filter(item => {
                    return item[5] === '省代理';
                });
                break;
            default:
        }
        console.log(list);
        this.props.showDataList = list.map(t => {
            const r = deepCopy(t);
            r.pop(); // 删除最后一项用户类型

            return r;
        });
        console.log(list,this.props);
        this.paint();
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
            this.paint();

        } else {
            this.updateDatas(this.props.active);
        }
    }
}