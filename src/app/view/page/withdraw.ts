import { popNew } from '../../../pi/ui/root';
import { deepCopy } from '../../../pi/util/util';
import { Widget } from '../../../pi/widget/widget';
import { perPage } from '../../components/pagination';
import { changeWithdrawState, getWithdrawApply, getWithdrawTotal } from '../../net/pull';
import { dateToString, parseDate, popNewMessage, priceFormat, timestampFormat, unicode2Str } from '../../utils/logic';
import { exportExcel, rippleShow } from '../../utils/tools';

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
    startTime:string;  // 开始时间
    endTime:string;  // 结束时间
    curShowDataList:any[]; // 当前页显示数据
    curPage:number; // 当前页码
    timeType:any;
    timeTypeActiveIndex:number;
    expandIndex:any;   
    perPage:number;// 每页多少条数据 
    perPageIndex:number;// 一页显示多少个的下标
    allData:any;// 过滤后的全部数据
    allDataWithdrawIdList:any;// 过滤后的未处理的提现单号列表
}
const Status = [
    '申请中',
    '处理中',
    '提现成功',
    '提现拒绝',
    '提现失败'

];
// 订单时间类型
export enum TimeType {
    PAYTIME = 0,       // 全部
    PAYTIME_2 = 1, // 成功
    PAYTIME_1= 2, // 拒绝
    PAYTIME_3= 3 // 失败
    
}
/**
 * 提现
 */
export class Withdraw extends Widget {
    public props:Props = {
        showDataList:[
            // ['123456','￥500.00','现金','2017-12-25 14:35','申请中']
        ],
        showTitleList:['用户ID','提现金额','手续费','提现渠道','提交时间','受理状态','拒绝理由','微信支付单号','处理时间'],
        activeTab:0,
        withdrawIdList:[],
        datas:[],
        btn1:'',
        btn2:'开始处理',
        userNum:0,
        dayMoney:'0',
        monthTotal:'0',
        searUid:'',
        showDateBox:false,
        startTime:'',
        endTime:'',
        curShowDataList:[], 
        curPage:0 ,
        timeType:[],
        timeTypeActiveIndex:0,
        expandIndex:[false,false],
        perPage:perPage[0],
        perPageIndex:0,
        allData:[],
        allDataWithdrawIdList:[]
    };

    public create() {
        super.create();
        this.props.endTime = dateToString(Date.now(),1);
        this.props.startTime = parseDate(this.props.endTime,-7,1);
        const timeType = [{
            status:TimeType.PAYTIME,
            text:'全部'
        },{
            status:TimeType.PAYTIME_2,
            text:'提现成功'
        },{
            status:TimeType.PAYTIME_1,
            text:'提现拒绝'
        },{
            status:TimeType.PAYTIME_3,
            text:'提现失败'
        }];
        this.props.timeType = timeType;
        this.getData();
    }

    // 切换过滤
    public changeTab(num:number) {
        this.props.curPage = 0;
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
        this.props.allData = [];
        for (const t of this.props.datas) {
            const v = deepCopy(t);
            // if ((t[6] === Status[num] && num !== 2) || 
            //     (num === 2 && t[6] === Status[2] && t[6] === Status[this.props.timeTypeActiveIndex + 2]) || 
            //     (num === 2 && t[6] === Status[3] && t[6] === Status[this.props.timeTypeActiveIndex + 2]) || 
            //     (num === 2 && t[6] === Status[4] && t[6] === Status[this.props.timeTypeActiveIndex + 2])) {
            //     this.props.withdrawIdList.push(v.shift());
            //     this.props.showDataList.push(v);
            // }
            if (t[6] === Status[num] || (num === 2 && (t[6] === Status[2] || t[6] === Status[3] || t[6] === Status[4]))) {
                this.props.allData.push(deepCopy(v));
                this.props.withdrawIdList.push(v.shift());
                this.props.showDataList.push(v);
                
            }
            // if (num === 2 && t[6] === Status[4] && t[6] === Status[this.props.timeTypeActiveIndex + 2]) {
            //     this.props.btn1 = '重新处理';
            // }
        } 
        this.props.allDataWithdrawIdList = this.props.withdrawIdList;
        this.changePage({ value:0 });
    }

