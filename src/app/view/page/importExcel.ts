import { getRealNode } from '../../../pi/widget/painter';
import { Widget } from '../../../pi/widget/widget';
import { getExportTime, importArea, importBrand, importFreight, importGoods, importGoodsCate, importInventory, importSupplier } from '../../net/pull';
import { timeConvert } from '../../utils/logic';
import { importRead } from '../../utils/tools';

/**
 * 导入excel
 */
export class ImportExcel extends Widget {
    public props:any;
    constructor() {
        super();
        this.props = {
            showDataList:[
                ['运费信息',0],
                ['分类信息',0],
                ['商品信息',0],
                ['供应商信息',0],
                ['地区信息',0],
                ['品牌信息',0],
                ['库存信息',0]
            ],
            showTitleList:['表类','最新导入时间']
        };
    }
    
    public create() {
        getExportTime().then((r) => {
            console.log('exportTime=',r);
            this.props.showDataList[0] = ['运费信息',!r.value[3] ? 0 :timeConvert(r.value[3])];
            this.props.showDataList[1] = ['分类信息',!r.value[5] ? 0 :timeConvert(r.value[5])];
            this.props.showDataList[2] = ['商品信息',!r.value[4] ? 0 :timeConvert(r.value[4])];
            this.props.showDataList[3] = ['供应商信息',!r.value[0] ? 0 :timeConvert(r.value[0])];
            this.props.showDataList[4] = ['地区信息',!r.value[1] ? 0 :timeConvert(r.value[1])];
            this.props.showDataList[5] = ['品牌信息',!r.value[2] ? 0 :timeConvert(r.value[2])];
            this.props.showDataList[6] = ['库存信息',!r.value[6] ? 0 :timeConvert(r.value[6])];
            this.paint();
        });
    }
    // 导入excel
    public imExcel(e:any) {
        const file = getRealNode(e.node).getElementsByTagName('input')[e.value].files[0];
        const num = e.value;
        if (!file) return;
        if (num === 0) {// 导入运费
            importRead(file,(res) => {
                importFreight(res).then((r) => {
                    if (r) {
                        getExportTime().then((r) => {
                            console.log('exportTime=',r);
                            this.props.showDataList[0] = ['运费信息',timeConvert(r.value[3])];
                            this.paint();
                        });
                    }
                });
            });
        } else if (num === 1) {// 导入分类
            importRead(file,(res) => {
                importGoodsCate(res);
                getExportTime().then((r) => {
                    console.log('exportTime=',r);
                    this.props.showDataList[1] = ['分类信息',timeConvert(r.value[5])];
                    this.paint();
                });
            });
        } else if (num === 2) {// 导入商品
            importRead(file,(res) => {
                importGoods(res).then((r) => {
                    if (r) {
                        getExportTime().then((r) => {
                            console.log('exportTime=',r);
                            this.props.showDataList[2] = ['商品信息',timeConvert(r.value[4])];
                            this.paint();
                        });
                    }
                });
            });
        } else if (num === 3) {// 导入供应商
            importRead(file,(res) => {
                importSupplier(res).then((r) => {
                    if (r) {
                        getExportTime().then((r) => {
                            console.log('exportTime=',r);
                            this.props.showDataList[3] = ['供应商信息',timeConvert(r.value[0])];
                            this.paint();
                        });
                    }
                });
            });
        } else if (num === 4) {// 导入地区信息
            importRead(file,(res) => {
                importArea(res).then((r) => {
                    if (r) {
                        getExportTime().then((r) => {
                            console.log('exportTime=',r);
                            this.props.showDataList[4] = ['地区信息',timeConvert(r.value[1])];
                            this.paint();
                        });
                    }
                });
            });
        } else if (num === 5) {// 导入品牌信息
            importRead(file,(res) => {
                importBrand(res).then((r) => {
                    if (r) {
                        getExportTime().then((r) => {
                            console.log('exportTime=',r);
                            this.props.showDataList[5] = ['品牌信息',timeConvert(r.value[2])];
                            this.paint();
                        });
                    }
                });
            });
        } else if (num === 6) {// 导入库存信息
            importRead(file,(res) => {
                importInventory(res).then((r) => {
                    if (r) {
                        getExportTime().then((r) => {
                            console.log('exportTime=',r);
                            this.props.showDataList[6] = ['库存信息',timeConvert(r.value[6])];
                            this.paint();
                        });
                    }
                });
            });
        }
    }
}
