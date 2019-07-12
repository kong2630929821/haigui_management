import { Widget } from '../../../pi/widget/widget';
import { getVipTurnover } from '../../net/pull';

// tslint:disable-next-line:missing-jsdoc
interface Props {
    style:number;
    showDataList:any;// 邀请排名
    showTitleList:any;// 表格标题
    statisticsList:any;// 统计会员列表标题
    shareDataList:any;// 分享排名
    vipCount:any;// 会员统计新增
}
/**
 * 数据统计
 */
export class DataStatistics extends Widget {
    public props:Props = {
        style:0,
        showDataList:[],
        showTitleList:['排名','用户ID','名字','邀请总数'],
        statisticsList:['海王总数','海宝总数','白客总数','市代理总数','省代理总数'],
        shareDataList:[],
        vipCount:[]
    };

    public create() {
        super.create();
        this.init();
    }

    public init() {
        getVipTurnover().then(r => {
            if (r.length) {
                this.props.showDataList = r[0];
                this.props.shareDataList = r[1];
                this.props.vipCount = r[2];
                this.paint();
            }
        });
    }
}