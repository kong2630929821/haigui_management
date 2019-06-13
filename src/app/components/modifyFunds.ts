// tslint:disable-next-line:missing-jsdoc
import { Widget } from '../../pi/widget/widget';
import { changeMoney } from '../net/pull';
import { popNewMessage } from '../utils/logic';

interface Props {
    showData:any;
    uid:number;
    changeNum:number;
}
const changeNum = [
        { title:'资金',num:0 },
        { title:'海贝',num:1 },
        { title:'积分',num:2 }
];
// tslint:disable-next-line:completed-docs
export class Modify extends Widget {
    public ok: (r:any) => void;
    public cancel: () => void;   // fg为false表示退出APP(或点击取消)，true表示忘记密码
    public props:Props;
    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
    }
    public inputChange(e:any,index:number) {
        changeNum[index].num = e.value;
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
        let money = Number(changeNum[index].num);
        if (index === 0) {
            money = money * 100;
        }
        changeMoney(index + 1,Number(this.props.uid),money).then(r => {
            console.log('11111111111111',r);
            popNewMessage('修改成功');
            this.props.showData[index].num = (Number(this.props.showData[index].num) + Number(changeNum[index].num)).toFixed(2);
           
            this.paint();
        });
    }
}