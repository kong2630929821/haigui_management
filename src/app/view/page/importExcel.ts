import { getRealNode } from '../../../pi/widget/painter';
import { Widget } from '../../../pi/widget/widget';
import { importArea, importBrand, importFreight, importGoods, importGoodsCate, importInventory, importSupplier } from '../../net/pull';
import { importRead } from '../../utils/tools';

/**
 * 导入excel
 */
export class ImportExcel extends Widget {
    public props:any;
    constructor() {
        super();
        const exportFreightTime = !localStorage.getItem('exportFreightTime') ? 0 : localStorage.getItem('exportFreightTime');
        const exportCateTime = !localStorage.getItem('exportCateTime') ? 0 : localStorage.getItem('exportCateTime');
        const exportGoodsTime = !localStorage.getItem('exportGoodsTime') ? 0 : localStorage.getItem('exportGoodsTime');
        const exportSupplierTime = !localStorage.getItem('exportSupplierTime') ? 0 : localStorage.getItem('exportSupplierTime');
        const exportAreaTime = !localStorage.getItem('exportAreaTime') ? 0 : localStorage.getItem('exportAreaTime');
        const exportGrandTime = !localStorage.getItem('exportGrandTime') ? 0 : localStorage.getItem('exportGrandTime');
        const exportSKUTime = !localStorage.getItem('exportSKUTime') ? 0 : localStorage.getItem('exportSKUTime');
        this.props = {
            showDataList:[
                ['运费信息',exportFreightTime],
                ['分类信息',exportCateTime],
                ['商品信息',exportGoodsTime],
                ['供应商信息',exportSupplierTime],
                ['地区信息',exportAreaTime],
                ['品牌信息',exportGrandTime],
                ['库存信息',exportSKUTime]
            ],
            showTitleList:['表类','最新导入时间']
            
        };
    }
    // 时间戳转标准日期
    public timeConvert(time:any) {
        const date = new Date(time);
        const year = date.getFullYear().toString().concat('-');
        const month = (date.getMonth() + 1 < 10 ? '0'.concat((date.getMonth() + 1).toString()) : date.getMonth() + 1).toString().concat('-');
        const day = (date.getDate() < 10 ? '0'.concat(date.getDate().toString()) : date.getDate()).toString().concat(' ');
        const hour = (date.getHours() < 10 ? '0'.concat(date.getHours().toString()) : date.getHours()).toString().concat(':');
        const minute = (date.getMinutes() < 10 ? '0'.concat(date.getMinutes().toString()) : date.getMinutes()).toString().concat(':');
        const second = (date.getSeconds() < 10 ? '0'.concat(date.getSeconds().toString()) : date.getSeconds()).toString();

        const showTime = year + month + day + hour + minute + second;
        console.log(showTime);

        return showTime;
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
                        localStorage.setItem('exportFreightTime',this.timeConvert(Date.now()));
                        const exportFreightTime = localStorage.getItem('exportFreightTime');
                        this.props.showDataList[0] = ['运费信息',exportFreightTime];
                        this.paint();
                    }
                });
            });
        } else if (num === 1) {// 导入分类
            importRead(file,(res) => {
                importGoodsCate(res);
                localStorage.setItem('exportCateTime',this.timeConvert(Date.now()));
                const exportCateTime = localStorage.getItem('exportCateTime');
                this.props.showDataList[1] = ['分类信息',exportCateTime];
                this.paint();
            });
        } else if (num === 2) {// 导入商品
            importRead(file,(res) => {
                importGoods(res).then((r) => {
                    if (r) {
                        localStorage.setItem('exportGoodsTime',this.timeConvert(Date.now()));
                        const exportGoodsTime = localStorage.getItem('exportGoodsTime');
                        this.props.showDataList[2] = ['商品信息',exportGoodsTime];
                        this.paint();
                    }
                });
            });
        } else if (num === 3) {// 导入供应商
            importRead(file,(res) => {
                importSupplier(res).then((r) => {
                    if (r) {
                        localStorage.setItem('exportSupplierTime',this.timeConvert(Date.now()));
                        const exportSupplierTime = localStorage.getItem('exportSupplierTime');
                        this.props.showDataList[3] = ['供应商信息',exportSupplierTime];
                        this.paint();
                    }
                });
            });
        } else if (num === 4) {// 导入地区信息
            importRead(file,(res) => {
                importArea(res).then((r) => {
                    if (r) {
                        localStorage.setItem('exportAreaTime',this.timeConvert(Date.now()));
                        const exportAreaTime = localStorage.getItem('exportAreaTime');
                        this.props.showDataList[4] = ['地区信息',exportAreaTime];
                        this.paint();
                    }
                });
            });
        } else if (num === 5) {// 导入品牌信息
            importRead(file,(res) => {
                importBrand(res).then((r) => {
                    if (r) {
                        localStorage.setItem('exportGrandTime',this.timeConvert(Date.now()));
                        const exportGrandTime = localStorage.getItem('exportGrandTime');
                        this.props.showDataList[5] = ['品牌信息',exportGrandTime];
                        this.paint();
                    }
                });
            });
        } else if (num === 6) {// 导入库存信息
            importRead(file,(res) => {
                importInventory(res).then((r) => {
                    if (r) {
                        localStorage.setItem('exportSKUTime',this.timeConvert(Date.now()));
                        const exportSKUTime = localStorage.getItem('exportSKUTime');
                        this.props.showDataList[6] = ['库存信息',exportSKUTime];
                        this.paint();
                    }
                });
            });
        }
    }
}