import { notify } from '../../pi/widget/event';
import { getRealNode } from '../../pi/widget/painter';
import { Widget } from '../../pi/widget/widget';

interface Props {
    text:string;
}
/**
 * 文件选择按钮
 */
export class InputImg extends Widget {
    public importTransport(e:any) {
        // 导入运单
        const file = (<any>getRealNode(e.node)).files[0];
        notify(e.node,'ev-input-file',{ file });
    }
}