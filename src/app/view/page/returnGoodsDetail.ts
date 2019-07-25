import { Widget } from '../../../pi/widget/widget';
import { rippleShow } from '../../utils/tools';

interface Props {
    content:string;
    imgs:string[];
    username:string;  
}

/**
 * 退货申请详情
 */
export class ReturnGoodsDetail extends Widget {
    public ok:() => void;
    public props:Props;

    public closeBtn() {
        this.ok && this.ok();
    }

    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }
}