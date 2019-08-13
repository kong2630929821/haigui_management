import { notify } from '../../../pi/widget/event';
import { rippleShow } from '../../utils/tools';
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
        this.props.goodsIdShow = this.props.goodsId.join('，');
        console.log(this.props);
    }

    // 选择商品
    public selectGoods(e:any) {
        const ind = this.props.goodsId.findIndex(r => r === e.id);
        if (ind === -1) {
            this.props.goodsId.push(e.id);
        } else {
            this.props.goodsId.splice(ind,1);
        }
        this.props.goodsIdShow = this.props.goodsId.join('，');
        this.paint();
    }

    // 确认
    public confirmGoods(e:any) {
        notify(e.node,'ev-confirm',{ value:this.props.goodsId });
        console.log('已选择的商品id：',this.props.goodsId);
    }

    public goBack(e:any) {
        notify(e.node,'ev-goodsInfo-back',{});
    }

    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }

    // 修改商品id列表
    public goodsIdChange(e:any) {
        let val = e.value.replace(/,/g,'，');  // 替换错误的分隔符
        val = val.replace(/[^0-9，]/g,'');  // 去除错误的内容

        let list = val.split('，');
        list = list.filter((v,i,arr) => {
            return v && arr.indexOf(v, 0) === i;   // 去重
        });
        // tslint:disable-next-line:no-unnecessary-callback-wrapper
        this.props.goodsId = list.map(r => Number(r));
        this.props.goodsIdShow = list.join('，');
        this.paint();
    }
}