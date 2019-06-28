// tslint:disable-next-line:missing-jsdoc
import { Widget } from '../../../pi/widget/widget';
interface Props {
    timeType:any;// 状态筛选
    timeTypeActiveIndex:number;// 状态筛选当前下标
    expandIndex:number; 
}
// 状态筛选
export enum StatuType {
    statuType_1= 0,// 分类1
    statuType_2= 1// 分类2
}
// tslint:disable-next-line:completed-docs
export class OnShelves extends Widget{
    public props:Props = {
        timeType:[],
        timeTypeActiveIndex:0,
        expandIndex:-1
    };
    public create() {
        super.create();
        // 状态筛选
        const timeType = [
            {
                status:StatuType.statuType_1,
                text:'分类1'
            },{
                status:StatuType.statuType_2,
                text:'分类2'
            }
        ];
        this.props.timeType = timeType;
    }
}