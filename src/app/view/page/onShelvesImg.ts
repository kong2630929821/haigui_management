// tslint:disable-next-line:missing-jsdoc
import { Widget } from '../../../pi/widget/widget';
import { getAllArea } from '../../net/pull';
interface Props {
    selectData:any;// 选中的产品
    showDataTitle:any;// 标题
    style:boolean;// 显示状态 true 添加 false查看
    areaId:any;// 地区ID选择
    areaIdActiveIndex:number;// 地区ID下标
    expandIndex:number ;
    classType:any;// 分类ID
    classTypeActiveIndex:number;// 分类下标
    bonded:any;// 是否报税
    bondedActiveIndex:number;// 报税ID
    data:any;// 输入框数据
    spreadList:any;// 差价列表
    inputTitle:any;// 输入框标题
}
// tslint:disable-next-line:completed-docs
export class OnShelvesImg extends Widget {
    public props:Props = {
        areaId:[],
        areaIdActiveIndex:0,
        classType:[],
        classTypeActiveIndex:0,
        bonded:[],
        bondedActiveIndex:0,
        expandIndex:-1,
        selectData:[],
        showDataTitle : ['供应商id','SKU','产品名','已下单未支付数量','总销量','库存','供货价','保质期','修改时间','供应商sku','供应商商品ID'],
        style:true,
        data:[],
        spreadList:[],
        inputTitle:['商品ID','商品名称','品牌ID','供应商ID','成本价','普通售价','会员价','折扣价','税费','商品介绍']
        
    };
    public create() {
        super.create();
        // 分类筛选
        const classType = [
            {
                status:0,
                text:'分类1'
            },{
                status:1,
                text:'分类2'
            }
        ];
        // 是否保税
        const bonded = [
            {
                status:0,
                text:'是'
            },{
                status:1,
                text:'否'
            }
        ];
        const typeList = [];
        this.props.classType = classType;
        this.props.bonded = bonded;
        this.props.areaId = bonded;
        getAllArea().then(r => {
            if (r.result === 1) {
                const data = r.areaInfo;
                data.forEach((v,i) => {
                    typeList.push({ status:i,text:v[0].toString() });
                });
                this.props.areaId = typeList;
                this.paint();    
            }
        });
    }

    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
    }
    // 地区ID选择
    public areaIdChange(e:any) {
        this.props.areaIdActiveIndex = e.activeIndex;
        this.paint();
    }
    // 分类选择
    public classTypeChange(e:any) {
        this.props.classTypeActiveIndex = e.activeIndex;
        this.paint();
    }
    // 是否保税
    public bondedChange(e:any) {
        this.props.bondedActiveIndex = e.activeIndex;
        this.paint();
    }
    // 输入框变化
    public inputChange(index:number,e:any) {
        this.props.data[index] = e.value;
    }
    // 差价输入变化
    public spread(e:any,index:number) {
        const sku_id = this.props.selectData[index][1];
        this.props.spreadList[index] = [sku_id,e.value];
    }
    // 图片上传
    public updataImg(e:any) {
        console.log(e);
    }
    // 下一步
    public next() {
        console.log(this.props.selectData);
        console.log(this.props.data);
        console.log(this.props.spreadList);
    }
}