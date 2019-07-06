// tslint:disable-next-line:missing-jsdoc
import { deepCopy } from '../../../pi/util/util';
import { Widget } from '../../../pi/widget/widget';
import { getAllSuppliers } from '../../net/pull';
import { popNewMessage } from '../../utils/logic';
import { exportExcel } from '../../utils/tools';

interface Props {
    shopNum:number;// 数据条数
    showDataList:any;// 展示的数据
    showTitleList:any; // 标题
    btn1:string;// 表格操作按钮
    showAddSupplier:boolean;// 是否显示添加供应商页面
    searchValue:string;// 搜索框值
    currentValue:any;// 当前编辑的值
    dataList:any;// 原始数据
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
        showAddSupplier:false,
        searchValue:'',
        currentValue:[],
        dataList:[]
    };
    public create() {
        super.create();
        this.init();
    }
    public init() {
        // 获取所有供应商
        getAllSuppliers().then(r => {
            this.props.showDataList = r[1];
            this.props.dataList = r[0];
            this.props.shopNum = r[1].length;
            this.paint();
            console.log(r);
        });
    }
    // 显示供应商设置页面
    public showSupplier() {
        this.props.showAddSupplier = false;
        this.paint();
    }
    // 显示添加供应商页面
    public addSupplier() {
        this.props.showAddSupplier = true;
        this.paint();
    }
    // 输入框发生变化
    public inputChange(e:any) {
        this.props.searchValue = e.value;
    }
    // 搜索指定的供应商
    public search() {
        if (isNaN(parseInt(this.props.searchValue))) {
            popNewMessage('请输入正确的供应商ID');
            
            return;
        }
        getAllSuppliers([parseInt(this.props.searchValue)]).then(r => {
            this.props.showDataList = r[1];
            this.props.dataList = r[0];
            this.props.shopNum = r[1].length;
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
            const jsonData = r;
            for (const v of jsonData) {
                for (let i = 0;i < v.length;i++) {
                    v[i] = v[i].toString();
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
        this.props.showAddSupplier = true;
        this.props.currentValue = deepCopy(this.props.dataList[e.num]);
        this.paint();
    }
}