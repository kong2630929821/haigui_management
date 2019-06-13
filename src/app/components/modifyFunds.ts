// tslint:disable-next-line:missing-jsdoc
import { Widget } from '../../pi/widget/widget';
import { changeMoney } from '../net/pull';
import { popNewMessage } from '../utils/logic';

interface Props {
    showData:any;
    uid:number;
}
// tslint:disable-next-line:completed-docs
export class Modify extends Widget {
    public ok: (r:any) => void;
    public cancel: () => void;   // fg为false表示退出APP(或点击取消)，true表示忘记密码
    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
    }
    public inputChange(e:any,index:number) {
        this.props.showData[index].num = e.value;
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
    public okBtnClick(index:number) {
        let money = parseInt(this.props.showData[index].num);
        if (index === 0) {
            money = money * 100;
        }
        changeMoney(index + 1,parseInt(this.props.uid),money).then(r => {
            console.log('11111111111111',r);
            popNewMessage('修改成功');
            this.paint();
        });
    }
}