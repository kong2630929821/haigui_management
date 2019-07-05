// tslint:disable-next-line:missing-jsdoc
import { Widget } from '../../../pi/widget/widget';
import { unicode2Str } from '../../utils/logic';
import { importRead } from '../../utils/tools';

interface Props {
    statusType:any;// 状态筛选
    statusTypeActiveIndex:number;// 状态筛选当前下标
    expandIndex:number; 
    showDataList:any;// 数据列表
    showTitleList:any;// 表格标题
    currentData:any;// 当前编辑的数据
    style:boolean;// 当前状态 true编辑  false 添加
}
// tslint:disable-next-line:completed-docs
export class AddSupplier extends Widget {
    public props:Props = {
        statusType:[],
        statusTypeActiveIndex:0,
        expandIndex:-1,
        showDataList:[],
        showTitleList:['ID','地区','邮费'],
        currentData:[],
        style:false
    };
    public create() {
        super.create();
        // 状态筛选
        const timeType = [
            {
                status:0,
                text:'一般贸易'
            },{
                status:1,
                text:'海外贸易'
            },{
                status:2,
                text:'保税商品'
            }
        ];
        this.props.statusType = timeType;
    }
    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        if (this.props.currentData.length) {
            this.props.currentData[1][0] = unicode2Str(this.props.currentData[1][0]);
        }
    }
    // input框输入
    public inputChange(index:number,e:any) {
        this.props.currentData[index] = e.value;
    }
    // 供应商名称变化
    public supplierChange(e:any) {
        this.props.currentData[1][0] = e.value;
    }
    // 描述变化
    public textareaChange(e:any) {
        this.props.currentData[1][2] = e.value;
    }
    // 保存
    public save() {
        if (this.props.style) {
            // 编辑保存
            console.log(this.props.currentData);
        }
    }
    // 重置页面的展开状态
    public close() {
        this.props.expandIndex++;
        this.paint();
    }
    // 下拉选择框
    public filterTimeType(e:any) {
        this.props.statusTypeActiveIndex = e.value;
        this.paint();
    }
    // 导入运单号
    public importTransport(e:any) {
         // 导入运单
        const file = e.file;
        importRead(file,(res) => {
            console.log(res);
        });
    }
}