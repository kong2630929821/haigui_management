import { popNew } from '../../pi/ui/root';
import { Widget } from '../../pi/widget/widget';
import { popNewMessage } from '../utils/logic';
interface Props {
    title:string;
    sureText:string;
    cancelText:string;
    inputValue:string;// 输入验证码
    style:boolean;// true则填写邀请码 false文本提示框
    textArea:string;
    path:string;
    cussess:boolean;// 是否上传成功
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
        cancelText:'取消',
        inputValue:'',
        style:false,
        textArea:'',
        path:'',
        cussess:false
        
    };
    public ok: () => void;
    public cancel: () => void;   // fg为false表示退出APP(或点击取消)，true表示忘记密码

    public setProps(props:any) {
        this.props = { 
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        const oData = new Date();
        this.props.path = `${oData.getFullYear()}/${oData.getMonth() + 1}/${oData.getDay()}`;
    }
    // 输入品牌名
    public brandName(e:any) {
        this.props.inputValue = e.value;
    }
    // 输入描述
    public textareaChange(e:any) {
        this.props.textArea = e.value;
    }
    // 图片路径
    public inputIconChange(e:any) {
        this.props.path = e.value;
    }
    /**
     * 点击取消按钮
     */
    public cancelBtnClick() {
        this.cancel && this.cancel();
    }
    // 图片上传
    public updataImg(e:any) {
        if (e.value === 1) {
            this.props.cussess = true;
        }   
    }
    /**
     * 点击确认按钮
     */
    public okBtnClick() {
        const name = this.props.inputValue;
        const description = this.props.textArea;
        if (!name || !description) {
            popNewMessage('请录入品牌信息');

            return;
        }
        if (!this.props.cussess) {
            popNewMessage('请上传图片');

            return;
        }
        this.ok && this.ok();
    }
    
}