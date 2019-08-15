import { popNew } from '../../../pi/ui/root';
import { deepCopy } from '../../../pi/util/util';
import { Widget } from '../../../pi/widget/widget';
import { perPage } from '../../components/pagination';
import { changeHWangState, getHWangApply, getHwangTotal } from '../../net/pull';
import { setStore } from '../../store/memstore';
import { dateToString, parseDate, popNewMessage, unicode2ReadStr, unicode2Str } from '../../utils/logic';
import { addressFormat, exportExcel, rippleShow } from '../../utils/tools';
interface Props {
    datas:any[];  // 原始数据
    showDataList:any[];  // 显示数据
    showTitleList:string[];  // 显示标题
    activeTab:number;  // 活跃tab
    btn1:string;  // 按钮
    btn2:string;  // 按钮
    applyIdList:number[]; // 申请开通海王的ID列表
    searPhone:string;  // 查询手机号
    dayCount:number;   // 今天申请人数
    monCount:number;  // 本月申请人数
    allCount:number;  // 海王总数
    showDateBox:boolean; // 展示日期选择框
    startTime:string;  // 开始时间
    endTime:string;  // 结束时间
    curShowDataList:any[]; // 当前页显示数据
    curPage:number; // 当前页码
    perPage:number;// 每页显示多少个
    expandIndex:boolean;// 下拉显示
    perPageIndex:number;// 一页显示多少个下标
    optionsList:string[]; // 下拉框
    showFilterBox:boolean;  // 展开过滤器
    active:number;
}
const Status = [
    '申请中',
    '处理中',
    '开通成功',
    '开通失败'
];
/**
 * 开通海王
 */
export class OpenHWang extends Widget {
    public props:Props = {
        showDataList:[
            // ['123456','张三','15534429570','四川省成都市金牛区XX街道XX小区XX','申请中']
        ],
        showTitleList:['用户ID','姓名','手机号','地址信息','微信名','邀请人id','申请时间','受理状态','拒绝理由','处理时间'],
        activeTab:0,
        datas:[],
        btn1:'',
        btn2:'开始处理',
        applyIdList:[],
        searPhone:'',
        dayCount:0,
        monCount:0,
        allCount:0,
        showDateBox:false,
        startTime:'',
        endTime:'',
        curShowDataList:[],
        curPage:0,
        perPage:perPage[0],
        expandIndex:false,
        perPageIndex:0,
        optionsList:['申请时间'],
        showFilterBox:false,
        active:0
    };

    public create() {
        super.create();
        this.props.endTime = dateToString(Date.now(),1);
        this.props.startTime = parseDate(this.props.endTime,-7,1);
        this.getData();
    }

    // 切换tab
    public changeTab(num:number) {
        this.pageClick();
        if (num === 2) {
            this.props.optionsList = ['申请时间','处理时间'];
        } else {
            this.props.optionsList = ['申请时间'];
        }

        if (this.props.activeTab !== num) {
            this.props.curPage = 0;
        }
        this.props.activeTab = num;
        if (num === 2) {
            this.props.btn1 = '';
            this.props.btn2 = '';
        } else if (num === 1) {
            this.props.btn1 = '拒绝开通';
            this.props.btn2 = '同意开通';
        } else {
            this.props.btn1 = '';
            this.props.btn2 = '开始处理';
        }
        this.props.showDataList = [];
        this.props.applyIdList = [];
        this.props.datas.forEach(t => {
            const v = deepCopy(t);
            if (t[8] === Status[num] || (num === 2 && t[8] === Status[3])) {
                this.props.applyIdList.push(v.shift());
                this.props.showDataList.push(v);
            }
        });
        
        const pages = Math.ceil(this.props.showDataList.length / this.props.perPage);
        this.changePage({ value:this.props.curPage < pages ? this.props.curPage :pages - 1 });
    }

