// tslint:disable-next-line:missing-jsdoc
import { Widget } from '../../pi/widget/widget';
import { changeMoney } from '../net/pull';
import { popNewMessage } from '../utils/logic';

interface Props {
    showData:any;
    uid:number;
    changeNum:number;
}
let changeNum = [
        { title:'资金',num:0 },
        { title:'海贝',num:0 },
        { title:'积分',num:0 }
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
        if (isNaN(money) || !money) { 
            popNewMessage('请输入正确的金额');

            return;
        }
        if (Math.abs(money) > 1000000) {
            popNewMessage('调整金额不能超过一百万');

            return;
        }
        if ((Number(this.props.showData[index].num) + money) < 0) {
            popNewMessage('减去金额不能大于原有金额');

            return;
        }
        if (index === 0) {  // 现金 单位为分
            money = money * 100;
        }
        changeMoney(index + 1,Number(this.props.uid),money).then(r => {
            console.log('11111111111111',r);
            popNewMessage('修改成功');
            this.props.showData[index].num = (Number(this.props.showData[index].num) + Number(changeNum[index].num)).toFixed(2);
            changeNum = [
                { title:'资金',num:0 },
                { title:'海贝',num:0 },
                { title:'积分',num:0 }
            ];
            this.paint();
        });
    }
}