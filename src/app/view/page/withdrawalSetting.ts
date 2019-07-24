import { Widget } from '../../../pi/widget/widget';
import { getWithDrawalSetting, getWithdrawalStatus, setWithDrawal, setWithdrawalStatus } from '../../net/pull';
import { popNewMessage } from '../../utils/logic';

interface Props {
    status:boolean;// 是否开启提现
    title:string;// 提现文字
    showDataTitle:any[];// 标题
    showDataList:any[];// 提现参数
    isChange:boolean;// 是否点击修改 true是禁止修改
}
/**
 * 提现设置
 */
export class WithDrwalSetting extends Widget {
    public props:Props = {
        status:true,
        title:'开启提现',
        showDataTitle:['用户单次提现金额上限(元)','手续费','每天提现次数上限(全局)','每周提现次数上限(全局)','每月提现次数上限(全局)','每天提现金额上限(全局/元)'],
        showDataList:[0,0,0,0,0,0],
        isChange:true
    };

    // 实例创建
    public create() {
        super.create();
        this.init();
    }

    // 初始化数据
    public init() {
        // 获取提现是否开启  0关闭 1开启
        getWithdrawalStatus().then(r => {
            if (r.state) {
                this.props.status = true;
                this.props.title = '开启提现';
            } else {
                this.props.status = false;
                this.props.title = '关闭提现';
            }
            this.paint();
        });
        // 获取提现配置
        getWithDrawalSetting().then(r => {
            this.props.showDataList = r;
            this.paint();
        });
    }
    // 提现开启放回参数
    public switchChange(e:any) {
        // 设置提现开关
        setWithdrawalStatus(Number(e.value)).then(r => {
            if (r.result === 1) {
                this.props.status = e.value;
                if (e.value) {
                    this.props.title = '开启提现';
                } else {
                    this.props.title = '关闭提现';
                }
                popNewMessage('设置成功');
                this.paint();
            } else {
                popNewMessage('设置失败');
            }
        }).catch(e => {
            popNewMessage('设置失败');
        });
    }

    // 点击修改
    public changeBtnClick() {
        this.props.isChange = false;
        this.paint();
    }

    // 输入框值变化
    public inputChange(index:number,e:any) {
        this.props.showDataList[index] = e.value;
    }
    // 点击保存
    public okBtnClick() {
        const data = [];
        let flag = false;
        // 判断是否修改数据
        if (this.props.isChange) {
            
            return; 
        }
        this.props.showDataList.forEach(v => {
            if (v === '') {
                flag = true;

                return; 
            }
            data.push(Number(v));
        });
        if (flag) {
            popNewMessage('请完善信息');

            return;
        }
        data[0] = Math.round(data[0] * 100);
        data[5] = Math.round(data[5] * 100);
        setWithDrawal(data).then(r => {
            if (r.result === 1) {
                popNewMessage('修改成功');
                this.props.isChange = true;
                this.init();
            } else {
                popNewMessage('修改失败');
            }
        }).catch(e => {
            popNewMessage('修改失败');
        });
    }
}