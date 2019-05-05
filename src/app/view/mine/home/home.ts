import { Widget } from '../../../../pi/widget/widget';

/**
 * 我的首页
 */
export class Home extends Widget {
    public props:any = {
        list:[
            { name:'待付款',img:'wallet.png' },
            { name:'待发货',img:'goods.png' },
            { name:'待收货',img:'truck.png' },
            { name:'已完成',img:'order.png' },
            { name:'退货',img:'return.png' }
        ]
    };

    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
    }
}