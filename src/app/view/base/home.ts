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
    goodsManage:'commodityLibrary',// 商品管理
    commodityLibrary:'commodityLibrary',// 商品库onShelves        onShelvesImg       
    productLibrary:'productLibrary',// 商品详情
    importExcel: 'importExcel', // 导入Excel
    totalOrders: 'totalOrders', // 所有订单
    returnGoods:'returnGoods', // 退货
    withdraw: 'withdraw',  // 提现
    openHWang: 'openHWang', // 开通海王
    vipManage: 'vipManage', // 会员
    platformSettings:'platformSettings',// 平台设置
    classSetting:'classSetting',// 分类设置
    brandSetting:'brandSetting',// 品牌设置
    mallSetting:'mallSetting' // 商城设置
};

// tslint:disable-next-line:completed-docs
export class Home extends Widget {
    public ok: () => void;
    public props: Props;
    constructor() {
        super();
        this.props = {
            pageList: [
                { name: '平台设置', page: PAGE.platformSettings, img:'chart.png',children:[
                    { name:'供应商设置',page:PAGE.platformSettings },
                    { name:'分类设置',page:PAGE.classSetting },
                    { name:'品牌设置',page:PAGE.brandSetting },
                    { name:'商场设置',page:PAGE.mallSetting }],
                    show:true 
                },
                { name: '商品管理', page: PAGE.commodityLibrary, img:'chart.png',children:[
                    { name:'商品库',page:PAGE.commodityLibrary },
                    { name:'产品库',page:PAGE.productLibrary }],
                    show:false 
                },
                { name: '商品信息', page: PAGE.goodsInfo, img:'chart.png' },
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
        
        this.props.activePage = this.props.pageList[0].children[3];
    }

    // 切换默认过滤器页面
    public changePage(num: number) {
        this.props.activePage = this.props.pageList[num];
        // 是否展开子页面
        if (this.props.pageList[num].show) {
            this.props.pageList[num].show = false;
        } else {
            this.props.pageList[num].show = true;
        }
        this.paint();
    }
    // 切换过滤器的子页面
    public changeChildrenPage(num:number,index:number) {
        this.props.activePage = this.props.pageList[num].children[index];
        this.paint();
    }
}