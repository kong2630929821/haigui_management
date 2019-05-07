import { notify } from '../../../pi/widget/event';
import { Widget } from '../../../pi/widget/widget';

/**
 * 订单
 */
export class OrderItem extends Widget {
    public props:any;

    public btnClick(e:any,num:number) {
        notify(e.node,'ev-btn-click',{ btn: num });
    }

    public itemClick(e:any,num:number) {
        notify(e.node,'ev-item-click',{ btn: num });
    }
}