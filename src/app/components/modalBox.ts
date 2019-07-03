import { Widget } from '../../pi/widget/widget';
import { changeBindding } from '../net/pull';
import { popNewMessage } from '../utils/logic';
interface Props {
    title:string;
    sureText:string;
    cancelText:string;
    inputValue:string;// 输入验证码
    style:boolean;// true则填写邀请码 false文本提示框
    uid:number;
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
        uid:-1
        
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
    // 输入邀请码框
    public inputChange(e:any) {
        this.props.inputValue = e.value;
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
        if (this.props.style) {
            if (this.props.inputValue === '') {
                popNewMessage('请输入邀请码');
                
                return; 
            }
            changeBindding(this.props.uid,this.props.inputValue).then(r => {
                if (r.result === 1) {
                    popNewMessage('修改成功');
                    this.ok && this.ok();
                } else {
                    popNewMessage('修改失败');
                }
            }).catch(e => {
                popNewMessage('修改失败');
            });

        } else {
            this.ok && this.ok();
        }
       
    }
    
}