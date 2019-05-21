import { deepCopy } from '../../../pi/util/util';
import { Widget } from '../../../pi/widget/widget';
import { changeWithdrawState, getWithdrawApply, getWithdrawTotal } from '../../net/pull';
import { popNewMessage, priceFormat, timestampFormat } from '../../utils/logic';
import { exportExcel } from '../../utils/tools';

interface Props {
    datas:any[];  // 原始数据
    showDataList:any[];  // 显示数据
    showTitleList:string[];  // 显示标题
    activeTab:number;  // 活跃tab
    withdrawIdList:number[]; // 未处理的提现单号列表
    btn1:string;  // 按钮
    btn2:string;  // 按钮
    userNum:number; // 今日提现人数
    dayMoney:string; // 今日提现金额
    monthTotal:string; // 本月提现金额
    searUid:string;
    showDateBox:boolean;  // 日期选择框
}
const Status = [
    '申请中',
    '处理中',
    '提现成功',
    '提现失败'
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
        btn1:'',
        btn2:'开始处理',
        userNum:0,
        dayMoney:'0',
        monthTotal:'0',
        searUid:'',
        showDateBox:false
    };

    public create() {
        super.create();
        this.getData();
    }

    // 切换过滤
    public changeTab(num:number) {
        this.props.activeTab = num;
        if (num === 2) {
            this.props.btn1 = '';
            this.props.btn2 = '';
        } else if (num === 1) {
            this.props.btn1 = '拒绝提现';
            this.props.btn2 = '同意提现';
        } else {
            this.props.btn1 = '';
            this.props.btn2 = '开始处理';
        }
        this.props.showDataList = [];
        this.props.withdrawIdList = [];
        this.props.datas.forEach(t => {
            const v = deepCopy(t);
            if (t[6] === Status[num] || (num === 2 && t[6] === Status[3])) {
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

    // 查询用户id输入
    public uidChange(e:any) {
        this.props.searUid = e.value;
    }
  
    // 处理提现申请
    public async dealWith(e:any) {
        const id = this.props.withdrawIdList[e.num];
        const uid = this.props.showDataList[e.num][0];
        if (id && uid) {
            if (e.fg === 1) {
                await changeWithdrawState(id, uid, 3);  // 拒绝
            } else {
                await changeWithdrawState(id, uid, this.props.activeTab + 1);  // 处理中 同意
            } 
        }
        popNewMessage('处理完成');
        this.getData();
    }

    // 查询
    public search() {
        if (this.props.searUid) {
            const ids = [];
            const list = [];
            for (const i in this.props.showDataList) {
                const v = this.props.showDataList[i];
                if (v[0] === Number(this.props.searUid)) {
                    ids.push(this.props.withdrawIdList[i]);
                    list.push(v);
                }
            }
            this.props.showDataList = list;
            this.props.withdrawIdList = ids;
            this.paint();
        } else {
            this.changeTab(this.props.activeTab);
        }
    }

    // 导出列表
    public exportData() {
        if (this.props.showDataList.length > 0) {
            this.props.showDataList.unshift(this.props.showTitleList);
            let name = '提现申请列表.xls';
            if (this.props.activeTab === 1) name = '提现处理中列表.xls';
            if (this.props.activeTab === 2) name = '提现处理完成列表.xls';
            exportExcel(this.props.showDataList,name);
        } else {
            popNewMessage('没有数据无法导出');
        }
    }

    // 日期选择框显示
    public changeDateBox(e:any) {
        this.props.showDateBox = e.value;
        this.paint();
    }

    public pageClick() {
        this.props.showDateBox = false;
        this.paint();
    }
}