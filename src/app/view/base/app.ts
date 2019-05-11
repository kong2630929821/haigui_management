
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
    // tslint:disable-next-line:max-func-body-length
    public imGoodsCate(e:any) {
        const dom = getRealNode(e.node);
        if (!dom.files) {
            return;
        }
        const f = dom.files[0];
            // tslint:disable-next-line:max-func-body-length
        importRead(f,(res) => {
                importGoodsCate(res,'141001').then(() => {
                    importGoodsCate(res,'141002').then(() => {
                        importGoodsCate(res,'141003').then(()=>{
                            importGoodsCate(res,'141004').then(()=>{
                                importGoodsCate(res,'141005').then(()=>{
                                    importGoodsCate(res,'141006').then(()=>{
                                        importGoodsCate(res,'141007').then(()=>{
                                            importGoodsCate(res,'141008').then(()=>{
                                                importGoodsCate(res,'141009').then(()=>{
                                                    importGoodsCate(res,'142000').then(()=>{
                                                        importGoodsCate(res,'142025').then(()=>{
                                                            importGoodsCate(res,'142026').then(()=>{
                                                                importGoodsCate(res,'142027').then(()=>{
                                                                    importGoodsCate(res,'142001').then(()=>{
                                                                        importGoodsCate(res,'142002').then(()=>{
                                                                            importGoodsCate(res,'142003').then(()=>{
                                                                                importGoodsCate(res,'142004').then(()=>{
                                                                                    importGoodsCate(res,'142005').then(()=>{
                                                                                        importGoodsCate(res,'142006').then(()=>{
                                                                                            importGoodsCate(res,'142007').then(()=>{
                                                                                                importGoodsCate(res,'142008').then(()=>{
                                                                                                    importGoodsCate(res,'142009').then(()=>{
                                                                                                        importGoodsCate(res,'142010').then(()=>{
                                                                                                            importGoodsCate(res,'142011').then(()=>{
                                                                                                                importGoodsCate(res,'142012').then(()=>{
                                                                                                                    importGoodsCate(res,'142013').then(()=>{
                                                                                                                        importGoodsCate(res,'142014').then(()=>{
                                                                                                                            importGoodsCate(res,'142015').then(()=>{
                                                                                                                                importGoodsCate(res,'142016').then(()=>{
                                                                                                                                    importGoodsCate(res,'142017').then(()=>{
                                                                                                                                        importGoodsCate(res,'142018').then(()=>{
                                                                                                                                            importGoodsCate(res,'142019').then(()=>{
                                                                                                                                                importGoodsCate(res,'142020').then(()=>{
                                                                                                                                                    importGoodsCate(res,'142021').then(()=>{
                                                                                                                                                        importGoodsCate(res,'142022').then(()=>{
                                                                                                                                                            importGoodsCate(res,'142023').then(()=>{
                                                                                                                                                                importGoodsCate(res,'142024').then(()=>{
                                                                                                                                                                    importGoodsCate(res,'142028').then(()=>{
                                                                                                                                                                        importGoodsCate(res,'149000').then(()=>{});
                                                                                                                                                                    });
                                                                                                                                                                });
                                                                                                                                                            });
                                                                                                                                                        });
                                                                                                                                                    });
                                                                                                                                                });
                                                                                                                                            });
                                                                                                                                        });
                                                                                                                                    });
                                                                                                                                });
                                                                                                                            });
                                                                                                                        });
                                                                                                                    });
                                                                                                                });
                                                                                                            });
                                                                                                        });
                                                                                                    });
                                                                                                });
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            
            
           
           
            // importGoodsCate(res,'142001');
            // importGoodsCate(res,'142002');
            // importGoodsCate(res,'142003');
            // importGoodsCate(res,'142004');
            // importGoodsCate(res,'142005');
            // importGoodsCate(res,'142006');
            // importGoodsCate(res,'142007');
            // importGoodsCate(res,'142008');
            // importGoodsCate(res,'142009');
            // importGoodsCate(res,'142010');
            // importGoodsCate(res,'142011');
            // importGoodsCate(res,'142012');
            // importGoodsCate(res,'142013');
            // importGoodsCate(res,'142014');
            // importGoodsCate(res,'142015');
            // importGoodsCate(res,'142016');
            // importGoodsCate(res,'142017');
            // importGoodsCate(res,'142018');
            // importGoodsCate(res,'142019');
            // importGoodsCate(res,'142020');
            // importGoodsCate(res,'142021');
            // importGoodsCate(res,'142022');
            // importGoodsCate(res,'142023');
            // importGoodsCate(res,'142024');
            // importGoodsCate(res,'142028');
            // importGoodsCate(res,'149000');
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
