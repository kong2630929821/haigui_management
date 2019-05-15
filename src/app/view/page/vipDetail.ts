import { notify } from '../../../pi/widget/event';
import { Widget } from '../../../pi/widget/widget';
import { getVipDetail } from '../../net/pull';
interface Props {
    userData:any[];  // 个人数据
    showDataList:any[];  // 显示数据
    showTitleList:string[];  // 显示标题
    activeTab:number;  // 活跃tab
    uid:number;  // uid
    hBaoDatas:any[]; // 原始海宝数据
    hWangDatas:any[]; // 原始海王数据
}
/**
 * 会员详情查看
 */
export class VipDetail extends Widget {
    public props:Props = {
        userData: [],
        showDataList:[
            // ['123456','张三','15534429570','四川省成都市金牛区XX街道XX小区XX','￥1200','￥1200']
        ],
        showTitleList:['用户ID','姓名','手机号','地址信息','ta的本月收益','ta的总收益'],
        activeTab:0,
        uid:0,
        hBaoDatas:[],
        hWangDatas:[]
    };

    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        getVipDetail(props.uid).then(r => {
            const v = r.userTotal;
            if (v) {
                this.props.userData = [
                    v[0],
                    v[1],
                    v[2],
                    v[3],
                    v[6],
                    v[7]
                ];
            }
            if (r.haib) {
                this.props.hBaoDatas = r.haib;
            }
            if (r.haiw) {
                this.props.hWangDatas = r.haiw;
            }
            this.props.showDataList = this.props.hBaoDatas;
            this.paint();
        });
    }

    public changeTab(num:number) {
        this.props.activeTab = num;
        this.props.showDataList = num ? this.props.hWangDatas :this.props.hBaoDatas;
        this.paint();
    }

    public goBack(e:any) {
        notify(e.node,'ev-detail-back',{});
    }
}