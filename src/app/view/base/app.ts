
// ================================ 导入
import { Forelet } from '../../../pi/widget/forelet';
import { getRealNode, paintAttach } from '../../../pi/widget/painter';
import { Widget } from '../../../pi/widget/widget';
import { getOrder, getRreturnGoods, importArea, importBrand, importFreight, importGoods, importGoodsCate, importInventory, importSupplier, importTransport, selSupplier } from '../../net/pull';
import { importRead, jsonToExcelConvertor } from '../../utils/tools';

// ================================ 导出
// tslint:disable-next-line:no-reserved-keywords
declare var module: any;
export const forelet = new Forelet();
export const WIDGET_NAME = module.id.replace(/\//g, '-');
interface Props {
    contentList: any[]; 
    supplierList: any[];
    pageList: any[]; // 默认过滤器
    activePage: any;  // 当前活跃的页面
}
const PAGE = {
    database: 'database', // 数据库
    shell: 'shellFunc', // shell查询
    rpc: 'rpcFunc', // rpc操作
    topic:'topicSub', // topic主题
    log: 'logHistory',  // 日志查看
    user: 'userManage' // 用户管理
};

/**
 * 首页
 */
export class App extends Widget {
    public props: Props;
    constructor() {
        super();
        this.props = {
            activePage: {},
            contentList:[],
            supplierList:[],
            pageList: [
                { name: '数据库', page: PAGE.database, img:'chart.png' },
                { name: 'SHELL查询', page: PAGE.shell, img:'chart.png' },
                { name: 'rpc操作', page: PAGE.rpc, img:'chart.png' },
                { name: 'topic订阅', page: PAGE.topic, img:'chart.png' },
                { name: '日志查看', page: PAGE.log, img:'chart.png' },
                { name: '用户管理', page: PAGE.user, img:'chart.png' }
            ]
        };
    }

    // 切换默认过滤器页面
    public changePage(num: number) {
        this.props.activePage = this.props.pageList[num];
        this.paint();
    }
    
    // 导入运费
    public imFreight(e:any) {
        const dom = getRealNode(e.node);
        if (!dom.files) {
            return;
        }
        const f = dom.files[0];
        importRead(f,(res) => {
            importFreight(res);
        });
        
    }
    // 导入分类
    // tslint:disable-next-line:max-func-body-length
    public imGoodsCate(e:any) {
        const dom = getRealNode(e.node);
        if (!dom.files) {
            return;
        }
        const f = dom.files[0];
        importRead(f,(res) => {
            importGoodsCate(res);
        });
        
    }
    // 导入商品
    public imGoods(e:any) {
        const dom = getRealNode(e.node);
        if (!dom.files) {
            return;
        }
        const f = dom.files[0];
        importRead(f,(res) => {
            importGoods(res);
        });
        
    }
    // 导入供应商
    public imSupplier(e:any) {
        const dom = getRealNode(e.node);
        if (!dom.files) {
            return;
        }
        const f = dom.files[0];
        importRead(f,(res) => {
            importSupplier(res);
        });
        
    }
    // 导入地区信息
    public imArea(e:any) {
        const dom = getRealNode(e.node);
        if (!dom.files) {
            return;
        }
        const f = dom.files[0];
        importRead(f,(res) => {
            importArea(res);
        });
        
    }
    // 导入品牌信息
    public imBrand(e:any) {
        const dom = getRealNode(e.node);
        if (!dom.files) {
            return;
        }
        const f = dom.files[0];
        importRead(f,(res) => {
            importBrand(res);
        });
        
    }
    // 导入库存信息
    public imInventory(e:any) {
        const dom = getRealNode(e.node);
        if (!dom.files) {
            return;
        }
        const f = dom.files[0];
        importRead(f,(res) => {
            importInventory(res);
        });
    }
    // 导入运单信息
    public imTransport(e:any) {
        const dom = getRealNode(e.node);
        if (!dom.files) {
            return;
        }
        const f = dom.files[0];
        importRead(f,(res) => {
            importTransport(res);
        });
    }
    // 获取所有有未发货订单的供应商
    public select_supplier() {
        selSupplier().then(supplier => {
            this.props.contentList = supplier;
            this.paint();
            this.showSupplier(null,supplier[0]);
        });
    }
    // 导出该供应商的所有有未发货订单信息
    public exSupplier() {
        // 调用接口得到json数据JSONData
        const JSONData = '[["订单编号","商品ID","商品名称","商品SKU","商品规格","供货商ID","订单状态","订单用户ID","用户姓名","用户电话","用户地址","物流单号"],[1000,100000001, "六角眉笔头", "CK-255da", "177/188", 15231, "待付款",11101,"张三","131234597","四川省成都市"],[2000,200000001, "六角眉笔", "CK-255da", "177/188", 15231, "待付款",11101,"李四","131234597","四川省成都市"]]';
        const FileName = '未发货订单';
    }
    // 显示该供应商的所有有未发货订单信息
    public showSupplier(e:any,supplierId:any) {
        const order = getOrder(supplierId,2);
        console.log(order);
        // let JSONData = '';
        // if (supplierId) {
        //     JSONData = '[["订单编号","商品ID","商品名称","商品SKU","商品规格","供货商ID","订单状态","订单用户ID","用户姓名","用户电话","用户地址","物流单号"]]';
        //     const arr = JSON.parse(JSONData);
        //     console.log('arr=',arr);
        //     this.props.supplierList = arr;
        //     this.paint();
            
        //     return;
        // } 
        // const dom = getRealNode(e.node);
        
        // if (dom.value === '1hao') {
        //     JSONData = '[["订单编号","商品ID","商品名称","商品SKU","商品规格","供货商ID","订单状态","订单用户ID","用户姓名","用户电话","用户地址","物流单号"],[1000,100000001, "六角眉笔头", "CK-255da", "177/188", 15231, "待付款",11101,"张三","131234597","四川省成都市"],[2000,200000001, "六角眉笔", "CK-255da", "177/188", 15231, "待付款",11101,"李四","131234597","四川省成都市"]]';
        // } else if (dom.value === '2hao') {
        //     JSONData = '[["订单编号","商品ID","商品名称","商品SKU","商品规格","供货商ID","订单状态","订单用户ID","用户姓名","用户电话","用户地址","物流单号"],[2000,200000001, "六角眉笔", "CK-255da", "177/188", 15231, "待付款",11101,"李四","131234597","四川省成都市"]]';
        // }
        // // 调用接口得到json数据JSONData
        // const arr = JSON.parse(JSONData);
        // console.log('arr=',arr);
        // this.props.supplierList = arr;
        // this.paint();
    }
    public getReturnGoods() {
        getRreturnGoods();
    }
    
}

// ===================================================== 本地

// ===================================================== 立即执行
