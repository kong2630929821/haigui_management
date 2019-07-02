// tslint:disable-next-line:missing-jsdoc
import { Widget } from '../../../pi/widget/widget';
import { getAllGoods, getGoodsKey, getGroup } from '../../net/pull';
import { timeConvert } from '../../utils/logic';

interface Props {
    statusType:any;// 状态筛选
    statusTypeActiveIndex:number;// 状态筛选当前下标
    expandIndex:number; 
    productTypes:any;// 商品分类
    ProductTypesActiveIndex:number;// 商品分类下标
    shopNum:number;// 商品個數
    currentIndex:number;// 当前分页下标
    perPage:number;// 每页多少条数据
    showDateTitle:any;// 标题
    showDataList:any;// 数据
    showDateBox:boolean;// 时间选择
    startTime:string;
    endTime:string;
    shopDetail:number;  // 0 商品 1商品详情 2上架商品
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
        statusType:[],
        productTypes:[],
        statusTypeActiveIndex:0,
        ProductTypesActiveIndex:0,
        expandIndex:-1,
        shopNum:123,
        currentIndex:0,
        perPage:perPage[0],
        showDateTitle:['商品ID','商品名称','规格','价格（普通价/会员价）','库存','供应商（ID）','供应商SKU','供应商商品ID','保质期','操作'],
        // ['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品']
        showDataList:[
            { id:'00001',name:'2018款怀集系列见覅拉尔金属怀旧连衣裙',shopType:'报税商品',brand:'哈哈',typeName:'女士-外套',taxes:'12',img:'',type:[['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品','111','222'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品']],discount:'9.5折',time:'2018-12-24 12:20:20',status:'已上架' },
            { id:'00001',name:'2018款怀集系列见覅拉尔金属怀旧连衣裙',shopType:'报税商品',brand:'哈哈',typeName:'女士-外套',taxes:'12',img:'',type:[['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品','111','222'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品']],discount:'9.5折',time:'2018-12-24 12:20:20',status:'已上架' },
            { id:'00001',name:'2018款怀集系列见覅拉尔金属怀旧连衣裙',shopType:'报税商品',brand:'哈哈',typeName:'女士-外套',taxes:'12',img:'',type:[['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品','111','222'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品']],discount:'9.5折',time:'2018-12-24 12:20:20',status:'已上架' },
            { id:'00001',name:'2018款怀集系列见覅拉尔金属怀旧连衣裙',shopType:'报税商品',brand:'哈哈',typeName:'女士-外套',taxes:'12',img:'',type:[['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品','111','222'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品']],discount:'9.5折',time:'2018-12-24 12:20:20',status:'已上架' }
        ],
        showDateBox:false,
        startTime:'',  // 查询开始时间
        endTime:'', // 查询结束时间
        shopDetail:0
    };

    public create() {
        super.create();
        // 状态筛选
        const timeType = [
            {
                status:0,
                text:'已上架'
            },{
                status:1,
                text:'已下架'
            },{
                status:2,
                text:'隐藏'
            }
        ];
        // 商品分类
        const productTypes = [
            {
                status:0,
                text:'保税商品'
            },{
                status:1,
                text:'一般贸易'
            },{
                status:2,
                text:'海外直购'
            }
        ];
        this.props.statusType = timeType;
        this.props.productTypes = productTypes;
        const oData = new Date();
        const time = oData.setHours(23, 59, 59, 999);
        this.props.endTime =  timeConvert(time);
        this.props.startTime = '2019-05-01 00:00:000';
        this.init(1);
    }

    // 商品上架下架筛选
    public filterTimeType(e:any) {
        this.props.statusTypeActiveIndex = e.activeIndex;
    }
    // 商品分类筛选
    public filterProductTypes(e:any) {
        this.props.ProductTypesActiveIndex = e.activeIndex;
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
    // 展示商品详情
    public showShopDetail() {
        this.props.shopDetail = 1;
        this.paint();
    }
    // 上架商品
    public onShelves() {
        this.props.shopDetail = 2;
        this.paint();
    }
    // 展示商品
    public showShop() {
        this.props.shopDetail = 0;
        this.paint();
    }
    public init(index:number) {
        getGoodsKey(index).then(r1 => {
            console.log('111111111',r1);
            const data = JSON.parse(r1.value);
            this.props.shopNum = data[1];
            getAllGoods(index === 1 ? 0 :data[0],12).then(r => {
             
                const shop = r;
                this.props.showDataList = shop;
                console.log('11111111111111111111',shop);
                this.paint();
            });
        });
    }
}