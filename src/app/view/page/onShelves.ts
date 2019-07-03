// tslint:disable-next-line:missing-jsdoc
import { notify } from '../../../pi/widget/event';
import { Widget } from '../../../pi/widget/widget';
import { getSearchProduct, searchProduct } from '../../net/pull';
interface Props {
    searchValue:string;
    onShelvesType:number;
    searchData:any;// 搜索到的产品
    selectData:any;// 选中的产品
    showDataTitle:any;

}
// tslint:disable-next-line:completed-docs
export class OnShelves extends Widget {
    public props:Props = {
        searchValue:'',
        onShelvesType:0 ,
        searchData:[],
        selectData:[],
        showDataTitle : ['供应商id','SKU','产品名','已下单未支付数量','总销量','库存','供货价','保质期','修改时间']
    };
    // 搜索框内容
    public inputChange(e:any) {
        this.props.searchValue = e.value;
    }

    // 搜索产品
    public searchProduct() {
        searchProduct(this.props.searchValue).then(r => {
            this.props.searchData = r;
            debugger;
            this.paint();
        });
    }
    // 去商品库
    public gotoShop(e:any) {
        notify(e.node,'ev-change-showShop',null);
    }
}