    // 获取数据
    public getData() {
        getWithdrawTotal().then(r => {
            this.props.userNum = r.day_count;
            this.props.dayMoney = priceFormat(r.day_money);
            this.props.monthTotal = priceFormat(r.month_total);
        });
        getWithdrawApply(Date.parse(this.props.startTime),Date.parse(this.props.endTime)).then(r => {
            this.props.datas = [];
            this.props.showDataList = [];
            if (r.value && r.value.length > 0) {
                this.props.datas = r.value.map(item => {
                    return [
                        item[0],           // id
                        item[1],           // uid
                        `￥${priceFormat(item[2])}`,     // 金额
                        `￥${priceFormat(item[3])}`,     // 手续费
                        '微信',            // 提现渠道
                        timestampFormat(item[5]), // 时间
                        Status[item[4]],       // 状态
                        unicode2Str(item[6]),   // note 拒绝理由
                        item[7], // 微信单号
                        timestampFormat(item[8]) // 处理时间
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
        const id = this.props.withdrawIdList[e.num + this.props.curPage  * this.props.perPage];
        const uid = this.props.showDataList[e.num + this.props.curPage  * this.props.perPage][0];
        if (id && uid) {
            if (e.fg === 1) {
                popNew('app-components-modalBoxInput',{ title:`确认拒绝用户“<span style="color:#1991EB">${uid}</span>”的提现申请`,placeHolder:'请输入拒绝理由', errMessage:'请输入拒绝理由' },async (r) => {
                    if (!r) {
                        popNewMessage('请输入拒绝理由！');
                    } else {
                        await changeWithdrawState(id, uid, 3, r).then(r => { // 拒绝
                            if (r.result !== 1) {
                                popNewMessage('处理失败');
                            } else {
                                popNewMessage('处理完成');
                            }
                        }).catch(e => {
                            popNewMessage('处理失败');
                        });
                        this.getData();
                    }  
                });
                
            } else {
                if (this.props.activeTab === 0) {
                    await changeWithdrawState(id, uid, 1,'').then(r => {
                        console.log(r);
                        if (r.result !== 1) {
                            popNewMessage('处理失败');
                        } else {
                            popNewMessage('处理完成');
                        }
                    }).catch(e => {
                        popNewMessage('处理失败');
                    });  // 开始处理
                    this.getData();
                } else {
                    popNew('app-components-modalBox',{ content:`确认同意用户“<span style="color:#1991EB">${uid}</span>”的提现申请` },async () => {
                        await changeWithdrawState(id, uid, 2,'').then(r => {
                            if (r.result !== 1) {
                                popNewMessage('处理失败');
                            } else {
                                popNewMessage('处理完成');
                            }
                        }).catch(e => {
                            popNewMessage('处理失败');
                        });  // 同意
                        
                        this.getData();
                    });
                }
            } 
        }
        
    }

    public async redealWith(e:any) {
        // TODO:
        const id = this.props.withdrawIdList[e.num + this.props.curPage * this.props.perPage];
        const uid = this.props.showDataList[e.num + this.props.curPage * this.props.perPage][0];
        popNew('app-components-modalBox',{ content:`确认重新处理用户“<span style="color:#1991EB">${uid}</span>”的提现申请` },async () => {
            await changeWithdrawState(id, uid, 1, '').then(r => {
                if (r.result !== 1) {
                    popNewMessage(r.error_code);
                }
            }).catch(e => {
                popNewMessage(e.error_code);
            });  // 开始处理
            popNewMessage('处理完成');
            this.getData();
            this.props.timeTypeActiveIndex = 0;
            this.paint();
        });
    }

    // 查询
    public search() {
        if (this.props.searUid) {
            this.props.showDataList = [];
            this.props.withdrawIdList = [];
            this.props.allData = [];
            const num = this.props.activeTab;
            const searUid = Number(this.props.searUid);
            for (const t of this.props.datas) {
                const v = deepCopy(t);
                if (t[1] === searUid && (t[6] === Status[num] || (num === 2 && (t[6] === Status[2] || t[6] === Status[3] || t[6] === Status[4])))) {
                    this.props.allData.push(deepCopy(v));
                    this.props.withdrawIdList.push(v.shift());
                    this.props.showDataList.push(v);
                }
            }
            this.props.allDataWithdrawIdList = this.props.withdrawIdList;
            this.filterTimeType({ activeIndex:0 });
            this.paint();
        } else {
            this.getData();
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

    // 改变时间
    public  changeDate(e:any) {
        this.props.startTime = e.value[0];
        this.props.endTime = e.value[1];
    }

    public pageClick() {
        this.props.showDateBox = false;
        this.props.expandIndex = [false,false];
        this.paint();
    }

    // 查看某一页数据
    public changePage(e:any) {
        this.props.curPage = e.value;
        this.props.curShowDataList = this.props.showDataList.slice(e.value * this.props.perPage,e.value * this.props.perPage + this.props.perPage);
        this.paint();
    }

    // 成功失败切换
    public filterTimeType(e:any) {
        this.props.timeTypeActiveIndex = this.props.timeType[e.activeIndex].status;
        this.props.expandIndex[0] = false;
        const num = this.props.timeTypeActiveIndex;
        const data = deepCopy(this.props.allData);
        this.props.showDataList = [];
        this.props.withdrawIdList = [];
        // this.changeTab(this.props.activeTab);
        for (const t of data) {
            const v = deepCopy(t);
            if (num === 0) {
                if ((t[6] === Status[num] || ((t[6] === Status[2] || t[6] === Status[3] || t[6] === Status[4])))) {
                    this.props.withdrawIdList.push(v.shift());
                    this.props.showDataList.push(v);
                }
            } else {
                if (t[6] === Status[this.props.timeTypeActiveIndex + 1]) {
                    this.props.withdrawIdList.push(v.shift());
                    this.props.showDataList.push(v);
                }
            }
            
        }
        if (num === 3) {
            this.props.btn1 = '重新处理';
        } else {
            this.props.btn1 = '';
        }
        this.paint();
        this.changePage({ value:0 });
    }

    // 每页展示多少数据
    public perPage(e:any) {
        this.props.perPage = e.value;
        this.props.perPageIndex = e.index;
        this.props.expandIndex[1] = false;
        if (this.props.searUid) {
            this.search();
        } else {
            this.changePage({ value:0 });   
        }
            
    }

    // 过滤器
    public expand(e:any,index:number) {
        this.props.expandIndex[index] = e.value;
        this.paint();
    }

    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }
}