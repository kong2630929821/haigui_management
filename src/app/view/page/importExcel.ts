import { getRealNode } from '../../../pi/widget/painter';
import { Widget } from '../../../pi/widget/widget';
import { importArea, importBrand, importFreight, importGoods, importGoodsCate, importInventory, importSupplier } from '../../net/pull';
import { importRead } from '../../utils/tools';

/**
 * 导入excel
 */
export class ImportExcel extends Widget {
    public props:any = {
        showDataList:[
            ['运费信息','2019-5-15 13:15'],
            ['分类信息','2019-5-15 13:15'],
            ['商品信息','2019-5-15 13:15'],
            ['供应商信息','2019-5-15 13:15'],
            ['地区信息','2019-5-15 13:15'],
            ['品牌信息','2019-5-15 13:15'],
            ['库存信息','2019-5-15 13:15']
        ],
        showTitleList:['表类','最新导入时间']
    };

    // 导入excel
    public imExcel(e:any) {
        const file = getRealNode(e.node).getElementsByTagName('input')[e.value].files[0];
        const num = e.value;
        if (!file) return;
        if (num === 0) {// 导入运费
            importRead(file,(res) => {
                importFreight(res);
            });
        } else if (num === 1) {// 导入分类
            importRead(file,(res) => {
                importGoodsCate(res);
            });
        } else if (num === 2) {// 导入商品
            importRead(file,(res) => {
                importGoods(res);
            });
        } else if (num === 3) {// 导入供应商
            importRead(file,(res) => {
                importSupplier(res);
            });
        } else if (num === 4) {// 导入地区信息
            importRead(file,(res) => {
                importArea(res);
            });
        } else if (num === 5) {// 导入品牌信息
            importRead(file,(res) => {
                importBrand(res);
            });
        } else if (num === 6) {// 导入库存信息
            importRead(file,(res) => {
                importInventory(res);
            });
        }
    }
}