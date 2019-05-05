import { Widget } from '../../../../pi/widget/widget';
interface Props {
    name:string;
    money:string;
}
/**
 * 权益升级卡片
 */
export class PowerCard extends Widget {
    public props:Props;
}