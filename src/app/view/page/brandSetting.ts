// tslint:disable-next-line:missing-jsdoc
import { popNew } from '../../../pi/ui/root';
import { Widget } from '../../../pi/widget/widget';
import { perPage } from '../../components/pagination';
import { mallImagPre } from '../../config';
import { getAllBrand, removeBrand } from '../../net/pull';
import { popNewMessage } from '../../utils/logic';
import { exportExcel } from '../../utils/tools';

interface Props {
    showDataList:any;
    showTitleList:any;
    shopNum:number;
    mallImagPre:string;// 服务器地址
    brandList:any;// 原始数据
    perPage:number;// 每页多少条数据
    inputValue:string;// 搜索
    currentIndex:number; // 当前页码
    dataList:any;// 总数据
    expandIndex:boolean;// 下拉显示
    perPageIndex:number;// 一页多少个下标
}
let currentDataIndex = 0;
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
        perPage:perPage[0],
        inputValue:'',
        dataList:[],
        currentIndex:0,
        expandIndex:false,
        perPageIndex:0
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
            this.props.showDataList = this.props.dataList.slice(currentDataIndex * this.props.perPage,(currentDataIndex + 1) * this.props.perPage);
            this.props.currentIndex = currentDataIndex;
            this.paint();
        });
    }

    // 分页变化
    public pageChange(e:any) {
        if (this.props.inputValue) {

            return;
        }
        this.props.currentIndex = e.value;
        currentDataIndex = e.value;
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
        this.props.perPage = e.value;
        this.props.perPageIndex = e.index;
        this.props.expandIndex = false;
        if (this.props.inputValue) {
            this.search();
        } else {
            this.pageChange({ value:0 });
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
                    if (v[i]) {
                        v[i] = v[i].toString();
                    }  
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
        if (this.props.inputValue === '') {
            this.pageChange({ value:0 });
            this.props.shopNum = this.props.dataList.length;
            this.paint();
      
            return;
        }
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
        if (e.fg === 1) {
            // 编辑
            popNew('app-components-addBrand',{ title:'编辑品牌',data:e.value,sureText:'修改',style:false },() => {
                this.init();
            });
        } else {
            popNew('app-components-modalBox',{ content:`确认删除ID为“<span style="color:#1991EB">${e.value[0]}</span>的品牌` }, () => {
                this.remove(e.value[0],e.num);
            },() => {
                popNewMessage('你已经取消操作！');
            });
        }

    }

    // 添加品牌
    public addBrand() {
        popNew('app-components-addBrand',{ title:'添加品牌' },() => {
            this.init();
        });
    }

    // 删除操作
    public remove(id:number,index:number) {
        removeBrand(id).then(r => {
            if (r.result === 1) {
                popNewMessage('删除成功');
                this.init();
                this.paint();
            } else {
                popNewMessage('删除失败');
            }
        }).catch(e => {
            popNewMessage('删除失败');
        });
        
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
}