// tslint:disable-next-line:missing-jsdoc
import { deepCopy } from '../../../pi/util/util';
import { Widget } from '../../../pi/widget/widget';
import { getAllProduct, searchProduct } from '../../net/pull';
import { getStore, setStore } from '../../store/memstore';
import { timeConvert, transitTimeStamp } from '../../utils/logic';
import { exportExcel } from '../../utils/tools';

interface Props {
    timeType:any;// 状态筛选
    timeTypeActiveIndex:number;// 状态筛选当前下标
    expandIndex:number; 
    shopNum:number;// 商品個數
    perPage:number;// 每页多少条数据
    showTitleList:any;// 标题
    showDataList:any;// 数据
    showDateBox:boolean;// 时间选择
    startTime:string;// 开始时间
    endTime:string;// 结束时间
    dataList:any;// 原始数据
    btn1:string;// 按钮1
    btn2:string;// 按钮2
    inputValue:string;// 搜索框
    showAddProduct:number;
    currentData:any;
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
const perPage = [20,50,100];
/**
 * 产品库
 */
// tslint:disable-next-line:completed-docs
export class ProductLibrary extends Widget {
    public props:Props = {
        timeType:[],
        timeTypeActiveIndex:0,
        expandIndex:-1,
        shopNum:123,
        perPage:perPage[0],
        showTitleList:['供应商id','SKU','sku名','已下单未支付数量','总销量','库存','供货价','保质期','修改时间','供应商sku','供应商商品ID','收货地址','收件人','联系电话'],
        // ['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品'],['超闪亮钛合金版本','300000/200000','300/200','西米急急风米西亚','保税商品']
        showDataList:[],
        showDateBox:false,
        startTime:'',  // 查询开始时间
        endTime:'', // 查询结束时间
        dataList:[],
        btn1:'编辑',
        btn2:'详情',
        inputValue:'',
        showAddProduct:0,
        currentData:[]
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
        const skuTotal = getStore('skuTotal',{});
        if (skuTotal.skuNum) {
            this.props.shopNum = skuTotal.skuNum;
            this.props.dataList = skuTotal.skuData;
            this.props.showDataList = this.props.dataList.slice(0,this.props.perPage);
        } else {
            this.init();
        }
        
    }
    public init() {
        const start_time = transitTimeStamp(this.props.startTime);
        const end_time = transitTimeStamp(this.props.endTime);
        getAllProduct(start_time,end_time).then(r => {
            console.log('getAllProduct',r);
            this.props.shopNum = r[0];
            this.props.dataList = r[1];
            this.props.showDataList = this.props.dataList.slice(0,this.props.perPage);
            setStore('skuTotal', r[1]);
            this.paint();
        });
    }
    // 根据时间筛选
    public filterTimeType(e:any) {
        this.props.timeTypeActiveIndex = e.activeIndex;
    }
    // 每页展示多少数据
    public perPage(e:any) {
        this.props.perPage = perPage[e.value];
        if (this.props.inputValue) {
            this.search();
        } else {
            this.init();
        }
        
    }
    // 重置页面的展开状态
    public close() {
        this.props.expandIndex++;
        // 判断时间选择框是否展开过
        if (this.props.showDateBox) {
            console.log('时间筛选',this.props.startTime,this.props.endTime);
            this.init();
        }
        this.props.showDateBox = false;
        this.paint();
    }
    // 输入框改变
    public inputChange(e:any) {
        this.props.inputValue = e.value;
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
    // 分页变化
    public pageChange(e:any) {
        console.log(e.value);
        this.props.showDataList = this.props.dataList.slice(e.value * this.props.perPage,(e.value + 1) * this.props.perPage);
        console.log('当前页数据：',this.props.showDataList);
        this.paint();
    }
    // 导出全部数据
    public exportShop() {
        const oData = new Date();
        const end_time = oData.setHours(23, 59, 59, 999);
        const start_time = 0;
        getAllProduct(start_time,end_time).then(r => {
            console.log('getAllProduct',r);
            const jsonHead = this.props.showTitleList;
            const aoa = [jsonHead];
            const jsonData = r[1];
            for (const v of jsonData) {
                for (let i = 0;i < v.length;i++) {
                    v[i] = v[i].toString();
                }
                aoa.push(v);
            }
            console.log(aoa);
            exportExcel(aoa,`产品信息表.xlsx`);
        
            console.log('contentList ===',jsonData);
        });
    }
    // 搜索
    public search() {
        console.log(this.props.inputValue);
        searchProduct(this.props.inputValue).then(r => {
            this.props.dataList = r;
            this.props.shopNum = this.props.dataList.length;
            this.props.showDataList = this.props.dataList.slice(0,this.props.perPage);
            this.paint();
        });
    }
    // 添加产品
    public addProduct() {
        this.props.showAddProduct = 1;
        this.paint();
    }
    // 显示产品库页面
    public showProduct() {
        this.props.showAddProduct = 0;
        this.paint();
    }
    // 表格点击按钮
    public goDetail(e:any) {
        console.log(e);
        this.props.currentData = deepCopy(e.value);
        if (e.fg === 1) {
            // 编辑
            this.props.showAddProduct = 2;
        } else {
            // 查看
            this.props.showAddProduct = 3;
        }
        this.paint();
    }
    // 添加产品成功
    public saveProduct() {
        this.props.showAddProduct = 0;
        this.init();
    }
}