/**
 * 默认数据库
 */

// ================================================ 导入
import { Forelet } from '../../../pi/widget/forelet';
import { Widget } from '../../../pi/widget/widget';

// ================================================ 导出
export const forelet = new Forelet();

interface Props {
    activePage: any;  // 当前活跃的页面
    pageList: any[]; // 默认过滤器
    rightBox:boolean;  // 是否显示rightbox页面
}
const PAGE = {
    goodsInfo: 'goodsInfo', // 商品信息
    importExcel: 'importExcel', // 导入Excel
    totalOrders: 'totalOrders', // 所有订单
    returnGoods:'returnGoods', // 退货
    withdraw: 'withdraw',  // 提现
    openHWang: 'openHWang', // 开通海王
    vipManage: 'vipManage' // 会员
};

// tslint:disable-next-line:completed-docs
export class Home extends Widget {
    public ok: () => void;
    public props: Props;
    constructor() {
        super();
        this.props = {
            pageList: [
                { name: '商品信息', page: PAGE.goodsInfo, img:'chart.png'  },
                { name: '导入Excel', page: PAGE.importExcel, img:'chart.png'  },
                { name: '所有订单', page: PAGE.totalOrders, img:'chart.png' },
                { name: '退货', page: PAGE.returnGoods, img:'chart.png' },
                { name: '提现', page: PAGE.withdraw, img:'chart.png' },
                { name: '开通海王', page: PAGE.openHWang, img:'chart.png'  },
                { name: '会员', page: PAGE.vipManage, img:'chart.png' }
                
            ],
            activePage: {},
            rightBox:true
        };
        this.props.activePage = this.props.pageList[6];
    }

    // 切换默认过滤器页面
    public changePage(num: number) {
        this.props.activePage = this.props.pageList[num];
        this.paint();
    }
}