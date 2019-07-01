// tslint:disable-next-line:missing-jsdoc
import { Widget } from '../../../pi/widget/widget';
import { getAllSuppliers } from '../../net/pull';

interface Props {
    shopNum:number;// 数据条数
    showDataList:any;// 展示的数据
    showTitleList:any; // 标题
    btn1:string;// 表格操作按钮
    showAddSupplier:boolean;// 是否显示添加供应商页面
}
// tslint:disable-next-line:completed-docs
export class PlatformSettings extends Widget {
    public props:Props = {
        shopNum:0,
        showDataList:[],
        showTitleList:['供应商（ID）','联系电话','备注描述','最后一次调整时间'],
        btn1:'编辑',
        showAddSupplier:false
    };
    public create() {
        super.create();
        this.init();
    }
    public init() {
        // 获取所有供应商
        getAllSuppliers().then(r => {
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
}