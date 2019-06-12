// tslint:disable-next-line:missing-jsdoc
import { Widget } from '../../pi/widget/widget';
import { changeMoney } from '../net/pull';
import { popNewMessage } from '../utils/logic';

interface Props {
    showData:any;
    uid:number;
    changeNum:number;
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
        this.props.changeNum = e.value;
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
        let money = Number(this.props.changeNum);
        if (index === 0) {
            money = money * 100;
        }
        changeMoney(index + 1,Number(this.props.uid),money).then(r => {
            console.log('11111111111111',r);
            popNewMessage('修改成功');
            console.log(Number(this.props.showData[index].num),Number(this.props.changeNum));
            this.props.showData[index].num = Number(this.props.showData[index].num) + Number(this.props.changeNum);
            this.paint();
        });
    }
}