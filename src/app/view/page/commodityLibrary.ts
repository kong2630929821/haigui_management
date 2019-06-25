// tslint:disable-next-line:missing-jsdoc
import { Widget } from '../../../pi/widget/widget';

interface Props {
    timeType:any;// 状态筛选
    timeTypeActiveIndex:number;// 状态筛选当前下标
    expandIndex:number; 
    productTypes:any;// 商品分类
    ProductTypesActiveIndex:number;// 商品分类下标
    addedTime:any;// 上架时间
    addedTimeActiveIndex:number;// 上架时间下标
    shopNum:number;// 商品個數
    currentIndex:number;// 当前分页下标
    perPage:number;// 每页多少条数据
    showDateTitle:any;// 标题
    showDataList:any;// 数据
}
// 状态筛选
export enum StatuType {
    statuType_1= 0,// 全部
    statuType_2= 1
}
// 商品分类
export enum ProductTypes {
    productTypese_1= 0,
    productTypese_2= 1
}
// 商品分类
export enum AddedTime {
    addedTime_1= 0,
    addedTime_2= 1
}
// 每页多少数据
const perPage = [5,10,15];
// tslint:disable-next-line:completed-docs
export class CommodityLibrary extends Widget {
    public props:Props = {
        timeType:[],
        productTypes:[],
        addedTime:[],
        timeTypeActiveIndex:0,
        ProductTypesActiveIndex:0,
        addedTimeActiveIndex:0,
        expandIndex:-1,
        shopNum:123,
        currentIndex:0,
        perPage:perPage[0],
        showDateTitle:['商品ID','商品名称','规格','价格（普通价/会员价）','库存','供应商','商品类型','是否折扣','上架时间','状态','操作'],
        // ['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品']
        showDataList:[
            { id:'00001',name:'2018款怀集系列见覅拉尔金属怀旧连衣裙',typeName:'女士-外套',img:'',type:[[0],[1],[2]],discount:'9.5折',time:'2018-12-24 12:20:20',status:'已上架' },
            { id:'00001',name:'2018款怀集系列见覅拉尔金属怀旧连衣裙',typeName:'女士-外套',img:'',type:[[0],[1],[2]],discount:'9.5折',time:'2018-12-24 12:20:20',status:'已上架' },
            { id:'00001',name:'2018款怀集系列见覅拉尔金属怀旧连衣裙',typeName:'女士-外套',img:'',type:[[0],[1],[2]],discount:'9.5折',time:'2018-12-24 12:20:20',status:'已上架' },
            { id:'00001',name:'2018款怀集系列见覅拉尔金属怀旧连衣裙',typeName:'女士-外套',img:'',type:[[0],[1],[2]],discount:'9.5折',time:'2018-12-24 12:20:20',status:'已上架' }
        ]
    };

    public create() {
        super.create();
        // 状态筛选
        const timeType = [
            {
                status:StatuType.statuType_1,
                text:'全部'
            },{
                status:StatuType.statuType_2,
                text:'其他'
            }
        ];
        // 商品分类
        const productTypes = [
            {
                status:ProductTypes.productTypese_1,
                text:'商品'
            },{
                status:ProductTypes.productTypese_2,
                text:'其他'
            }
        ];
        // 上架时间
        const addedTime = [
            {
                status:AddedTime.addedTime_1,
                text:'所有'
            },{
                status:AddedTime.addedTime_2,
                text:'其他'
            }
        ];
        this.props.timeType = timeType;
        this.props.productTypes = productTypes;
        this.props.addedTime = addedTime;
    }

    // 根据时间筛选
    public filterTimeType(e:any) {
        this.props.timeTypeActiveIndex = e.activeIndex;
    }
    // 根据时间筛选
    public filterProductTypes(e:any) {
        this.props.ProductTypesActiveIndex = e.activeIndex;
    }
    // 根据时间筛选
    public filterAddedTime(e:any) {
        this.props.addedTimeActiveIndex = e.activeIndex;
    }
    // 每页展示多少数据
    public perPage(e:any) {
        this.props.perPage = perPage[e.value];
        this.paint();
    }
}