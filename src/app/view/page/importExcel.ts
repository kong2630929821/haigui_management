import { Widget } from '../../../pi/widget/widget';
import { getExportTime, importArea, importBrand, importFreight, importGoods, importGoodsCate, importInventory, importSupplier } from '../../net/pull';
import { popNewMessage, timeConvert } from '../../utils/logic';
import { analysisAreatData, analysisFreightData, analysisGoodsCatetData, analysisGoodsData, analysisGrandData, analysisInventoryData, analysisSupliertData, importRead } from '../../utils/tools';

/**
 * 导入excel
 */
export class ImportExcel extends Widget {
    public props:any;
    constructor() {
        super();
        this.props = {
            showDataList:[
                ['供应商信息',0],
                ['地区信息',0],
                ['品牌信息',0],
                ['商品信息',0],
                ['SKU信息',0]
            ],
            showTitleList:['表类','最新导入时间']
        };
    }
    
    public create() {
        getExportTime().then((r) => {
            console.log('exportTime=',r);
            this.props.showDataList[0] = ['供应商信息',!r.value[0] ? 0 :timeConvert(r.value[0])];
            this.props.showDataList[1] = ['地区信息',!r.value[1] ? 0 :timeConvert(r.value[1])];
            this.props.showDataList[2] = ['品牌信息',!r.value[2] ? 0 :timeConvert(r.value[2])];
            this.props.showDataList[3] = ['商品信息',!r.value[3] ? 0 :timeConvert(r.value[3])];
            this.props.showDataList[4] = ['SKU信息',!r.value[4] ? 0 :timeConvert(r.value[4])];
            this.paint();
        });
    }
    // 导入excel
    public imExcel(e:any) {
        const file = e.file;
        if (!file) {
            popNewMessage('请导入excel文件');

            return;
        }
        const num = e.index;
        importRead(file,(res) => {// 处理读excel表后的数据
            
            if (num === 0) {// 导入供应商
                const data = analysisSupliertData(res);
                if (!data) return;
                let index = 0;
                const func = () => {
                    if (index < data.length) {
                        const str = JSON.stringify(data[index++]);
                        importSupplier(str).then(() => {
                            func();
                        });
                    } 
                };
                func();
                this.showExportTime(num);
            } else if (num === 1) {// 导入地区信息
                const data = analysisAreatData(res);
                if (!data) return;
                const str = JSON.stringify(data);
                importArea(str).then((r) => {
                    this.showExportTime(num);
                });
            } else if (num === 2) {// 导入品牌信息
                const data = analysisGrandData(res);
                if (!data) return;
                let index = 0;
                const func = () => {
                    if (index < data.length) {
                        const str = JSON.stringify(data[index++]);
                        importBrand(str).then(() => {
                            func();
                        });
                    } 
                };
                func();
                this.showExportTime(num);
            } else if (num === 3) {// 导入商品
                const data = analysisGoodsData(res);
                if (!data) return;
                let index = 0;
                const func = () => {
                    if (index < data.length) {
                        const str = JSON.stringify(data[index++]);
                        importGoods(str).then(() => {
                            func();
                        });
                    } 
                };
                func();
                this.showExportTime(num);
            } else if (num === 4) {// 导入库存信息
                const data = analysisInventoryData(res);
                if (!data) return;
                let index = 0;
                const func = () => {
                    if (index < data.length) {
                        const str = JSON.stringify(data[index++]);
                        importInventory(str).then(() => {
                            func();
                        });
                    } 
                };
                func();
                this.showExportTime(num);
            } 
        });
    }
    public showExportTime = (index:number) => {
        if (index === 0) {
            getExportTime().then((r) => {
                this.props.showDataList[0] = ['供应商信息',timeConvert(r.value[0])];
                this.paint();
            });
        } else if (index === 1) {
            getExportTime().then((r) => {
                this.props.showDataList[1] = ['地区信息',timeConvert(r.value[1])];
                this.paint();
            });
        } else if (index === 2) {
            getExportTime().then((r) => {
                this.props.showDataList[2] = ['品牌信息',timeConvert(r.value[2])];
                this.paint();
            });
        } else if (index === 3) {
            getExportTime().then((r) => {
                this.props.showDataList[3] = ['商品信息',timeConvert(r.value[3])];
                this.paint();
            });
        } else if (index === 4) {
            getExportTime().then((r) => {
                this.props.showDataList[4] = ['SKU信息',timeConvert(r.value[4])];
                this.paint();
            });
        }  
    }
}
