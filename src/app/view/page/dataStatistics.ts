import { Widget } from '../../../pi/widget/widget';
import { getAllShopSaleInfo, getShopSaleTop, getVipTurnover } from '../../net/pull';
import { dateToString, parseDate, priceFormat, transitTimeStamp } from '../../utils/logic';

// tslint:disable-next-line:missing-jsdoc
interface Props {
    showDataList:any;// 邀请排名
    showTitleList:any;// 表格标题
    statisticsList:any;// 统计会员列表标题
    shareDataList:any;// 分享排名
    vipCount:any;// 会员统计新增
    activeTab:number;// tab切换
    userInfo:boolean;// 展示用户详情页面
    uid:number;// 用户ID
    shopTitle:any[];// 商品统计标题
    showDateBox:boolean;// 时间框是否展示
    startTime:string;// 开始时间
    endTime:string;// 结束时间
    shopList:any[];// 商品排行
    shopTitleInfo:any;// 商品销售明细
}

const title = [
    ['排名','用户ID','名字','邀请总数'],
    ['排名','商品ID','商品名','销售量']
];
/**
 * 数据统计
 */
export class DataStatistics extends Widget {
    public props:Props = {
        showDataList:[],
        showTitleList:title[0],
        statisticsList:['海王总数','海宝总数','白客总数','市代理总数','省代理总数'],
        shareDataList:[],
        vipCount:[
            [277, 3169, 17577, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        activeTab:0,
        userInfo:true,
        uid:0,
        shopTitle:['昨日分享礼包','昨日每周会员礼包领取','商品总数','分类总数','销售总订单数','销售总金额'],
        showDateBox:false,
        startTime:'',
        endTime:'',
        shopList:[],
        shopTitleInfo:[
            [['A',1,1],['A',1,1]], // 试用面膜昨日销量 试用面膜前日销量, 线下课程昨日销量 线下课程前日销量
            [['',1,1]],// 周领礼包昨日销量 周领礼包前日销量
            [['A',1,0],['A',1,0]],// 上架商品数量 ,下架商品数量
            [['A',1,0],['A',1,0]],// 一级分组数量  二级分组数量
            [['',1,0]],// 订单数量
            [['',1,0]]// 订单总金额
        ]
    };

    public create() {
        super.create();
        this.props.endTime = dateToString(Date.now(),1);
        this.props.startTime = parseDate(this.props.endTime,-7,1);
        this.init();
    }

    public init() {
        // 获取邀请 分享排名
        getVipTurnover().then(r => {
            if (r.length) {
                this.props.showDataList = r[0];// 会员排名
                this.props.shareDataList = r[1];// 邀请排名
                this.props.vipCount = r[2];// 会员对比昨天
                console.log(r[2]);
                this.paint();
            }
        });
        // 获取商品流水明细
        getAllShopSaleInfo().then(r => {
            this.props.shopTitleInfo = r;
            this.paint();
        });
        // 获取商品销售排名
        this.getShopTop10();
    }

    // 获取商品排名
    public getShopTop10() {
        const start = transitTimeStamp(this.props.startTime);
        const end = transitTimeStamp(this.props.endTime);
        // 获取商品销售排名
        getShopSaleTop(10,start,end).then(r => {
            this.props.shopList = r;
            this.paint();
        });
    }
    // tab切换
    public changeTab(index:number) {
        this.props.activeTab = index;
        this.props.showTitleList = title[index];
        this.paint();
    }

    // 查看详情
    public goDetail(e:any) {
        this.props.uid = e.value[1];
        this.props.userInfo = false;
        this.paint();
    }

    // 退出详情
    public getDatas() {
        this.props.userInfo = true;
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
        // 重置页面的展开状态
    public close() {
            // 判断时间选择框是否展开过
        if (this.props.showDateBox) {
            console.log('时间筛选',this.props.startTime,this.props.endTime);
            this.getShopTop10();
        }
        this.props.showDateBox = false;
        this.paint();
    }
}