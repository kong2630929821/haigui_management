// tslint:disable-next-line:missing-jsdoc
import { Widget } from '../../../pi/widget/widget';
import { getAllProduct } from '../../net/pull';
import { timeConvert, transitTimeStamp } from '../../utils/logic';

interface Props {
    timeType:any;// 状态筛选
    timeTypeActiveIndex:number;// 状态筛选当前下标
    expandIndex:number; 
    shopNum:number;// 商品個數
    currentIndex:number;// 当前分页下标
    perPage:number;// 每页多少条数据
    showTitleList:any;// 标题
    showDataList:any;// 数据
    showDateBox:boolean;// 时间选择
    startTime:string;
    endTime:string;
}
// 状态筛选
export enum StatuType {
    statuType_1= 0,// 已上架
    statuType_2= 1,// 已下架
    statuType_3= 2// 隐藏
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
export class CommodityLibrary extends Widget {
    public props:Props = {
        timeType:[],
        timeTypeActiveIndex:0,
        expandIndex:-1,
        shopNum:123,
        currentIndex:0,
        perPage:perPage[0],
        showTitleList:['产品ID','产品名称','SKU','成本','库存','供应商（ID）','品牌','产品类型','税费','原产地'],
        // ['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品']
        showDataList:[],
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
                text:'已上架'
            },{
                status:StatuType.statuType_2,
                text:'已下架'
            },{
                status:StatuType.statuType_3,
                text:'隐藏'
            }
        ];
        this.props.timeType = timeType;
        const oData = new Date();
        const time = oData.setHours(23, 59, 59, 999);
        this.props.endTime =  timeConvert(time);
        this.props.startTime = '2019-05-01 00:00:000';
        this.init();
    }
    public init() {
        const start_time = transitTimeStamp(this.props.startTime);
        const end_time = transitTimeStamp(this.props.endTime);
        getAllProduct(start_time,end_time).then(r => {
            console.log('getAllProduct',r);
        });
    }
    // 根据时间筛选
    public filterTimeType(e:any) {
        this.props.timeTypeActiveIndex = e.activeIndex;
    }
    // 每页展示多少数据
    public perPage(e:any) {
        this.props.perPage = perPage[e.value];
        this.paint();
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