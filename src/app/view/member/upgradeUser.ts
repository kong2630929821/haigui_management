import { Widget } from '../../../pi/widget/widget';

/**
 * 升级会员等级
 */
export class UpgradeUser extends Widget {
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