import { Widget } from '../../../pi/widget/widget';
import { perPage } from '../../components/pagination';
import { getCheckInLog } from '../../net/pull';
import { dateToString, unicode2ReadStr } from '../../utils/logic';
import { exportExcel, rippleShow } from '../../utils/tools';

// tslint:disable-next-line:missing-jsdoc
interface Props {
    showDataList:any;// 表格数据
    showTitleList:any;// 表格标题
    sum:number;// 数据条数
    dataList:any;// 全部数据
    perPage:number;// 每页显示多少个
    currentIndex:number;
    expandIndex:boolean[];
    perPageIndex:number;// 分页的下标
    startTime:string; // 开始时间
    endTime:string; // 截止时间
    changeDateFg:boolean;  // 修改过时间 重新请求数据标记
}

/**
 * 签到数据
 */
export class CheckInLog extends Widget {
    public props:Props = {
        showDataList:[],
        showTitleList:['用户id','连续签到天数','微信名','电话'],
        sum:0,
        dataList:[],
        perPage:perPage[0],
        currentIndex:0,
        expandIndex:[false,false],
        perPageIndex:0,
        startTime:'2019-8-13',
        endTime:dateToString(Date.now(),1),
        changeDateFg:false
    };

    public create() {
        super.create();
        this.init();
    }

    // 初始化
    public init() {
        this.props.dataList = [];
        this.props.sum = 0;
        this.props.showDataList = [];
        this.paint();
        getCheckInLog(new Date(this.props.startTime).getTime(), new Date(this.props.endTime).getTime()).then(r => {
            const list = r.value || [];
            list.forEach(v => {
                v[2] = unicode2ReadStr(v[2]);
            });
            this.props.dataList = list;
            this.props.sum = list.length;
            this.props.showDataList = this.props.dataList.slice(0,this.props.perPage);
            this.paint();
        });
    }
    // 分页变化
    public pageChange(e:any) {
        this.props.currentIndex = e.value;
        this.props.expandIndex[1] = false;
        console.log(e.value);
        this.props.showDataList = this.props.dataList.slice(e.value * this.props.perPage,(e.value + 1) * this.props.perPage);
        console.log('当前页数据：',this.props.showDataList);
        this.paint();
    }
    // 每页展示多少数据
    public perPage(e:any) {
        this.props.perPage = e.value;
        this.props.perPageIndex = e.index;
        this.props.expandIndex[1] = false;
        this.pageChange({ value:0 });   
    }

    // 导出全部数据
    public exportLog() {
        const list = [this.props.showTitleList].concat(this.props.showDataList);
        for (const v of list) {
            for (let i = 0;i < v.length;i++) {
                if (typeof(v[i]) !== 'string') {
                    v[i] = v[i].toString();
                }  
            }
        }
        console.log('导出签到记录', list);
        exportExcel(list,`签到记录.xlsx`);
    }

    // 页面点击
    public close() {
        if (this.props.changeDateFg) {
            this.init();
        }
        this.props.expandIndex = [false,false];
        this.props.changeDateFg = false;
        this.paint();
    }
    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }

    // 日期选择框展示
    public changeDateBox(e:any) {
        if (this.props.changeDateFg) {
            this.init();
        }
        this.props.expandIndex[0] = e.value;
        this.paint();
    }

    // 修改截止时间
    public changeDate(e:any) {
        if (this.props.startTime !== e.value[0] || this.props.endTime !== e.value[1]) {
            this.props.changeDateFg = true;
        }
        this.props.startTime = e.value[0];
        this.props.endTime = e.value[1];
        this.paint();
    }
}