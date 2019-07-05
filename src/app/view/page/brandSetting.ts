// tslint:disable-next-line:missing-jsdoc
import { Widget } from '../../../pi/widget/widget';

interface Props {
    showDataList:any;
    showTitleList:any;
    shopNum:number;
    brandShow:number;// 品牌显示状态  0品牌列表 1添加 2修改
}
/**
 * 品牌设置
 */
// tslint:disable-next-line:completed-docs
export class BrandSetting extends Widget {
    public props:Props = {
        showTitleList:['品牌（ID）','ICON','最后一次调整时间'],
        showDataList:[],
        shopNum:0,
        brandShow:0
    };
    // 添加品牌
    public addBrand() {
        this.props.brandShow = 1;
        this.paint();
    }
}