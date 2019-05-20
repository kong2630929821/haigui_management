import { deepCopy } from '../../../pi/util/util';
import { Widget } from '../../../pi/widget/widget';
import { changeWithdrawState, getWithdrawApply, getWithdrawTotal } from '../../net/pull';
import { popNewMessage, priceFormat, timestampFormat } from '../../utils/logic';

interface Props {
    datas:any[];  // 原始数据
    showDataList:any[];  // 显示数据
    showTitleList:string[];  // 显示标题
    activeTab:number;  // 活跃tab
    withdrawIdList:number[]; // 未处理的提现单号列表
    btn:string;  // 处理按钮
    userNum:number; // 今日提现人数
    dayMoney:string; // 今日提现金额
    monthTotal:string; // 本月提现金额
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
        withdrawIdList:[],
        datas:[],
        btn:'同意提现',
        userNum:0,
        dayMoney:'0',
        monthTotal:'0'
    };

    public create() {
        super.create();
        this.getData();
    }

    // 切换过滤
    public changeTab(num:number) {
        this.props.activeTab = num;
        if (num === 2) {
            this.props.btn = '';
        } else {
            this.props.btn = '同意提现';
        }
        this.props.showDataList = [];
        this.props.withdrawIdList = [];
        this.props.datas.forEach(t => {
            const v = deepCopy(t);
            if (t[6] === Status[num]) {
                this.props.withdrawIdList.push(v.shift());
                this.props.showDataList.push(v);
            }
        });
        this.paint();
    }

    // 获取数据
    public getData() {
        getWithdrawTotal().then(r => {
            this.props.userNum = r.day_count;
            this.props.dayMoney = priceFormat(r.day_money);
            this.props.monthTotal = priceFormat(r.month_total);
        });
        getWithdrawApply().then(r => {
            if (r.value && r.value.length > 0) {
                this.props.datas = r.value.map(item => {
                    return [
                        item[0],           // id
                        item[1],           // uid
                        `￥${priceFormat(item[2])}`,     // 金额
                        `￥${priceFormat(item[3])}`,     // 手续费
                        '微信',            // 提现渠道
                        timestampFormat(item[5]), // 时间
                        Status[item[4]]       // 状态
                    ];
                });
                this.changeTab(this.props.activeTab);
            }
            this.paint();
        });
    }

    // 处理提现申请
    public async dealWith(e:any) {
        console.log(e);
        for (const v of e.value) {
            const id = this.props.withdrawIdList[v];
            const uid = this.props.showDataList[v][0];
            if (id && uid) {
                await changeWithdrawState(id, uid, this.props.activeTab + 1);
            }
        }
        popNewMessage('处理完成');
        this.getData();
    }

}