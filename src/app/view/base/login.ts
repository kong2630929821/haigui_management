import { popNew } from '../../../pi/ui/root';
import { Widget } from '../../../pi/widget/widget';
import { login } from '../../net/pull';
import { popNewMessage } from '../../utils/logic';

/**
 * 登陆
 */
export class Login extends Widget {
    public props:any = {
        name:'',
        pwd:''
    };

    public nameChange(e:any) {
        this.props.name = e.value;
    }

    public pwdChange(e:any) {
        this.props.pwd = e.value;
    }

    public keydown(e:any) {
        if (e.value === 'Enter') {
            this.loginUser();
        }
    }

    public loginUser() {
        if (this.props.name && this.props.pwd) {
            login(this.props.name,this.props.pwd).then(r => {
                popNew('app-view-base-home');
            }).catch(() => {
                popNewMessage('账号密码错误','error');
            });
        } else {
            popNewMessage('请输入账号密码','warn');
        }
    }
}