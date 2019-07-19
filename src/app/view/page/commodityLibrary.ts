import { Widget } from '../../../pi/widget/widget';
import { perPage } from '../../components/pagination';
import { mallImagPre } from '../../config';
import { getAllGoods, getCurrentGood, getGoodsKey, shelf } from '../../net/pull';
import { popNewMessage, timeConvert, transitTimeStamp } from '../../utils/logic';
import { exportExcel } from '../../utils/tools';

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
    mallImagPre:string;// 图片路径
    inputValue:string;// 输入框
    currentData:any;// 当前操作的值
    goodsId:number[];   // 选择的商品ID
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
/**
 * 商品库
 */
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
        showDateTitle:['规格','SKU','价格（成本/普通价/会员价）','实际差价','库存','供应商（ID）','供应商SKU','供应商商品ID','保质期'],
        // ['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品']
        showDataList:[],
        showDateBox:false,
        startTime:'',  // 查询开始时间
        endTime:'', // 查询结束时间
        shopDetail:0,
        mallImagPre:mallImagPre,
        inputValue:'',
        currentData:[],
        goodsId:[]
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

    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        console.log(this.props);
    }

    // 输入框改变
    public inputChange(e:any) {
        this.props.inputValue = e.value;
    }
    // 商品上架下架筛选
    public filterTimeType(e:any) {
        this.props.statusTypeActiveIndex = e.activeIndex;
        this.changeType();
    }
    // 商品分类筛选
    public filterProductTypes(e:any) {
        this.props.ProductTypesActiveIndex = e.activeIndex;
    }
    // 每页展示多少数据
    public perPage(e:any) {
        this.props.perPage = e.value;
        if (this.props.inputValue) {
            this.search();
        } else {
            this.init(1);
        }
        
    }
    // 重置页面的展开状态
    public close() {
        this.props.expandIndex++;
        // 判断时间选择框是否展开过
        if (this.props.showDateBox) {
            console.log('时间筛选',this.props.startTime,this.props.endTime);
            this.init(1);
        }
        this.props.showDateBox = false;
        this.paint();
    }
         // 日期选择框显示
    public changeDateBox(e:any) {
        this.props.showDateBox = e.value;
        this.paint();
    }
    
        // 改变时间
    public changeDate(e:any) {
        this.props.startTime = e.value[0];
        this.props.endTime = e.value[1];
    }
    // 上架商品
    public onShelves() {
        this.props.shopDetail = 2;
        this.paint();
    }
    // 展示商品
    public showShop() {
        this.props.shopDetail = 0;
        this.init(1);
    }
    // 分页变化
    public pageChange(e:any) {
        this.props.currentIndex = e.value;
        console.log('当前页数据：',this.props.showDataList);
        const index = (e.value) * this.props.perPage;
        this.init(index === 0 ? 1 :index);
        this.paint();
    }
    // 获取数据列表
    public init(index:number) {
        const star_time = transitTimeStamp(this.props.startTime);
        const end_time = transitTimeStamp(this.props.endTime);
        const status = this.props.statusTypeActiveIndex === 0 ? 1 :0;// 0已下架 1已上架 -1已删除
        getGoodsKey(index).then(r1 => {
            console.log('111111111',r1);
            const data = JSON.parse(r1.value);
            this.props.shopNum = data[1];
            getAllGoods(index === 1 ? 0 :data[0],this.props.perPage,status,star_time,end_time).then(r => {
                const shop = r;
                this.props.showDataList = shop;
                this.paint();
            });
        });
    }
    // 搜索指定ID
    public search() {
        console.log(this.props.inputValue);
        if (!this.props.inputValue) {
            return ;
        }
        getCurrentGood(this.props.inputValue).then(r => {
            this.props.showDataList = r;
            this.props.shopNum = this.props.showDataList.length;
            this.paint();
        }).catch(e => {
            this.props.showDataList = [];
            this.props.shopNum = 0;
            this.paint();
        });
    }

    // 上下架商品 1上架 0下架
    public shelfGoods(e:any) {
        shelf(e.id, e.state).then(r => {
            if (r.result === 1) {
                popNewMessage('操作成功');
                this.init(1);
            } else {
                popNewMessage('操作失败');
            }
        });
    }

    // 编辑
    public change(index:number,e:any) {
        this.props.currentData = this.props.showDataList[index];
        this.props.shopDetail = 3;
        this.paint();
    }
    // 详情
    public lookInfo(index:number,e:any) {
        this.props.currentData = this.props.showDataList[index];
        this.props.shopDetail = 1;
        this.paint();
    }

    // 显示商品列表
    public lookCancel() {
        this.props.shopDetail = 0;
        this.paint();
    }

    // 导出全部数据
    public exportShop() {
        const star_time = transitTimeStamp(this.props.startTime);
        const end_time = transitTimeStamp(this.props.endTime);
        const status = this.props.statusTypeActiveIndex === 0 ? 1 :(this.props.statusTypeActiveIndex === 1 ? 0 :-1);// 0已下架 1已上架 -1已删除
        getGoodsKey(1).then(r1 => {
            console.log('111111111',r1);
            const data = JSON.parse(r1.value);
            this.props.shopNum = data[1];
            getAllGoods(data[0],500,status,star_time,end_time).then(r => {
                const jsonHead = this.props.showDateTitle;
                const aoa = [jsonHead];
                const jsonData = r;
                for (const v of jsonData) {
                    for (let i = 0;i < v.length;i++) {
                        if (v[i]) {
                            v[i] = v[i].toString();
                        }  
                    }
                    aoa.push(v);
                }
                console.log(aoa);
                exportExcel(aoa,`商品信息表.xlsx`);
        
                console.log('contentList ===',jsonData);
            });
        });
        
    }
    // 筛选上下架变化数据
    public changeType() {
        const star_time = transitTimeStamp(this.props.startTime);
        const end_time = transitTimeStamp(this.props.endTime);
        const status = this.props.statusTypeActiveIndex === 0 ? 1 :0;// 0已下架 1已上架 -1已删除
        getAllGoods(0,this.props.perPage,status,star_time,end_time).then(r => {
            this.props.showDataList = r;
            this.props.shopNum = r.length;
            this.paint();
        });
    }
}