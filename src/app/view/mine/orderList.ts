import { popNew } from '../../../pi/ui/root';
import { Widget } from '../../../pi/widget/widget';

/**
 * 订单列表
 */
export class OrderList extends Widget {
    public props:any = {
        orderType:[
            { name:'待付款',img:'wallet.png' },
            { name:'待发货',img:'goods.png' },
            { name:'待收货',img:'truck.png' },
            { name:'已完成',img:'order.png' },
            { name:'退货',img:'return.png' }
        ],
        list:[1,2],
        active:0
    };

    // 切换订单类型
    public typeClick(num:number) {
        this.props.active = num;
        this.paint();
    }

    // 点击订单
    public itemClick(num:number) {
        popNew('app-view-mine-freight');
    }

    public btnClick(e:any,num:number) {
        // 点击按钮
    }
}