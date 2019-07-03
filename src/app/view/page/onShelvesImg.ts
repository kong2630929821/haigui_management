// tslint:disable-next-line:missing-jsdoc
import { Widget } from '../../../pi/widget/widget';
interface Props {
    timeType:any;// 状态筛选
    timeTypeActiveIndex:number;// 状态筛选当前下标
    expandIndex:number;
    selectData:any;// 选中的产品
    showDataTitle:any;// 标题
    style:boolean;// 显示状态 true 添加 false查看
}

// tslint:disable-next-line:completed-docs
export class OnShelvesImg extends Widget {
    public props:Props = {
        timeType:[],
        timeTypeActiveIndex:0,
        expandIndex:-1,
        selectData:[],
        showDataTitle : ['供应商id','SKU','产品名','已下单未支付数量','总销量','库存','供货价','保质期','修改时间','供应商sku','供应商商品ID'],
        style:true
        
    };
    public create() {
        super.create();
        // 状态筛选
        const timeType = [
            {
                status:0,
                text:'分类1'
            },{
                status:1,
                text:'分类2'
            }
        ];
        this.props.timeType = timeType;
    }

    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
    }

    // 差价
    public spread(e:any,index:number) {
        // this.props.selectData
    }
}