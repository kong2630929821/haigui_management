import { notify } from '../../../pi/widget/event';
import { CommodityLibrary } from './commodityLibrary';

/**
 * 商品信息
 */
export class GoodsInfo extends CommodityLibrary {
    public props:any;

    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        console.log(this.props);
    }

    public selectGoods(id:number) {
        const ind = this.props.goodsId.findIndex(r => r === id);
        if (ind === -1) {
            this.props.goodsId.push(id);
        } else {
            this.props.goodsId.splice(ind,1);
        }
        this.paint();
    }

    // 确认
    public confirmGoods(e:any) {
        notify(e.node,'ev-selGoods',{ value:this.props.goodsId });
        console.log('已选择的商品id：',this.props.goodsId);
    }

    public goBack(e:any) {
        notify(e.node,'ev-goodsInfo-back',{});
    }
}