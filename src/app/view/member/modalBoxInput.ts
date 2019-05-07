import { Widget } from '../../../pi/widget/widget';

/**
 * 填信息输入框弹窗
 */
export class ModalBoxInput extends Widget {
    public ok:() => void;
    public cancel:() => void;
    public props:any;

    // 取消
    public close() {
        this.cancel && this.cancel();
    }

    // 确认
    public confirm() {
        this.ok && this.ok();
    }
}