    // 获取数据
    public getData() {
        getHwangTotal().then(r => {
            this.props.dayCount = r.day_count;
            this.props.monCount = r.month_count;
            this.props.allCount = r.haiw_count;
            this.paint();
        });
        getHWangApply(this.props.active,Date.parse(this.props.startTime),Date.parse(this.props.endTime)).then(r => {
            this.props.datas = [];
            this.props.showDataList = [];
            if (r.value && r.value.length > 0) {
                this.props.datas = r.value.map(item => {
                  
                    return [
                        item[0],    // 记录id
                        item[1],    // 用户uid
                        unicode2Str(item[8]),  // 姓名
                        item[2],     // 电话
                        addressFormat(item[4]),     // 地址
                        unicode2ReadStr(item[3]),   // 微信名
                        item[7],    // 邀请人id
                        dateToString(item[6],1), // 申请时间
                        Status[item[5]],  // 状态
                        unicode2Str(item[9]),  // 拒绝理由
                        dateToString(item[10],1)// 处理时间
                    ];
                });
                this.changeTab(this.props.activeTab);
            }
            this.paint();
        });
    }

    // 查询手机号输入
    public phoneChange(e:any) {
        this.props.searPhone = e.value;
    }

    // 处理数据
    public async dealWith(e:any) {
        const id = this.props.applyIdList[this.props.curPage * 5 + e.num];
        const uid = this.props.curShowDataList[e.num][0];
        if (id && uid) {
            if (e.fg === 1) {
               
                popNew('app-components-modalBoxInput',{ title:`确认拒绝用户“<span style="color:#1991EB">${uid}</span>”的开通海王申请`,placeHolder:'请输入拒绝理由',errMessage:'请输入拒绝理由' },async (r) => {
                    if (!r) {
                        popNewMessage('请输入拒绝理由！');
                    } else {
                        await changeHWangState(id, uid, 3, r);  // 拒绝
                        popNewMessage('处理完成');
                        this.getData();
                    }
                    
                });
                
            } else {
                if (this.props.activeTab === 0) {
                    await changeHWangState(id, uid, 1, '');  // 开始处理
                    popNewMessage('处理完成');
                    this.getData();
                } else {
                    popNew('app-components-modalBox',{ content:`确认同意用户“<span style="color:#1991EB">${uid}</span>”的开通海王申请` },async () => {
                        await changeHWangState(id, uid, 2, '');  // 同意
                        popNewMessage('处理完成');
                        setStore('flags/vipChange',true);
                        this.getData();
                    });
                }
            } 
            
        }
        
    }

    // 查询
    public search() {
        this.pageClick();
        if (this.props.searPhone) {
            this.props.showDataList = [];
            this.props.applyIdList = [];
            const num = this.props.activeTab;

            for (const t of this.props.datas) {
                const v = deepCopy(t);
                if (t[3] === this.props.searPhone && (t[8] === Status[num] || (num === 2 && t[8] === Status[3]))) {
                    this.props.applyIdList.push(v.shift());
                    this.props.showDataList.push(v);
                }
            }
            this.changePage({ value:0 });
        } else {
            this.getData();
        }
    }

    // 导出列表
    public exportData() {
        this.pageClick();
        if (this.props.showDataList.length > 0) {
            this.props.showDataList.unshift(this.props.showTitleList);
            let name = '海王申请列表.xls';
            if (this.props.activeTab === 1) name = '海王处理中列表.xls';
            if (this.props.activeTab === 2) name = '海王处理完成列表.xls';
            exportExcel(this.props.showDataList,name);
        } else {
            popNewMessage('没有数据无法导出');
        }
    }

    // 日期选择框显示
    public changeDateBox(e:any) {
        this.pageClick();
        this.props.showDateBox = e.value;
        this.paint();
    }

    // 改变时间
    public  changeDate(e:any) {        
        this.props.startTime = e.value[0];
        this.props.endTime = e.value[1];
    }

    public pageClick() {
        if (this.props.showDateBox) {
            this.getData();
        }
        this.props.showDateBox = false;
        this.props.expandIndex = false;
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

     // 每页展示多少数据
    public perPage(e:any) {
        this.pageClick();
        this.props.perPageIndex = e.index;
        this.props.perPage = e.value;
        this.changePage({ value:0 });   
    }

    // 过滤器
    public expand(e:any) {
        this.pageClick();
        this.props.expandIndex = e.value;
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