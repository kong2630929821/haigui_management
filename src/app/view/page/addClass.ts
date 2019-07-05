// tslint:disable-next-line:missing-jsdoc
import { Widget } from '../../../pi/widget/widget';

interface Props {
    currentData:any;// 当前数据
}
// tslint:disable-next-line:completed-docs
export class AddClass extends Widget {
    public props:Props = {
        currentData:[]
    };
    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
    }
}