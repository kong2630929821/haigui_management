import { popNew } from '../../pi/ui/root';
import { notify } from '../../pi/widget/event';
import { Widget } from '../../pi/widget/widget';

/**
 * 开关的逻辑处理
 */

interface Props {
    type:boolean;
    activeColor: string;
    inactiveColor: string;
}
/**
 * 开关
 */
export class Switch extends Widget {
    public props: Props;
    constructor() {
        super();
    }
    public doClick(event: any) {
        let str = '开启提现';
        if (this.props.type) {
            str = '关闭提现';
        }
        popNew('app-components-modalBox',{ content:`确认“<span style="color:#1991EB">${str}</span>”` },() => {
            const oldType = !!this.props.type;
            const newType = !oldType;
            notify(event.node, 'ev-switch-click', { value: newType });
            this.paint();
        });
        
    }

}
