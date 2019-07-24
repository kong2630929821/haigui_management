/**
 * 时间段选择
 */

// ================================================ 导入
import { notify } from '../../pi/widget/event';
import { getRealNode } from '../../pi/widget/painter';
import { Widget } from '../../pi/widget/widget';
import { compareDate, parseDate } from '../utils/logic';

// ================================================ 导出
interface Props {
    startDate:string; // 开始日期
    endDate:string; // 结束日期
    showDateBox:boolean;  // 展示时间选择框
    position:string; // 时间选择框显示位置
    needTime:boolean;// 是否显示秒
}

// tslint:disable-next-line:completed-docs
export class PeriodPicker extends Widget {
    public props:Props = {
        startDate:'',
        endDate:'',
        showDateBox:false, 
        position:'',
        needTime:true
    };
    
    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        if (this.props.needTime) {
            this.props.startDate = isDate(this.props.startDate) ? parseDate(props.startDate, 0, 1) :'';
            this.props.endDate = isDate(this.props.endDate) ? parseDate(props.endDate, 0, 1) :'';
        }
    }

    public changeDateBox(e:any) {
        this.props.showDateBox = !this.props.showDateBox;
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

    // 输入开始日期
    public changeStartDate(e:any) {
        if (isDate(e.value)) {
            this.props.startDate = this.props.needTime ? parseDate(e.value, 0, 1) :parseDate(e.value, 0, 1).split(' ')[0];
            if (compareDate(this.props.startDate, this.props.endDate)) { // 开始时间大于结束时间
                this.props.endDate = this.props.startDate;
            }

        } else {
            this.props.startDate = this.props.endDate;
        }
        this.paint();
        notify(e.node,'ev-period-change',{ value:[this.props.startDate,this.props.endDate] });
    }

    // 输入结束日期
    public changeEndDate(e:any) {
        if (isDate(e.value)) {
            this.props.endDate = this.props.needTime ? parseDate(e.value, 0, 1) :parseDate(e.value, 0, 1).split(' ')[0];
            if (compareDate(this.props.startDate, this.props.endDate)) {
                this.props.startDate = this.props.endDate; 
            }

        } else {
            this.props.endDate = this.props.startDate;
        }
        this.paint();
        notify(e.node,'ev-period-change',{ value:[this.props.startDate,this.props.endDate] });
    }
}

// ================================================ 本地
// 是否是时间字符串 '2019-1-1' || '2019/1/1' || '2019-1-1 0:0' || '2019-1-1 0:0:0'
export const isDate = (str:string) => {
    const reg = /^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})\s?(((\d{1,2}):){1,2}(\d{1,2}))?$/;

    return reg.test(str);
};