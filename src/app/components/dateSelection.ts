/**
 * 日期选择器
 */

// ================================================ 导入
import { notify } from '../../pi/widget/event';
import { Widget } from '../../pi/widget/widget';
import { parseDate } from '../utils/logic';

// ================================================ 导出
interface Props {
    dateHead:string[]; // 日期标题
    dateList: any[]; // 日期数据
    month:number; // 当前日期的月
    year:number; // 当前日期的年
    curDate:number[];  // 当前日期的年 月 日数组
    showDate:string; // 默认显示的日期
}

// tslint:disable-next-line:completed-docs
export class DateSelection extends Widget {
    public ok: () => void;
    public props: Props = {
        dateHead:['日','一','二','三','四','五','六'],
        dateList: [],
        month:3,
        year:2019,
        curDate:[2019,3,13],  
        showDate:'' // 默认显示的日期
    };

    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(props);
        let now = new Date();
        if (this.props.showDate) {
            now = new Date(this.props.showDate);
        }
        this.props.month = now.getMonth() + 1;
        this.props.year = now.getFullYear();
        this.props.curDate = [this.props.year,this.props.month,now.getDate()];
        this.init();
    }

    public init() {
        const index = new Date(`${this.props.year}-${this.props.month}-1`).getDay(); // 当月1号是星期几
        for (let i = 0;i < 6;i++) {   // 6行
            this.props.dateList[i] = [];
            debugger;
            for (let j = 0;j < 7;j++) {  // 7列
                // tslint:disable-next-line:binary-expression-operand-order
                const num = 7 * i + j - index;
                const tt = parseDate(`${this.props.year}-${this.props.month}-1`,num).split('-'); // 2019-01-01
                this.props.dateList[i].push(tt);
            }
        }
        this.paint();
    }
    
    public changeDate(e: any,i:number,j:number) {
        this.props.curDate = this.props.dateList[i][j];
        this.paint();
        notify(e.node,'ev-dateSelect-change',{ value:this.props.curDate.join('-') });
    }

    public changeMonth(e:any,fg:number) {
        if (fg) {
            this.props.month++;
            if (this.props.month > 12) {
                this.props.month = 1;
                this.props.year++;
            }
        } else {
            this.props.month--;
            if (this.props.month === 0) {
                this.props.month = 12;
                this.props.year--;
            }
        }
        this.props.curDate[0] = this.props.year;
        this.props.curDate[1] = this.props.month;
        this.init();
        notify(e.node,'ev-dateSelect-change',{ value:this.props.curDate.join('-') });
    }

    public changeYear(e:any,fg:number) {
        if (fg) {
            this.props.year++;
        } else {
            this.props.year--;
        }
        this.props.curDate[0] = this.props.year;
        this.init();
        notify(e.node,'ev-dateSelect-change',{ value:this.props.curDate.join('-') });
    }
}

// ================================================ 本地
