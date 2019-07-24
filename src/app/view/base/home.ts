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
    dataStatistics:'dataStatistics',// 数据统计
    operationLog:'operationLog',// 操作日志
    accountSettings:'accountSettings',// 账号设置
    activitySettings:'activitySettings',// 活动设置-大转盘设置
    invitationSettings:'invitationSettings',// 邀请设置
    rebateSetting:'rebateSetting',// 返利设置
    withdrawalSetting:'withdrawalSetting',// 提现设置
    hBaoGoodsSetting:'hBaoGoodsSetting', // 399（海宝）商品设置
    hBaoGoodsList:'hBaoGoodsList'   // 399（海宝）商品列表
};

// tslint:disable-next-line:completed-docs
export class Home extends Widget {
    public ok: () => void;
    public props: Props;
    constructor() {
        super();
        this.props = {
            pageList: [
                // { name: '活动设置', page: PAGE.activitySettings, img:'chart.png',children:[
                //     { name:'大转盘设置',page:PAGE.activitySettings },
                //     { name:'邀请奖励设置',page:PAGE.invitationSettings },
                //     { name:'返利设置',page:PAGE.rebateSetting }],
                //     show:true 
                // },
                {name:'系统设置',page:PAGE.accountSettings,img:'chart.png',children:[
                    { name: '账号设置', page: PAGE.accountSettings, img:'chart.png' } // ,
                    // { name: '数据统计', page: PAGE.dataStatistics, img:'chart.png' },
                    // { name: '操作日志', page: PAGE.operationLog, img:'chart.png' }
                ],
                    show:false
                },
                { name: '平台设置', page: PAGE.platformSettings, img:'chart.png',children:[
                    { name:'供应商设置',page:PAGE.platformSettings,img:'chart.png' },
                    { name:'分类设置',page:PAGE.classSetting,img:'chart.png' },
                    { name:'品牌设置',page:PAGE.brandSetting,img:'chart.png' },
                    { name:'提现设置',page:PAGE.withdrawalSetting,img:'chart.png' }],
                    show:true 
                },
                { name: '商品管理', page: PAGE.commodityLibrary, img:'chart.png',children:[
                    { name:'商品库',page:PAGE.commodityLibrary },
                    { name:'SKU库',page:PAGE.productLibrary }],
                    show:false 
                },
                { name: '399商品', page: PAGE.hBaoGoodsList, img:'chart.png',children:[
                    { name: '399商品列表', page: PAGE.hBaoGoodsList, img:'chart.png' },
                    { name: '绑定商户邀请码', page: PAGE.hBaoGoodsSetting, img:'chart.png' }
                ] },
                // { name: '导入Excel', page: PAGE.importExcel, img:'chart.png'  },
                { name: '所有订单', page: PAGE.totalOrders, img:'chart.png' },
                { name: '开通海王', page: PAGE.openHWang, img:'chart.png'  },
                { name: '退货', page: PAGE.returnGoods, img:'chart.png' },
                { name: '提现', page: PAGE.withdraw, img:'chart.png' },
                { name: '会员', page: PAGE.vipManage, img:'chart.png' }
            ],
            activePage: {},
            rightBox:true
        };
        
        this.props.activePage = this.props.pageList[1];
    }

    // 切换默认过滤器页面
    public changePage(num: number) {
        const res = this.props.pageList[num];
        // 是否展开子页面
        if (res.children && res.children.length > 0) {
            res.show = !res.show;
        } else {
            this.props.activePage = res;
        }
        this.paint();
    }

    // 切换过滤器的子页面
    public changeChildrenPage(num:number,index:number) {
        this.props.activePage = this.props.pageList[num].children[index];
        this.paint();
    }
}