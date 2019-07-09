// tslint:disable-next-line:missing-jsdoc
import { popNew } from '../../../pi/ui/root';
import { Widget } from '../../../pi/widget/widget';
import { mallImagPre } from '../../config';
import { getAllBrand } from '../../net/pull';
import { popNewMessage } from '../../utils/logic';
import { exportExcel } from '../../utils/tools';

interface Props {
    showDataList:any;
    showTitleList:any;
    shopNum:number;
    mallImagPre:string;// 服务器地址
    brandList:any;// 原始数据
    currentIndex:number;// 当前分页下标
    perPage:number;// 每页多少条数据
    inputValue:string;// 搜索
    dataList:any;// 总数据
}
// 每页多少数据
const perPage = [20,50,100];
/**
 * 品牌设置
 */
// tslint:disable-next-line:completed-docs
export class BrandSetting extends Widget {
    public props:Props = {
        showTitleList:['品牌ID','品牌名','ICON','描述','品牌包含的商品id','修改时间'],
        showDataList:[],
        shopNum:0,
        mallImagPre:mallImagPre,
        brandList:[],
        currentIndex:0,
        perPage:perPage[0],
        inputValue:'',
        dataList:[]
    };
    public create() {
        super.create();
        this.init();
    }
    // 初始化
    public init() {
        getAllBrand().then(r => {
            this.props.brandList = r[0];
            this.props.shopNum = r[1].length;
            this.props.dataList = r[1];
            this.props.showDataList = this.props.dataList.slice(0,this.props.perPage);
            this.paint();
        });
    }
    // 分页变化
    public pageChange(e:any) {
        console.log(e.value);
        this.props.showDataList = this.props.dataList.slice(e.value * this.props.perPage,(e.value + 1) * this.props.perPage);
        console.log('当前页数据：',this.props.showDataList);
        this.paint();
    }
        // 输入框改变
    public inputChange(e:any) {
        this.props.inputValue = e.value;
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
    // 导出全部数据
    public exportShop() {
        getAllBrand().then(r => {
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
            exportExcel(aoa,`品牌列表.xlsx`);
            
            console.log('contentList ===',jsonData);
        });
    }
    // 搜索
    public search() {
        if (isNaN(parseInt(this.props.inputValue))) {
            popNewMessage('请输入正确的供应商ID');
            
            return;
        }
        getAllBrand([parseInt(this.props.inputValue)]).then(r => {
            this.props.showDataList = r[1];
            this.props.brandList = r[0];
            this.props.shopNum = r[1].length;
            this.paint();
        });
    }

    // 表格操作按钮
    public goDetail(e:any) {
        popNew('app-components-modalBox',{ content:`确认删除ID为“<span style="color:#1991EB">${e.value[0]}</span>的品牌` }, () => {
            this.remove();
        },() => {
            popNewMessage('你已经取消操作！');
        });
    }

    // 添加品牌
    public addBrand() {
        popNew('app-components-addBrand',{ title:'添加品牌' },() => {
            popNewMessage('添加成功');
        });
    }

    // 删除操作
    public remove() {
        popNewMessage('删除成功');
    }
}