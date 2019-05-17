import { Widget } from '../../../pi/widget/widget';

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

    public login() {
        //
    }
}