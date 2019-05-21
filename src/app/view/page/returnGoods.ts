import { Widget } from '../../../pi/widget/widget';
import { getReturnGoods } from '../../net/pull';

/**
 * 商品信息
 */
export class GoodsInfo extends Widget {
    public props:any = {
        showDataList:[
           
        ],
        shopList:[],// 存所有的商品
        showTitleList:['售后单id','商品ID','商品SKU','用户ID','下单时单价','下单时数量','支付类型','状态','退货原因','申请退货的时间','回应退货申请的时间','完成退货的时间','用户姓名','用户电话','用户微信名','下单时间','支付时间','发货时间',' 收货时间','发货单号'],
        showDetail:false,
        page:1,// 上一个操作是第几页
        currentIndex:0,// 当前页数
        searchValue:'',// 输入的搜索值
        returnStatus:0, // 当前退货状态 0退货申请 1退货中 2退货完成
        startTime:'',  // 查询开始时间
        endTime:'', // 查询结束时间
        showDateBox:[false,false]
    };
    public checkType(index:number) {
        this.props.returnStatus = index;
        this.paint();
    }
    public create() {
        super.create();
        this.init();
    }
    public init() {
        this.props.showDataList = getReturnGoods(1,1,1,1,1);
        this.paint();
    }
    public inputChange(e:any) {
        this.props.searchValue = e.value;
    }
    // 搜索指定ID
    public search() {
        console.log(this.props.searchValue,this.props.startTime,this.props.endTime);
        if (!this.props.searchValue) {
            return ;
        }
    }
        // 更新起止时间
    public changeTime(e:any) {
        this.props.startTime = e.value[0]; 
        this.props.endTime = e.value[1];
    }
    
    // 是否展开时间选择框
    public changeDateBox(e:any,fg:number) {
        console.log(e.value,fg);
        this.props.showDateBox = this.props.showDateBox.map(() => false);
        this.props.showDateBox[fg] = e.value;
        this.paint();
    }
    public close() {
        console.log(111111111111);
        this.props.showDateBox = this.props.showDateBox.map(() => false);
        console.log(this.props.showDateBox);
        this.paint();
    }
    public goDetail(e:any) {
        console.log('这行数据',e);
    }
    public detailBack() {
        this.props.showDetail = false;
        this.paint();
    }
}