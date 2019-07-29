// tslint:disable-next-line:missing-jsdoc
import { deepCopy } from '../../../pi/util/util';
import { Widget } from '../../../pi/widget/widget';
import { perPage } from '../../components/pagination';
import { getAllSuppliers } from '../../net/pull';
import { exportExcel, rippleShow } from '../../utils/tools';

interface Props {
    shopNum:number;// 数据条数
    showDataList:any;// 展示的数据
    showTitleList:any; // 标题
    btn1:string;// 表格操作按钮
    showAddSupplier:number;// 是否显示添加供应商页面  0 供应商页面  1添加  2编辑
    searchValue:string;// 搜索框值
    currentValue:any;// 当前编辑的值
    dataList:any;// 原始数据
    perPage:number;// 每页多少条数据
    allDataList:any;// 全部数据
    currentIndex:number;// 当前页数
    expand:boolean;// 控制分页下拉显示
    perPageIndex:number;// 分页的下标
    searchDataList:any;// 搜索得到的数据
    
}
/**
 * 供应商设置
 */
// tslint:disable-next-line:completed-docs
export class PlatformSettings extends Widget {
    public props:Props = {
        shopNum:0,
        showDataList:[],
        showTitleList:['供应商（ID）','供应商名','备注描述','手机号码','最后一次调整时间'],
        btn1:'编辑',
        showAddSupplier:0,
        searchValue:'',
        currentValue:[],
        dataList:[],
        perPage:perPage[0],
        allDataList:[],
        currentIndex:0,
        expand:false,
        perPageIndex:0,
        searchDataList:[]
    };
    public create() {
        super.create();
        this.init();
    }
    public init() {
        // 获取所有供应商
        getAllSuppliers().then(r => {
            this.props.dataList = r[0];
            this.props.shopNum = r[1].length;
            this.props.allDataList = r[1];
            this.props.showDataList = this.props.allDataList.slice(0,this.props.perPage);
            this.paint();
            console.log(r);
        });
    }
    // 显示供应商设置页面
    public showSupplier() {
        this.props.showAddSupplier = 0;
        this.paint();
    }
    // 显示添加供应商页面
    public addSupplier() {
        this.props.showAddSupplier = 1;
        this.paint();
    }
    // 输入框发生变化
    public inputChange(e:any) {
        this.props.searchValue = e.value;
    }
    // 搜索指定的供应商
    public search() {
        if (this.props.searchValue === '') {
            this.init();

            return;
        }
        getAllSuppliers([parseInt(this.props.searchValue)]).then(r => {
            this.props.showDataList = r[1];
            this.props.dataList = r[0];
            this.props.shopNum = r[1].length;
            this.props.searchDataList = r[1];
            this.paint();
            console.log(r);
        });
    }
    // 导出全部供应商
    public exportShop(e:any) {
        getAllSuppliers().then(r => {
            console.log('getAllProduct',r);
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
            exportExcel(aoa,`供应商表.xlsx`);
        
            console.log('contentList ===',jsonData);
        });
    }
    // 编辑供应商
    public goDetail(e:any) {
        console.log(e);
        this.props.showAddSupplier = 2;
        const index = this.props.currentIndex * this.props.perPage + e.num;
        this.props.currentValue = deepCopy(this.props.dataList[index]);
        this.paint();
    }
    // 保存编辑添加触发
    public saveChange() {
        this.props.showAddSupplier = 0;
        this.init();
    }

    // 分页变化
    public pageChange(e:any) {
        this.props.currentIndex = e.value;
        if (this.props.searchValue) {
            this.props.showDataList = this.props.searchDataList.slice(e.value * this.props.perPage,(e.value + 1) * this.props.perPage);
        } else {
            this.props.showDataList = this.props.allDataList.slice(e.value * this.props.perPage,(e.value + 1) * this.props.perPage);
        }
        this.paint();
    }

    // 每页展示多少数据
    public perPage(e:any) {
        this.props.perPage = e.value;
        this.props.perPageIndex = e.index;
        this.props.expand = false;
        if (this.props.searchValue) {
            this.search();
        } else {
            this.pageChange({ value:0 });
        }
            
    }

    // 过滤器
    public expand(e:any) {
        this.props.expand = e.value;
        this.paint();
    }

    // 页面点击
    public close() {
        this.props.expand = false;
        this.paint();
    }

    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }
}