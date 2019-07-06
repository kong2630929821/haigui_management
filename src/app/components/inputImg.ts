import { notify } from '../../pi/widget/event';
import { getRealNode } from '../../pi/widget/painter';
import { Widget } from '../../pi/widget/widget';

interface Props {
    src:string;// 图片base-64
    title:string;// 标题
}
/**
 * 文件选择按钮
 */
export class InputImg extends Widget {
    public props:Props = {
        src:'',
        title:'上传图片'
    };
    public importTransport(e:any) {
        // 导入运单
     
        const file = (<any>getRealNode(e.node)).files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (ev:any) => {
            this.props.src = ev.target.result;
            this.paint();
        };
        notify(e.node,'ev-input-file',{ file });
    }
}