// tslint:disable-next-line:missing-jsdoc
import { notify } from '../../../pi/widget/event';
import { Widget } from '../../../pi/widget/widget';
import { searchProduct } from '../../net/pull';
import { popNewMessage } from '../../utils/logic';
interface Props {
    searchValue:string;
    onShelvesType:number;
    searchData:any;// 搜索到的产品
    selectData:any;// 选中的产品
    showDataTitle:any;// 标题
    selectIndex:any;// 选中的数据下标
}
/**
 * 添加商品
 */
// tslint:disable-next-line:completed-docs
export class OnShelves extends Widget {
    public props:Props = {
        searchValue:'',
        onShelvesType:0 ,
        searchData:[],
        selectData:[],
        showDataTitle : ['供应商id','SKU','产品名','已下单未支付数量','总销量','库存','供货价','保质期','修改时间','供应商sku','供应商商品ID','收货地址','收件人','联系电话'],
        selectIndex:[]
    };
    // 搜索框内容
    public inputChange(e:any) {
        this.props.searchValue = e.value;
    }

    // 搜索产品
    public searchProduct() {
        searchProduct(this.props.searchValue).then(r => {
            this.props.searchData = r;
            console.log('搜索到的产品',r);
            this.paint();
        });
    }
    // 去商品库
    public gotoShop(e:any) {
        notify(e.node,'ev-change-showShop',null);
    }

    // 添加到选中的产品中
    public check(index:number) {
        let flag = false;
        this.props.selectData.forEach(v => {
            if (v[0] !== this.props.searchData[index][0]) {
                flag = true;
            }
        });
        if (flag) {
            popNewMessage('供应商ID不一致');

            return;
        }
        this.props.selectData.push(this.props.searchData[index]);
        this.props.searchData.splice(index,1);
        this.props.selectIndex.push(index);
        this.paint();
    }

    // 删除已选中的产品
    public remove(index:number) {
        const i = this.props.selectIndex[index];// 原始数据的下标
        const item = this.props.selectData[index];
        this.props.searchData.splice(i,0,item);
        this.props.selectData.splice(index,1);
        this.props.selectIndex.splice(index,1);
        this.paint();
    }

    // 执行下一步操作
    public next() {
        if (this.props.selectData.length) {
            this.props.onShelvesType = 1;
            this.paint();
        }
    }

    // 添加成功
    public showShopOk(e:any) {
        this.gotoShop(e);
    }

    // 取消
    public showProduct() {
        this.props.onShelvesType = 0;
        this.paint();
    }
}