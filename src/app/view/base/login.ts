import { popNew } from '../../../pi/ui/root';
import { Widget } from '../../../pi/widget/widget';
import { login } from '../../net/pull';

/**
 * 登陆
 */
export class Login extends Widget {
    public props:any = {
        name:'admin',
        pwd:'admin'
    };

    public nameChange(e:any) {
        this.props.name = e.value;
    }

    public pwdChange(e:any) {
        this.props.pwd = e.value;
    }

    public loginUser() {
        login(this.props.name,this.props.pwd).then(r => {
            popNew('app-view-base-home');
        });
    }
}