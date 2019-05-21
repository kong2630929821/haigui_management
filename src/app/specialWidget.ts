/**
 * 渠道过滤器
 */
import { Widget } from '../pi/widget/widget';

// tslint:disable-next-line:completed-docs
export class SpecialWidget extends Widget {
    public props:any;

    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
    }
}
