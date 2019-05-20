import { Widget } from '../../pi/widget/widget';
interface Props {
    title:string;
    sureText:string;
    cancelText:string;
}
/**
 * 模态框
 * {title:"提示",content:"温馨提示",sureText:"sure",cancelText:"cancel",itype:"text"}
 * title：标题
 * sureText:确认按钮名称
 * cancelText：取消按钮名称
 */
export class ModalBox extends Widget {
    public props: Props = {
        title:'',
        sureText:'确认',
        cancelText:'取消'
    };
    public ok: () => void;
    public cancel: () => void;   // fg为false表示退出APP(或点击取消)，true表示忘记密码

    public setProps(props:any) {
        this.props = { 
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        
    }
    /**
     * 点击取消按钮
     */
    public cancelBtnClick() {
        this.cancel && this.cancel();
    }
    /**
     * 点击确认按钮
     */
    public okBtnClick() {
        this.ok && this.ok();
    }
    
}