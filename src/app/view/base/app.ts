
// ================================ 导入
import { Forelet } from '../../../pi/widget/forelet';
import { getRealNode } from '../../../pi/widget/painter';
import { Widget } from '../../../pi/widget/widget';
import { importArea, importBrand, importFreight, importGoods, importGoodsCate, importSupplier, importInventory } from '../../net/pull';
import { importRead } from '../../utils/tools';

// ================================ 导出
// tslint:disable-next-line:no-reserved-keywords
declare var module: any;
export const forelet = new Forelet();
export const WIDGET_NAME = module.id.replace(/\//g, '-');

/**
 * 首页
 */
export class App extends Widget {
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
    public imGoodsCate(e:any) {
        const dom = getRealNode(e.node);
        if (!dom.files) {
            return;
        }
        const f = dom.files[0];
        importRead(f,(res) => {
            importGoodsCate(res,'141001');// 导入分类141001
            importGoodsCate(res,'141002');// 导入分类141002
            importGoodsCate(res,'141003');// 导入分类141003
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
}

// ===================================================== 本地

// ===================================================== 立即执行
