import { Widget } from '../../pi/widget/widget';
import { rippleShow } from '../utils/tools';

/**
 * 取消订单
 */
export class ConfirmQuitOrder extends Widget {
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

    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }
}