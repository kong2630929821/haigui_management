import { popNew } from '../../../pi/ui/root';
import { Widget } from '../../../pi/widget/widget';
import { getAllUser, getBigTurntable, removeUser } from '../../net/pull';
import { popNewMessage } from '../../utils/logic';
import { exportExcel } from '../../utils/tools';

// tslint:disable-next-line:missing-jsdoc
interface Props {
    showTitleList:any;// 表格标题
    foreign:any;// 对外转盘参数
    real:any;// 真实转盘参数
    foreignSum:number;// 数据条数
    realSum:number;// 数据条数
}
/**
 * 大转盘
 */
export class BigTurntable extends Widget {
    public props:Props = {
        showTitleList:['金额(分)','中奖概率(%)'],
        foreign:[],
        real:[],
        foreignSum:0,
        realSum:0
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
        // 表格操作按钮
    public goDetail(e:any) {
        if (e.fg === 1) {
            // 编辑
            popNew('app-components-addTurntable',{ title:'编辑梯度',currentData:e.value,sureText:'修改',style:false },() => {
                this.init();
            });
        } else {
            popNew('app-components-modalBox',{ content:`确认删除梯度“<span style="color:#1991EB">${e.value[0]}</span>` }, () => {
                this.remove(e.value[0]);
            },() => {
                popNewMessage('你已经取消操作！');
            });
        }
    
    }
    // 添加梯度
    public addUser() {
        popNew('app-components-addTurntable',{ title:'添加梯度' },() => {
            this.init();
        });
    }

    // 删除账号
    public remove(user:string) {
        removeUser(user).then(r => {
            if (r.result === 1) {
                popNewMessage('删除成功');
                this.init();
            } else {
                popNewMessage('删除失败');
            }
        }).catch(e => {
            popNewMessage('删除失败');
        });
    }
}