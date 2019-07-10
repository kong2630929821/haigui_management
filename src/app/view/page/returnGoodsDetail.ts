import { Widget } from '../../../pi/widget/widget';

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
}