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
        const file = e.file;
        if (!file) {
            popNewMessage('请导入excel文件');

            return;
        }
        const num = e.index;
        importRead(file,(res) => {// 处理读excel表后的数据
            if (num === 0) {// 导入运费
                if (!analysisFreightData(res)) return;// 数据处理
                importFreight(JSON.stringify(analysisFreightData(res))).then(() => {
                    this.showExportTime(0);
                });
            } else if (num === 1) {// 导入分类
                if (!analysisGoodsCatetData(res)) return;
                let index = 0;
                const func = () => {
                    if (index < analysisGoodsCatetData(res).length) {
                        importGoodsCate(analysisGoodsCatetData(res)[index++]).then(() => {
                            func();
                        });
                    } 
                };
                func();
                this.showExportTime(1);
            } else if (num === 2) {// 导入商品
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
                this.showExportTime(2);
            } else if (num === 3) {// 导入供应商
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
                this.showExportTime(3);
            } else if (num === 4) {// 导入地区信息
                const data = analysisAreatData(res);
                if (!data) return;
                const str = JSON.stringify(data);
                importArea(str).then((r) => {
                    this.showExportTime(4);
                });
            } else if (num === 5) {// 导入品牌信息
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
                this.showExportTime(5);
            } else if (num === 6) {// 导入库存信息
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
                this.showExportTime(6);
            } 
        });
    }
    public showExportTime = (index:number) => {
        if (index === 0) {
            getExportTime().then((r) => {
                this.props.showDataList[0] = ['运费信息',timeConvert(r.value[3])];
                this.paint();
            });
        } else if (index === 1) {
            getExportTime().then((r) => {
                this.props.showDataList[1] = ['分类信息',timeConvert(r.value[5])];
                this.paint();
            });
        } else if (index === 2) {
            getExportTime().then((r) => {
                this.props.showDataList[2] = ['商品信息',timeConvert(r.value[4])];
                this.paint();
            });
        } else if (index === 3) {
            getExportTime().then((r) => {
                this.props.showDataList[3] = ['供应商信息',timeConvert(r.value[0])];
                this.paint();
            });
        } else if (index === 4) {
            getExportTime().then((r) => {
                this.props.showDataList[4] = ['地区信息',timeConvert(r.value[1])];
                this.paint();
            });
        } else if (index === 5) {
            getExportTime().then((r) => {
                this.props.showDataList[5] = ['品牌信息',timeConvert(r.value[2])];
                this.paint();
            });
        } else if (index === 6) {
            getExportTime().then((r) => {
                this.props.showDataList[6] = ['库存信息',timeConvert(r.value[6])];
                this.paint();
            });
        }  
    }
}
