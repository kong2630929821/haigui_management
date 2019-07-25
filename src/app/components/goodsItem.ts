import { notify } from '../../pi/widget/event';
import { Widget } from '../../pi/widget/widget';
import { mallImagPre } from '../config';
import { rippleShow } from '../utils/tools';

interface Props {
    datas:any;
    mallImagPre:string;// 图片路径
    inFlag:number;  // 1 商品库 2 399商品 3 分类设置
    selected:boolean;  // 是否选择
    bindUser:string;   // 399商品绑定的用户邀请码
}

/**
 * 单个商品详情
 */
export class GoodsItem extends Widget {
    public props:Props;

    public setProps(props:any) {
        super.setProps(props);
        this.props.mallImagPre = mallImagPre;
    }

    // 上下架 fg 1上架 0下架
    public shelf(e:any,fg:number) {
        notify(e.node,'ev-shelf',{ state:fg,id:this.props.datas.id });
    }

    // 编辑商品
    public change(e:any) {
        notify(e.node,'ev-change',null);
    }

    // 查看详情
    public goDetail(e:any) {
        notify(e.node,'ev-detail',null);
    }

    // 选择商品
    public selectGoods(e:any) {
        notify(e.node,'ev-selGoods',{ id:this.props.datas.id });
    }

    // 绑定邀请码
    public bindUser(e:any) {
        notify(e.node,'ev-bindUser',{ value:this.props.datas });
    }

    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }
}