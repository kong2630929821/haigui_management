import { popNew } from '../../../pi/ui/root';
import { Widget } from '../../../pi/widget/widget';
import {  getBigTurntable, settingTruntable } from '../../net/pull';
import { popNewMessage } from '../../utils/logic';
import { rippleShow } from '../../utils/tools';

// tslint:disable-next-line:missing-jsdoc
interface Props {
    showTitleList:any;// 表格标题
    foreign:any;// 对外转盘参数
    real:any;// 真实转盘参数
    foreignSum:number;// 数据条数
    realSum:number;// 数据条数
    flag1:boolean;// 真实梯度是否修改
    flag2:boolean;// 对外梯度是发修改
}
/**
 * 大转盘
 */
export class BigTurntable extends Widget {
    public props:Props = {
        showTitleList:['金额(分)','中奖权重'],
        foreign:[],
        real:[],
        foreignSum:0,
        realSum:0,
        flag1:false,
        flag2:false
    };

    public create() {
        super.create();
        this.init();
    }

    // 初始化
    public init() {
        getBigTurntable().then(r => {
            if (r.result === 1) {
                this.props.foreign = r.config_out;
                this.props.foreignSum = r.config_out.length;
                this.props.real = r.config_in;
                this.props.realSum = r.config_in.length;
                this.paint();
            }
        });
    }
    // 真实梯度表格操作按钮
    public goDetail(e:any) {
        if (e.fg === 1) {
            // 编辑
            popNew('app-components-addTurntable',{ title:'编辑真实转盘梯度',currentData:e.value,sureText:'修改',style:false },(val) => {
                this.props.real[e.num] = val;
                this.props.flag1 = true;
                this.paint();
            });
        } else {
            popNew('app-components-modalBox',{ content:`确认删除梯度"<span style="color:#1991EB">${e.value[0]}</span>"` }, () => {
                this.props.real.splice(e.num,1);
                this.props.realSum = this.props.real.length;
                this.props.flag1 = true;
                this.paint();
            },() => {
                popNewMessage('你已经取消操作！');
            });
        }
    
    }
    // 对外显示梯度表格操作按钮
    public goDetailOut(e:any) {
        if (e.fg === 1) {
                    // 编辑
            popNew('app-components-addTurntable',{ title:'编辑对外显示转盘梯度',currentData:e.value,sureText:'修改',style:false },(val) => {
                this.props.foreign[e.num] = val;
                this.props.flag2 = true;
                this.paint();
            });
        } else {
            popNew('app-components-modalBox',{ content:`确认删除梯度"<span style="color:#1991EB">${e.value[0]}</span>"` }, () => {
                this.props.foreign.splice(e.num,1);
                this.props.foreignSum = this.props.foreign.length;
                this.props.flag2 = true;
                this.paint();
            },() => {
                popNewMessage('你已经取消操作！');
            });
        }
            
    }
    // 添加真实梯度
    public addGradientIn() {
        popNew('app-components-addTurntable',{ title:'添加真实转盘梯度' },(val) => {
            this.props.real.push(val);
            this.props.realSum = this.props.real.length;
            this.props.flag1 = true;
            this.paint();
        });
    }
    // 添加对外显示梯度
    public addGradientOut() {
        popNew('app-components-addTurntable',{ title:'添加对外显示转盘梯度' },(val) => {
            this.props.foreign.push(val);
            this.props.foreignSum = this.props.foreign.length;
            this.props.flag2 = true;
            this.paint();
        });
    }

    // 应用设置
    public application(fg:number) {
        if (fg === 1) {
            if (!this.props.flag1) {
                return; 
            }
        } else {
            if (!this.props.flag2) {
                return; 
            }
        }
        let data = this.props.real;
        if (fg === 2) {
            // 真实中奖设置
            data = this.props.foreign;
        }
        settingTruntable(fg,JSON.stringify(data)).then(r => {
            if (r.result === 1) {
                popNewMessage('设置成功');
                if (fg === 1) {
                    this.props.flag1 = false;
                } else {
                    this.props.flag2 = false;
                }
            } else {
                popNewMessage('设置失败');
            }
        }).catch(e => {
            popNewMessage('设置失败');
        });
    }
        // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }
}