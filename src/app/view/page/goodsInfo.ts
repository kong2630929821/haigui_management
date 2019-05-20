import { Widget } from '../../../pi/widget/widget';
import { getAllGoods, getCurrentGood } from '../../net/pull';

/**
 * 商品信息
 */
export class GoodsInfo extends Widget {
    public props:any = {
        showDataList:[
            ['1256400023','六角眉笔刷头1','CK-255df45451','177/88B','15234525','10','1500','199/100/110/399/233'],
            ['1256400023','六角眉笔刷头','CK-255df45451','177/88B','15234525','10','1500','199/100/110/399/233'],
            ['1256400023','六角眉笔刷头','CK-255df45451','177/88B','15234525','10','1500','199/100/110/399/233'],
            ['1256400023','六角眉笔刷头','CK-255df45451','177/88B','15234525','10','1500','199/100/110/399/233'],
            ['1256400023','六角眉笔刷头','CK-255df45451','177/88B','15234525','10','1500','199/100/110/399/233']
        ],
        shopList:[],// 存所有的商品
        showTitleList:['商品ID','商品名称','商品SKU','商品规格','供货商ID','销售数量','库存','会员价/成本价/供货价/市场价/折扣价'],
        showDetail:false,
        page:1,// 上一个操作是第几页
        currentIndex:0,// 当前页数
        searchValue:''// 输入的搜索值
    };
    public create() {
        super.create();
        this.init(0,15);
    }
    public init(index:number,count:number) {
        getAllGoods(index,count).then(r => {
            const shop = JSON.parse(r.value);
            this.props.shopList = shop;
            this.props.showDataList = this.props.shopList.slice(0,3);
            this.paint();
        });
    }
    public inputChange(e:any) {
        this.props.searchValue = e.value;
    }
    // 搜索指定ID
    public search() {
        console.log(this.props.searchValue);
        if (!this.props.searchValue) {
            return ;
        }
        getCurrentGood(this.props.searchValue).then(r => {
            const shop = JSON.parse(r.value);
            this.props.showDataList = shop;
            this.paint();
        });
    }
    // 下一页
    public next(e:any) {
        console.log(e.value,this.props.page);
        const shopIndex = this.props.showDataList.length - 1;
        const shopId = this.props.showDataList[shopIndex][0];
        getAllGoods(shopId,3).then(r => {
            const shop = JSON.parse(r.value);
            if (e.value !== 2) {
                this.props.shopList.push(...shop);
            }
            this.props.showDataList = shop;
            console.log(this.props.shopList);
            this.paint();
        });

    }
    // 上一页
    public prep(e:any) {
        console.log(e.value);
        this.props.showDataList = this.props.shopList.slice((e.value - 1) * 3,e.value * 3);
        this.paint();
    }
   
    public detailBack() {
        this.props.showDetail = false;
        this.paint();
    }
}