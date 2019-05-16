import { Widget } from '../../../pi/widget/widget';
import { getVipMember } from '../../net/pull';

interface Props {
    showDataList:any[];  // 数据
    showTitleList:string[];  // 标题
    showDetail:boolean;  // 查看详情
    hBaoDatas:any[]; // 原始海宝数据
    hWangDatas:any[]; // 原始海王数据
    hBaoNum:number;  // 海宝数量
    hWangNum:number; // 海王数量
    uid:number;  // uid
    active:number;
}
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
        hBaoNum:0,
        hWangNum:0,
        uid:0,
        active:0
    };

    public getDatas() {
        getVipMember().then(r => {
            this.props.hBaoNum = r.haib_count;
            this.props.hWangNum = r.haiw_count;
            if (r.haib) {
                this.props.hBaoDatas = r.haib;
            }
            if (r.haiw) {
                this.props.hWangDatas = r.haiw;
            }
            this.props.showDataList = this.props.active ? this.props.hBaoDatas :this.props.hWangDatas;
            this.paint();
        });
    }

    // 查看详情
    public goDetail(e:any) {
        this.props.showDetail = true;
        this.props.uid = e.value[0];
        this.paint();
    }

    // 切换海王 海宝
    public filterUser(e:any) {
        this.props.active = e.value;
        this.props.showDataList = e.value ? this.props.hBaoDatas :this.props.hWangDatas;
        this.paint();
    }

    // 返回列表
    public detailBack() {
        this.props.showDetail = false;
        this.paint();
    }

    // 查询
    public search() {
        this.getDatas();
    }
}