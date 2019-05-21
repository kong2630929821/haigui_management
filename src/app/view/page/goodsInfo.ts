import { Widget } from '../../../pi/widget/widget';
import { getAllGoods, getCurrentGood, getGoodsKey } from '../../net/pull';
import { exportExcel } from '../../utils/tools';

/**
 * 商品信息
 */
export class GoodsInfo extends Widget {
    public props:any = {
        showDataList:[

        ],
        shopNum:0,
        showTitleList:['商品ID','商品名','商品SKU','商品规格','供货商ID','供应商名称','已下单未支付数量','已下单已支付数量','库存数量','供货价','成本价','原价','会员价','折后价','是否保税','税费'],
        showDetail:false,
        currentIndex:0,// 当前页数
        searchValue:''// 输入的搜索值
    };
    public create() {
        super.create();
        this.init(1);
    }
    public init(index:number) {
        getGoodsKey(index).then(r1 => {
            console.log('111111111',r1);
            const data = JSON.parse(r1.value);
            this.props.shopNum = data[1];
            getAllGoods(index === 1 ? 0 :data[0],3).then(r => {
                const shop = JSON.parse(r.value);
                this.props.showDataList = shop;
                this.paint();
            });
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
        }).catch(e => {
            this.props.showDataList = [];
            this.paint();
        });
    }
    // 分页
    public pageChange(e:any) {
        const index = (e.value) * 3;
        this.init(index === 0 ? 1 :index);
    }
    // 导出商品
    public async exportShop() {
        let shop;
        await getAllGoods(0,3).then(r => {
            shop = JSON.parse(r.value);
        });
        const jsonHead = this.props.showTitleList;
        const aoa = [jsonHead];
        const jsonData = shop;
        for (const v of jsonData) {
            v[0] = v[0].toString();
            aoa.push(v);
        }
        console.log(aoa);
        exportExcel(aoa,`商品信息表.xlsx`);
        
        console.log('contentList ===',jsonData);
    }
    public detailBack() {
        this.props.showDetail = false;
        this.paint();
    }
}