import { Widget } from '../../../pi/widget/widget';
import { getAllGoods, getOrder } from '../../net/pull';

/**
 * 商品信息
 */
export class GoodsInfo extends Widget {
    public props:any = {
        showDataList:[
            ['1256400023','六角眉笔刷头','CK-255df45451','177/88B','15234525','10','1500','199/100/110/399/233'],
            ['1256400023','六角眉笔刷头','CK-255df45451','177/88B','15234525','10','1500','199/100/110/399/233'],
            ['1256400023','六角眉笔刷头','CK-255df45451','177/88B','15234525','10','1500','199/100/110/399/233'],
            ['1256400023','六角眉笔刷头','CK-255df45451','177/88B','15234525','10','1500','199/100/110/399/233'],
            ['1256400023','六角眉笔刷头','CK-255df45451','177/88B','15234525','10','1500','199/100/110/399/233']
        ],
        showTitleList:['商品ID','商品名称','商品SKU','商品规格','供货商ID','销售数量','库存','会员价/成本价/供货价/市场价/折扣价'],
        showDetail:false
    };

    public search() {
        getAllGoods();
    }

    public goDetail() {
        console.log('132');
        getOrder(1011002,1);
        getOrder(1011002,2);
        getOrder(1011002,3);
        getOrder(1011002,4);
        
    }

    public detailBack() {
        this.props.showDetail = false;
        this.paint();
    }
}