import { Widget } from '../../../pi/widget/widget';
import { perPage } from '../../components/pagination';
import { getCurrentGood, getHbaoGoodsList } from '../../net/pull';
import { getStore, GoodsDetail, setStore } from '../../store/memstore';
import { rippleShow } from '../../utils/tools';

interface Props {
    dataList:{user:number;goods:GoodsDetail}[];
    showDataList:{user:number;goods:GoodsDetail}[];
    shopNum:number;
    perPage:number;
    showDateTitle:string[];
    inputValue:string;
    currentIndex:number; // 当前页码
    expandIndex:boolean;// 下拉显示
    perPageIndex:number;// 一页多少个的下标
}

/**
 * 399商品绑定商户
 */
export class HBaoGoodsSetting extends Widget {
    public props:Props = {
        dataList:[],
        showDataList:[],
        shopNum:0,
        perPage:perPage[0],
        showDateTitle:['规格','SKU','价格（成本/普通价/会员价）','实际差价','库存','供应商ID','供应商SKU','供应商商品ID','保质期'],
        inputValue:'',
        currentIndex:0,
        expandIndex:false,
        perPageIndex:0
    };

    public create() {
        super.create();
        this.init();
    }

    public init() {
        getHbaoGoodsList().then(r => {
            // const list = getStore('hBaoGoodsDetail',[]);
            const list = [];
            this.props.showDataList = this.props.dataList = list;
            this.props.shopNum = r.length;
            this.paint();            

            for (const v of r) {
                // if (list.findIndex(r => r.user === v[1]) === -1) {
                getCurrentGood(String(v[0])).then(res => {
                    list.push({
                        user: v[1],
                        goods: res[0]
                    });
                    
                    this.props.showDataList = list;
                    this.paint();
                    setStore('hBaoGoodsDetail',list);
                });
                // }
            }
        });
    }

    // 输入框改变
    public inputChange(e:any) {
        this.props.inputValue = e.value;
    }

    // 搜索
    public search() {
        if (this.props.inputValue) {
            this.props.showDataList = this.props.dataList.filter(r => {
                return String(r.goods.id).match(this.props.inputValue);
            });
        } else {
            this.props.showDataList = this.props.dataList;
        }
        this.paint();
    }
    // 每页展示多少数据
    public perPage(e:any) {
        this.props.perPage = e.value;
        this.props.perPageIndex = e.index;
        this.props.expandIndex = false;
        if (this.props.inputValue) {
            this.search();
        } else {
            this.pageChange({ value:0 });
        }
            
    }

    // 分页变化
    public pageChange(e:any) {
        this.props.currentIndex = e.value;
        this.props.showDataList = this.props.dataList.slice(e.value * this.props.perPage,(e.value + 1) * this.props.perPage);
        console.log('当前页数据：',this.props.showDataList);
        this.paint();
    }

    // 过滤器
    public expand(e:any) {
        this.props.expandIndex = e.value;
        this.paint();
    }
    
    // 页面点击
    public close() {
        this.props.expandIndex = false;
        this.paint();
    }

    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }
}