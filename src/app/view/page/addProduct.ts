// tslint:disable-next-line:missing-jsdoc
import { Widget } from '../../../pi/widget/widget';
import { timeConvert } from '../../utils/logic';

interface Props {
    timeType:any;// 状态筛选
    timeTypeActiveIndex:number;// 状态筛选当前下标
    expandIndex:number; 
    productTypes:any;// 商品分类
    ProductTypesActiveIndex:number;// 商品分类下标
    showDateBox:boolean;// 时间选择
    startTime:string;
    endTime:string;
}
// 状态筛选
export enum StatuType {
    statuType_1= 0,// 是 保质期
    statuType_2= 1// 否 保质期
}
// 商品分类
export enum ProductTypes {
    productTypese_1= 0,// 报税
    productTypese_2= 1,// 一般贸易
    productTypese_3= 2// 海外直购
}
// 每页多少数据
const perPage = [5,10,15];
// tslint:disable-next-line:completed-docs
export class AddProduct extends Widget {
    public props:Props = {
        timeType:[],
        productTypes:[],
        timeTypeActiveIndex:0,
        ProductTypesActiveIndex:0,
        expandIndex:-1,
        showDateBox:false,
        startTime:'',  // 查询开始时间
        endTime:'' // 查询结束时间
    };

    public create() {
        super.create();
        // 状态筛选
        const timeType = [
            {
                status:StatuType.statuType_1,
                text:'是'
            },{
                status:StatuType.statuType_2,
                text:'否'
            }
        ];
        // 商品分类
        const productTypes = [
            {
                status:ProductTypes.productTypese_1,
                text:'保税商品'
            },{
                status:ProductTypes.productTypese_2,
                text:'一般贸易'
            },{
                status:ProductTypes.productTypese_3,
                text:'海外直购'
            }
        ];
        this.props.timeType = timeType;
        this.props.productTypes = productTypes;
        const oData = new Date();
        const time = oData.setHours(23, 59, 59, 999);
        this.props.endTime =  timeConvert(time);
        this.props.startTime = '2019-05-01 00:00:000';
    }

    // 根据时间筛选
    public filterTimeType(e:any) {
        this.props.timeTypeActiveIndex = e.activeIndex;
    }
    // 根据时间筛选
    public filterProductTypes(e:any) {
        this.props.ProductTypesActiveIndex = e.activeIndex;
    }
    // 重置页面的展开状态
    public close() {
        this.props.expandIndex++;
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