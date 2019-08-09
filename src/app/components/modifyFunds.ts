// tslint:disable-next-line:missing-jsdoc
import { Widget } from '../../pi/widget/widget';
import { changeMoney } from '../net/pull';
import { popNewMessage } from '../utils/logic';
import { rippleShow } from '../utils/tools';

interface Props {
    showData:any;
    uid:number;
    changeNum:number;
}
let changeNum = [
        { title:'资金',num:0 ,note:'' },
        { title:'海贝',num:0 ,note:'' },
        { title:'积分',num:0 ,note:'' }
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

    public inputNoteChange(e:any,index:number) {
        this.props.showData[index].note = e.value;
        changeNum[index].note = e.value;
        this.paint();
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
        const note = changeNum[index].note;
        if (!note) {
            popNewMessage('请填写备注');

            return;
        }
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
        if (money === 0) {
            popNewMessage('请输入金额');

            return; 
        }
        changeMoney(index + 1,Number(this.props.uid),money,note).then(r => {
            console.log('11111111111111',r);
            popNewMessage('修改成功');
            this.props.showData[index].num = (Number(this.props.showData[index].num) + Number(changeNum[index].num)).toFixed(2);
            this.props.showData[index].note = '';
            changeNum = [
                { title:'资金',num:0 ,note:'' },
                { title:'海贝',num:0 ,note:'' },
                { title:'积分',num:0,note:'' }
            ];
            this.paint();
        });
    }

    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }
}