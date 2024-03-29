import { popNew } from '../../../pi/ui/root';
import { deepCopy } from '../../../pi/util/util';
import { Widget } from '../../../pi/widget/widget';
import { perPage } from '../../components/pagination';
import { changeWithdrawState, getWithdrawApply, getWithdrawTotal } from '../../net/pull';
import { getStore } from '../../store/memstore';
import { dateToString, parseDate, popNewMessage, priceFormat, timestampFormat, unicode2Str } from '../../utils/logic';
import { exportExcel, getUserType, rippleShow } from '../../utils/tools';
import { RightsGroups } from '../base/home';

interface Props {
    datas:any[];  // 原始数据
    showDataList:any[];  // 显示数据
    showTitleList:string[];  // 显示标题
    activeTab:number;  // 活跃tab
    withdrawIdList:number[]; // 未处理的提现单号列表
    btn1:string;  // 按钮
    btn2:string;  // 按钮
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
    auth:any;// 权限值
    pool:any;// 提现汇总数据
    optionsList:string[]; // 下拉框
    showFilterBox:boolean;  // 展开过滤器
    active:number;
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
        showTitleList:['用户ID','提现金额','手续费','提现渠道','申请时间','受理状态','拒绝理由','微信支付单号','处理时间','身份'],
        activeTab:0,
        withdrawIdList:[],
        datas:[],
        btn1:'',
        btn2:'开始处理',
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
        allDataWithdrawIdList:[],
        auth:getStore('flags/auth'),
        pool:[],
        optionsList:['申请时间'],
        showFilterBox:false,
        active:0
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
        this.pageClick();
        if (num === 2) {
            this.props.optionsList = ['申请时间','处理时间'];
        } else {
            this.props.optionsList = ['申请时间'];
        }
        if (this.props.activeTab !== num) {
            this.props.curPage = 0;   // 切换了tab就显示第一页
        }
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
        const pages = Math.ceil(this.props.showDataList.length / this.props.perPage);
        this.changePage({ value:this.props.curPage < pages ? (this.props.curPage < 0 ? 0 :this.props.curPage) :pages - 1 });
    }

    // 获取数据
    public getData() {
        // userNum:number; // 今日提现人数
        // dayMoney:string; // 今日提现金额
        // monthTotal:string; // 本月提现金额
        getWithdrawTotal(Date.parse(this.props.startTime),Date.parse(this.props.endTime),this.props.active).then(r => {
            this.props.pool = [
                { key:'当日提现人数',value:r.day_count,src:'../../res/images/defultUser.png' },
                { key:'当日提现金额',value:priceFormat(r.day_money),src:'../../res/images/money.png' },
                { key:'当月提现金额',value:priceFormat(r.month_total),src:'../../res/images/money.png' },
                { key:'未提现总金额',value:priceFormat(r.balance_total),src:'../../res/images/money.png' },  
                { key:'申请提现人数',value:r.value2[0],src:'../../res/images/defultUser.png' },
                { key:'实际提现人数 ',value:r.value2[1],src:'../../res/images/money.png' },
                { key:'申请提现金额',value:priceFormat(r.value2[2]),src:'../../res/images/money.png' },
                { key:'实际提现金额',value:priceFormat(r.value2[3]),src:'../../res/images/money.png' }
            ];
            this.paint();
        });
        getWithdrawApply(Date.parse(this.props.startTime),Date.parse(this.props.endTime),this.props.active).then(r => {
            this.props.datas = [];
            this.props.showDataList = [];
            this.props.curShowDataList = [];
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
                        timestampFormat(item[8]), // 处理时间
                        getUserType(item[9][0],item[9][1]) // 身份
                    ];
                });
                this.changeTab(this.props.activeTab);
            } 
            this.paint();
        });
    }

    // 查询用户id输入
    public uidChange(e:any) {
        this.pageClick();
        this.props.searUid = e.value;
    }
  
    // 处理提现申请
    public async dealWith(e:any) {
        const id = this.props.withdrawIdList[e.num + this.props.curPage  * this.props.perPage];
        const uid = this.props.showDataList[e.num + this.props.curPage  * this.props.perPage][0];
        if (id && uid) {
            if (e.fg === 1) {
                if (this.props.auth[0] !== 0 && this.props.auth.indexOf(RightsGroups.finance) === -1) {
                    popNewMessage('暂无权限');

                    return;
                }
                popNew('app-components-modalBoxInput',{ title:`确认拒绝用户“<span style="color:#1991EB">${uid}</span>”的提现申请`,placeHolder:'请输入拒绝理由', errMessage:'请输入拒绝理由' },async (r) => {
                    if (!r) {
                        popNewMessage('请输入拒绝理由！');
                    } else {
                        await changeWithdrawState(id, uid, 3, r).then(r => { // 拒绝
                            if (r.result === 1) {
                                popNewMessage('处理完成');
                            } else if (r.type === 6008) {
                                popNewMessage('当日提现金额到达微信上限');
                            } else if (r.type === 6002) {
                                popNewMessage('当日提现金额到达配置上限');
                            } else {
                                popNewMessage('处理失败');
                            }
                        }).catch(e => {
                            popNewMessage('处理失败');
                        });
                        this.getData();
                    }  
                });
                
            } else {
                if (this.props.activeTab === 0) {
                    if (this.props.auth[0] !== 0 && this.props.auth.indexOf(RightsGroups.operation) === -1) {
                        popNewMessage('暂无权限');
    
                        return;
                    }
                    await changeWithdrawState(id, uid, 1,'').then(r => {
                        console.log(r);
                        if (r.result === 1) {
                            popNewMessage('处理完成');
                        } else if (r.type === 6008) {
                            popNewMessage('当日提现金额到达微信上限');
                        } else if (r.type  === 6002) {
                            popNewMessage('当日提现金额到达配置上限');
                        } else {
                            popNewMessage('处理失败');
                        }
                    }).catch(e => {
                        popNewMessage('处理失败');
                    });  // 开始处理
                    this.getData();
                } else {
                    if (this.props.auth[0] !== 0 && this.props.auth.indexOf(RightsGroups.finance) === -1) {
                        popNewMessage('暂无权限');
    
                        return;
                    }
                    popNew('app-components-modalBox',{ content:`确认同意用户“<span style="color:#1991EB">${uid}</span>”的提现申请` },async () => {
                        await changeWithdrawState(id, uid, 2,'').then(r => {
                            if (r.result === 1) {
                                popNewMessage('处理完成');
                            } else if (r.type === 6008) {
                                popNewMessage('当日提现金额到达微信上限');
                            } else if (r.type === 6002) {
                                popNewMessage('当日提现金额到达配置上限');
                            } else {
                                popNewMessage('处理失败');
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
        if (this.props.auth[0] !== 0 && this.props.auth.indexOf(RightsGroups.operation) === -1) {
            popNewMessage('暂无权限');

            return;
        }
        popNew('app-components-modalBox',{ content:`确认重新处理用户“<span style="color:#1991EB">${uid}</span>”的提现申请` },async () => {
            await changeWithdrawState(id, uid, 1, '').then(r => {
                if (r.result === 1) {
                    popNewMessage('处理完成');
                } else if (r.type === 6008) {
                    popNewMessage('当日提现金额到达微信上限');
                } else if (r.type === 6002) {
                    popNewMessage('当日提现金额到达配置上限');
                } else {
                    popNewMessage('处理失败');
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
        this.pageClick();
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
            this.props.timeTypeActiveIndex = 0;
            this.paint();
        }
    }

    // 导出列表
    public exportData() {
        this.pageClick();
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
    public changeDate(e:any) {
        this.props.startTime = e.value[0];
        this.props.endTime = e.value[1];
    }

    public pageClick() {
        if (this.props.showDateBox) {
            this.getData();
            this.props.timeTypeActiveIndex = 0;
        }
        this.props.showDateBox = false;
        this.props.expandIndex = [false,false];
        this.props.showFilterBox = false;
        this.paint();
    }

    // 查看某一页数据
    public changePage(e:any) {
        this.pageClick();
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
        this.pageClick();
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
        this.pageClick();
        this.props.expandIndex[index] = e.value;
        this.paint();
    }

    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }
    public filterTime(e:any) {
        this.props.active = e.value;
        this.props.showFilterBox = false;
        this.getData();
        this.paint();
    }

        // 过滤器
    public changeFilterBox(e:any) {
        this.pageClick();
        this.props.showFilterBox = e.value;
        this.paint();
    }
}