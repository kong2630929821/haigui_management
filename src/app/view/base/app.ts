
// ================================ 导入
import { Forelet } from '../../../pi/widget/forelet';
import { getRealNode, paintAttach } from '../../../pi/widget/painter';
import { Widget } from '../../../pi/widget/widget';
import { importArea, importBrand, importFreight, importGoods, importGoodsCate, importInventory, importSupplier, selSupplier } from '../../net/pull';
import { importRead, jsonToExcelConvertor } from '../../utils/tools';

// ================================ 导出
// tslint:disable-next-line:no-reserved-keywords
declare var module: any;
export const forelet = new Forelet();
export const WIDGET_NAME = module.id.replace(/\//g, '-');
interface Props {
    pageList: any[]; 
    supplierList: any[];
}
/**
 * 首页
 */
export class App extends Widget {
    public props: Props;
    constructor() {
        super();
        this.props = {
            pageList:[],
            supplierList:[]
        };
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
    // 获取所有有未发货订单的供应商
    public select_supplier() {
        const supplier = selSupplier();
        this.props.pageList = supplier;
        this.paint();
    }
    // 导出该供应商的所有有未发货订单信息
    public exSupplier() {
        // 调用接口得到json数据JSONData
        const JSONData = '[["订单编号","商品ID","商品名称","商品SKU","商品规格","供货商ID","订单状态"],[1000,100000001, "六角眉笔头", "CK-255da", "177/188", 15231, "待付款"],[2000,200000001, "六角眉笔", "CK-255da", "177/188", 15231, "待付款"]]';
        const FileName = '未发货订单';
        jsonToExcelConvertor(JSONData,FileName);
    }
    // 显示该供应商的所有有未发货订单信息
    public showSupplier(e:any) {
        const dom = getRealNode(e.node);
        // 调用接口得到json数据JSONData
        const JSONData = '[["订单编号","商品ID","商品名称","商品SKU","商品规格","供货商ID","订单状态"],[1000,100000001, "六角眉笔头", "CK-255da", "177/188", 15231, "待付款"],[2000,200000001, "六角眉笔", "CK-255da", "177/188", 15231, "待付款"]]';
        const arr = JSON.parse(JSONData);
        console.log('arr=',arr);
        this.props.supplierList = arr;
        this.paint();
    }
    
}

// ===================================================== 本地

// ===================================================== 立即执行
