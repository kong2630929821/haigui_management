import { Widget } from '../../../pi/widget/widget';
import { getOperationLog } from '../../net/pull';
import { timeConvert, transitTimeStamp } from '../../utils/logic';
import { exportExcel } from '../../utils/tools';

// tslint:disable-next-line:missing-jsdoc
interface Props {
    showDataList:any;// 表格数据
    showTitleList:any;// 表格标题
    showDateBox:boolean;// 时间框是否展示
    startTime:string;// 开始时间
    endTime:string;// 结束时间
    sum:number;// 记录条数
    dataList:any;// 全部数据
    perPage:number;// 每页多少条数据
}
// 每页多少数据
const perPage = [20,50,100];
/**
 * 操作日志
 */
export class OperationLog extends Widget {
    public props:Props = {
        showDataList:[],
        showTitleList:['时间','用户名','IP地址','功能','事件'],
        showDateBox:false,
        startTime:'',
        endTime:'',
        sum:0,
        dataList:[],
        perPage:perPage[0]
    };

    public create() {
        super.create();
        const oData = new Date();
        const time = oData.setHours(23, 59, 59, 999);
        this.props.endTime =  timeConvert(time);
        this.props.startTime = '2019-05-01 00:00:000';
        this.init();
    }

    // 初始化数据
    public init() {
        const star_time = transitTimeStamp(this.props.startTime);
        const end_time = transitTimeStamp(this.props.endTime);
        getOperationLog(star_time,end_time).then(r => {
            this.props.dataList = r;
            this.props.sum = r.length;
            this.props.showDataList = this.props.dataList.slice(0,this.props.perPage);
            this.paint();
        });
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
        // 重置页面的展开状态
    public close() {
            // 判断时间选择框是否展开过
        if (this.props.showDateBox) {
            console.log('时间筛选',this.props.startTime,this.props.endTime);
            this.init();
        }
        this.props.showDateBox = false;
        this.paint();
    }
    // 导出全部数据
    public exportShop() {
        const oData = new Date();
        const end_time = oData.setHours(23, 59, 59, 999);
        const start_time = 0;
        getOperationLog(start_time,end_time).then(r => {
            const jsonHead = this.props.showTitleList;
            const aoa = [jsonHead];
            const jsonData = r;
            for (const v of jsonData) {
                for (let i = 0;i < v.length;i++) {
                    if (v[i]) {
                        v[i] = v[i].toString();
                    }  
                }
                aoa.push(v);
            }
            console.log(aoa);
            exportExcel(aoa,`操作日志.xlsx`);
        
            console.log('contentList ===',jsonData);
        });
    }
    // 分页变化
    public pageChange(e:any) {
        console.log(e.value);
        this.props.showDataList = this.props.dataList.slice(e.value * this.props.perPage,(e.value + 1) * this.props.perPage);
        console.log('当前页数据：',this.props.showDataList);
        this.paint();
    }
    // 每页展示多少数据
    public perPage(e:any) {
        this.props.perPage = perPage[e.value];
        this.init();     
    }
}