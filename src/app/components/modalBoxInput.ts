import { Widget } from '../../pi/widget/widget';
import { popNewMessage } from '../utils/logic';
import { rippleShow } from '../utils/tools';
interface Props {
    title:string;
    sureText:string;
    cancelText:string;
    placeHolder:string;
    message:string;   // 输入内容
    errMessage:string;// 输入错误提示
}
/**
 * 模态框
 * {title:"提示",content:"温馨提示",sureText:"sure",cancelText:"cancel",itype:"text"}
 * title：标题
 * sureText:确认按钮名称
 * cancelText：取消按钮名称
 */
export class ModalBox extends Widget {
    public ok: (mess:string) => void;
    public cancel: () => void; 
    public props: Props = {
        title:'',
        sureText:'确认',
        cancelText:'取消',
        placeHolder:'',
        message:'',
        errMessage:''
    };
    
    public setProps(props:any) {
        this.props = { 
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        
    }

    // 点击取消按钮
    public cancelBtnClick() {
        this.cancel && this.cancel();
    }

    // 点击确认按钮
    public okBtnClick() {
        if (!this.props.message) {
            popNewMessage(this.props.errMessage);
            
            return; 
        }
        this.ok && this.ok(this.props.message);
    }

    // 输入内容
    public messChange(e:any) {
        this.props.message = e.value;
    }
    
    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }
}