import { Widget } from '../../pi/widget/widget';

/**
 * 取消订单
 */
export class ConfirmPayIfo extends Widget {
    public ok:() => void;
    public cancel:() => void;
    public props:any = {
        money:''
    };
    public create() {
        super.create();
        this.config = { value: { group: 'top' } };
    }
    // 确认
    public confirm() {
        this.ok && this.ok();
    }

    // 取消
    public close() {
        this.cancel && this.cancel();
    }
}