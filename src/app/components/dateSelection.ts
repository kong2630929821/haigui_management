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
    curTime:number[];  // 当前时 分 秒
    showDate:string; // 默认显示的日期
    needTime:boolean; // 需要显示时分秒
    curIndex:any;// 当前天数的下标
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
        curTime:[0,0,0],
        showDate:'', 
        needTime:false,
        curIndex:{
            i:0,
            j:0
        }
    };

    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        let now = new Date();
        if (this.props.showDate) {
            now = new Date(this.props.showDate);
        }
        this.props.month = now.getMonth() + 1;
        this.props.year = now.getFullYear();
        this.props.curDate = [this.props.year,this.props.month,now.getDate()];
        this.props.curTime = [now.getHours(),now.getMinutes(),now.getSeconds()];
        this.init();
    }

    public init() {
        const index = new Date(`${this.props.year}-${this.props.month}-1`).getDay(); // 当月1号是星期几
        for (let i = 0;i < 6;i++) {   // 6行
            this.props.dateList[i] = [];
            for (let j = 0;j < 7;j++) {  // 7列
                // tslint:disable-next-line:binary-expression-operand-order
                const num = 7 * i + j - index;
                const tt = parseDate(`${this.props.year}-${this.props.month}-1`,num).split('-'); // 2019-01-01
                this.props.dateList[i].push(tt);
            }
        }
        for (let i = 0;i < 6;i++) {
            for (let j = 0;j < 7;j++) {
                const arr = this.props.dateList[i][j];
                if (parseInt(arr[1]) === this.props.curDate[1] && parseInt(arr[2]) === this.props.curDate[2]) {
                    this.props.curIndex.i = i;
                    this.props.curIndex.j = j;                    
                }
            }
        }
        this.paint();
    }
    
    public changeDate(e: any,i:number,j:number) {
        this.props.curDate = this.props.dateList[i][j];
        this.props.curIndex.i = i;
        this.props.curIndex.j = j;
        this.paint();
        this.notifyValue(e);
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
        this.notifyValue(e);
    }

    public changeYear(e:any,fg:number) {
        if (fg) {
            this.props.year++;
        } else {
            this.props.year--;
        }
        this.props.curDate[0] = this.props.year;
        this.init();
        this.notifyValue(e);
    }
    public changeHour(e:any,fg:number) {
        if (fg) {
            const hour = ++this.props.curTime[0];
            if (hour >= 24) {
                this.props.curTime[0] = 0;
                // 如果大于24小时则当前天数添加一天
                const j = this.props.curIndex.j + 1;
                if (j > 6) {
                    this.changeDate(e,this.props.curIndex.i + 1,0);
                } else {
                    this.changeDate(e,this.props.curIndex.i ,this.props.curIndex.j + 1);
                }
            } 
        } else {
            const hour = --this.props.curTime[0];
            if (hour < 0) {
                this.props.curTime[0] = 23;
                const j = this.props.curIndex.j - 1;
                if (j < 0) {
                    this.changeDate(e,this.props.curIndex.i - 1 ,6);
                } else {
                    this.changeDate(e,this.props.curIndex.i ,this.props.curIndex.j - 1);
                }
            }
        }
        this.paint();
        this.notifyValue(e);
    }

    public changeMinute(e:any,fg:number) {
        if (fg) {
            const minute = ++this.props.curTime[1];
            if (minute >= 60) {
                // 必须先更改分钟再去更改时钟，不然在时钟调用了this.notifyValue(e)就报错
                this.props.curTime[1] = 0;
                this.changeHour(e,1);
            } 
        } else {
            const minute = --this.props.curTime[1];
            if (minute < 0) {
                // 必须先更改分钟再去更改时钟，不然在时钟调用了this.notifyValue(e)就报错
                this.props.curTime[1] = 59;
                this.changeHour(e,0);  
            }
        }
        this.paint();
        this.notifyValue(e);
    }

    public changeSecond(e:any,fg:number) {
        if (fg) {
            const second = ++this.props.curTime[2];
            if (second >= 60) {
                // 必须先更改秒钟再去更改分钟，不然在时钟调用了this.notifyValue(e)就报错
                this.props.curTime[2] = 0;
                this.changeMinute(e,1);
                
            } 
        } else {
            const second = --this.props.curTime[2];
            if (second < 0) {
                // 必须先更改秒钟再去更改分钟，不然在时钟调用了this.notifyValue(e)就报错
                this.props.curTime[2] = 59;
                this.changeMinute(e,0); 
            }
        }
        this.paint();
        this.notifyValue(e);
    }

    // 向上级抛出事件
    public notifyValue(e:any) {
        let value = `${this.props.curDate.join('-')} ${this.props.curTime.join(':')}`; 
        if (!this.props.needTime) value = value.split(' ')[0];
        notify(e.node,'ev-dateSelect-change',{ value });
    }
}

// ================================================ 本地
