// tslint:disable-next-line:missing-jsdoc
import { Widget } from '../../../pi/widget/widget';
import { timeConvert } from '../../utils/logic';
interface Props {
    showDateBox:boolean;// 时间选择
    startTime:string;
    endTime:string;
}
// tslint:disable-next-line:completed-docs
export class ShopDetails extends Widget {
    public props:Props = {
        showDateBox:false,
        startTime:'',  // 查询开始时间
        endTime:'' // 查询结束时间
    };
    public create() {
        super.create();
        const oData = new Date();
        const time = oData.setHours(23, 59, 59, 999);
        this.props.endTime =  timeConvert(time);
        this.props.startTime = '2019-05-01 00:00:000';
    }
        // 重置页面的展开状态
    public close() {
        this.props.showDateBox = false;
        this.paint();
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
}