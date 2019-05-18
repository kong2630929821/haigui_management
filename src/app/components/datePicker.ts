/**
 * 时间选择器
 */

// ================================================ 导入
import { notify } from '../../pi/widget/event';
import { getRealNode } from '../../pi/widget/painter';
import { Widget } from '../../pi/widget/widget';
import { dateToString, parseDate } from '../utils/logic';

// ================================================ 导出
interface Props {
    showDate:string; // 日期
    showDateBox:boolean;  // 展示日期选择框
    position:string; // 时间选择框显示位置
    showTimeBox:boolean; // 展示时间选择框
    hourList:string[];  // 时列表
    minuteList:string[];  // 分列表
    hour:string;
    minute:string;
}

// tslint:disable-next-line:completed-docs
export class PeriodPicker extends Widget {
    public props:Props = {
        showDate:'',
        showDateBox:false, 
        position:'',
        showTimeBox:false,
        hourList:[],
        minuteList:[],
        hour:'',
        minute:''
    };
    
    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(props);
        this.props.showDate = this.props.showDate || dateToString(Date.now(),2);
        this.props.hourList = [];
        this.props.minuteList = [];

        const data = this.props.showDate.split(/:|\s/);
        this.props.hour = data[1]; 
        this.props.minute = data[2]; 
        for (let i = 0;i < 60;i++) {
            const str = i < 10 ? `0${i}` : i.toString();
            if (i < 24) {
                this.props.hourList.push(str);
            }
            this.props.minuteList.push(str);
        }
    }

    // 显示隐藏日期选择框
    public changeDateBox(e:any) {
        this.props.showDateBox = !this.props.showDateBox;
        this.props.showTimeBox = false;
        const item = getRealNode(e.node).getBoundingClientRect();
        let style = '';
        if (window.innerHeight - item.bottom < 300) {
            style = 'bottom:0;';
        }
        if (window.innerWidth - item.right < 300) {
            style += 'right:0'; 
        }
        this.props.position = style;
        this.paint();
        notify(e.node,'ev-dateBox-change',{ value:this.props.showDateBox });
    }

    // 显示隐藏时间选择框
    public changeTimeBox() {
        this.props.showTimeBox = !this.props.showTimeBox; 
        this.paint();
    }

    // 修改日期
    public changeShowDate(e:any) {
        if (isDate(e.value)) {
            this.props.showDate = parseDate(e.value, 0, 2);
        } 
        notify(e.node,'ev-datePicker-change',{ value:this.props.showDate });
    }

    // 修改小时
    public changeHour(e:any,num:number) {
        this.props.hour = this.props.hourList[num];
        this.updateShowDate(e);
    }

    // 修改分钟
    public changeMinute(e:any,num:number) {
        this.props.minute = this.props.minuteList[num];
        this.updateShowDate(e);
    }

    // 更新显示的时间
    public updateShowDate(e:any) {
        const data = this.props.showDate.split(/:|\s/);
        data[1] = this.props.hour;
        data[2] = this.props.minute;
        this.props.showDate = `${data[0]} ${data[1]}:${data[2]}`;
        notify(e.node,'ev-datePicker-change',{ value:this.props.showDate });
        this.paint();
    }
}

// ================================================ 本地
// 是否是时间字符串 '2019-1-1'
export const isDate = (str:string) => {
    const reg = /^(\d{4})-(\d{1,2})-(\d{1,2})(\s(\d{1,2}):(\d{1,2})){0,1}$/;

    return reg.test(str);
};