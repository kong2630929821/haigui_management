import { deepCopy } from '../../../pi/util/util';
import { Widget } from '../../../pi/widget/widget';
import { changeWithdrawState, getWithdrawApply } from '../../net/pull';
import { popNewMessage } from '../../utils/logic';

interface Props {
    datas:any[];  // 原始数据
    showDataList:any[];  // 显示数据
    showTitleList:string[];  // 显示标题
    activeTab:number;  // 活跃tab
    btn:string;  // 处理按钮
}
const Status = [
    '申请中',
    '处理中',
    '处理完成'
];
/**
 * 提现
 */
export class Withdraw extends Widget {
    public props:Props = {
        showDataList:[
            // ['123456','￥500.00','现金','2017-12-25 14:35','申请中']
        ],
        showTitleList:['用户ID','提现金额','手续费','提现渠道','提交时间','受理状态'],
        activeTab:0,
        datas:[],
        btn:'同意提现'
    };

    public changeTab(num:number) {
        this.props.activeTab = num;
        if (num === 1) {
            this.props.btn = '';
        } else {
            this.props.btn = '同意提现';
        }
        this.paint();
        getWithdrawApply().then(r => {
            let list = [];
            if (r.value && r.value.length > 0) {
                this.props.datas = r.value;
                list = r.value.map(item => {
                    return [
                        item[0],
                        item[2],
                        item[3],
                        '微信',
                        item[5],
                        Status[item[4]]
                    ];
                });
                list = list.filter(t => {
                    return t[5] === Status[this.props.activeTab];
                });
            }
            
            this.props.showDataList = list;
            this.paint();
        });
    }

    public dealWith(e:any) {
        console.log(e);
        const data = this.props.datas[0];
        if (data) {
            changeWithdrawState(data[0],data[1], 2).then(() => {
                popNewMessage('处理成功');
            });
        }
    }
}