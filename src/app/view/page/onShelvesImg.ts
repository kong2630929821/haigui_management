// tslint:disable-next-line:missing-jsdoc
import { Widget } from '../../../pi/widget/widget';
interface Props {
    timeType:any;// 状态筛选
    timeTypeActiveIndex:number;// 状态筛选当前下标
    expandIndex:number; 
}

// tslint:disable-next-line:completed-docs
export class OnShelvesImg extends Widget {
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
                status:0,
                text:'分类1'
            },{
                status:1,
                text:'分类2'
            }
        ];
        this.props.timeType = timeType;
    }
}