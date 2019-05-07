import { notify } from '../../../pi/widget/event';
import { Widget } from '../../../pi/widget/widget';
export enum OrderType {
    pay = 0, // 待付款
    ship, // 待发货
    receipt, // 待收货
    complete, // 已完成
    return  // 退货
}
/**
 * 订单
 */
export class OrderItem extends Widget {
    public props:any = {
        orderType: OrderType.pay,
        statusList: [
            '等待买家付款',
            '等待发货',
            '商品已发货',
            ''
        ],
        btnList:[
            { btn1:'取消订单',btn2:'去付款' },
            { btn1:'取消订单',btn2:'查看物流' },
            { btn1:'查看物流',btn2:'确认收货' },
            { btn1:'',btn2:'再来一单' },
            { btn1:'',btn2:'提交退货申请' }
        ]
    };

    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
    }

    public btnClick(e:any,num:number) {
        notify(e.node,'ev-btn-click',{ value: num });
    }

    public itemClick(e:any) {
        notify(e.node,'ev-item-click',null);
    }
}