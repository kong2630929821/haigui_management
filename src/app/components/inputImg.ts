import { popNew } from '../../pi/ui/root';
import { notify } from '../../pi/widget/event';
import { getRealNode } from '../../pi/widget/painter';
import { Widget } from '../../pi/widget/widget';
import { mallImagPre } from '../config';
import { upLoadImg } from '../net/pull';
import { popNewMessage } from '../utils/logic';

interface Props {
    src:string;// 图片base-64
    title:string;// 标题
    path:string;// 图片路径
    mallImagPre:string;
}
/**
 * 文件选择按钮
 */
export class InputImg extends Widget {
    public props:Props = {
        src:'',
        title:'上传图片',
        path:'',
        mallImagPre:mallImagPre
    };
    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        if (props.src) {
            this.props.src = `${this.props.mallImagPre}${props.src}`;
        }
       
    }
    public importTransport(e:any) {
        if (!(<any>getRealNode(e.node)).files) {
            return; 
        }
        // 获取图片
        const file = (<any>getRealNode(e.node)).files[0];
        const f1 = new FormData();
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (ev:any) => {
            this.props.src = ev.target.result;
            this.paint();
        };
        f1.append('upload',file);
        f1.append('path',this.props.path);
        const close = popNew('app-components-loading',{ text:'上传中……' });
        upLoadImg(f1).then(r => {
            if (r.result === 1) {
                close.callback(close.widget);
                const imgSrc = `${this.props.mallImagPre}${this.props.path}/${file.name}`;
                this.props.src = imgSrc;
                console.log('imgSrc',imgSrc);
                this.props.src = '';
                popNewMessage('上传成功');
                this.paint();
                notify(e.node,'ev-input-file',{ src:`${this.props.path}/${file.name}` });
                
            }
        });
    }
}