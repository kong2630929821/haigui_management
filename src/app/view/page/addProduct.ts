// tslint:disable-next-line:missing-jsdoc
import { popNew } from '../../../pi/ui/root';
import { notify } from '../../../pi/widget/event';
import { Widget } from '../../../pi/widget/widget';
import { addProduct, editInventory } from '../../net/pull';
import { popNewMessage, timeConvert, transitTimeStamp } from '../../utils/logic';

interface Props {
    showDateBox:boolean;// 时间选择
    startTime:string;
    endTime:string;
    sku:string;// 产品唯一SKU
    supplier:number;// 供应商id
    sku_name:string ;// 产品名  
    inventory:number;// 库存   
    supplier_price:number;// 供货价  
    shelf_life:any;// 保质期
    data:any;// [供应商ID,SKU,产品名,已下单未支付数量,总销量,库存,供货价,保质期,修改时间]
    status:number; // 1查看 2修改
    shelfLife:any;// 是否有保质期
    shelfLifeActiveIndex:number;// 下标
    expandIndex:number;

}
/**
 * 添加产品
 */
// tslint:disable-next-line:completed-docs
export class AddProduct extends Widget {
    public props:Props = {
        showDateBox:false,
        startTime:'',  // 查询开始时间
        endTime:'', // 查询结束时间
        sku:'',
        supplier:-1,
        sku_name:'',
        inventory:0,
        supplier_price:0,
        shelf_life:[0,0],
        data:[],
        status:-1,
        shelfLife:[],
        shelfLifeActiveIndex:0,
        expandIndex:-1
    };
    public create() {
        super.create();
        const shelfLife = [
            {
                status:0,
                text:'是'
            },{
                status:1,
                text:'否'
            }
        ];
        const oData = new Date();
        const time = oData.setHours(23, 59, 59, 999);
        this.props.shelfLife = shelfLife;
        this.props.endTime =  timeConvert(time);
        this.props.startTime = '2019-05-01 00:00:000';
    }
    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        this.props.data[6] = Number(this.props.data[6].substring(1)) * 100;
        if (this.props.data[7].length) {
            const timeArr = this.props.data[7].split('~');
            this.props.startTime = timeArr[0];
            this.props.endTime = timeArr[1];
        }
        console.log(props);
    }
    // 是否有保质期变化
    public shelfLifeChange(e:any) {
        this.props.shelfLifeActiveIndex = e.activeIndex;
        this.paint();
    }
    // 重置页面的展开状态
    public close() {
        this.props.showDateBox = false;
        this.props.expandIndex++;
        this.paint();
    }
         // 日期选择框显示
    public changeDateBox(e:any) {
        this.props.showDateBox = e.value;
        this.paint();
    } 
        // 改变时间
    public  changeDate(e:any) {
        this.props.startTime = e.value[0];
        this.props.endTime = e.value[1];
    }
    // 添加SKU
    public skuChange(e:any) {
        this.props.data[1] = e.value;
    }
    public supplierChange(e:any) {
        this.props.data[0] = Number(e.value);
    }
    public sku_nameChange(e:any) {
        this.props.data[2] = e.value;
    }
    public inventoryChange(e:any) {
        this.props.data[5] = Number(e.value);
    }
    public supplier_priceChange(e:any) {
        this.props.data[6] = Number(e.value);
    }
    public supplierSkuChange(e:any) {
        this.props.data[9] = Number(e.value);
    }
    public supplierIdChange(e:any) {
        this.props.data[10] = Number(e.value);
    }
    public returnGoodsInfo(e:any) {
        this.props.data[11] = e.value;
    }
    public recipient(e:any) {
        this.props.data[12] = e.value;
    }
    public phoneChange(e:any) {
        this.props.data[13] = e.value;
    }
    // 保存添加的产品
    public saveProduct(e:any) {
        const sku = this.props.data[1];
        const supplier = this.props.data[0];
        const sku_name =  this.props.data[2];
        const inventory = this.props.data[5];
        const supplier_price = this.props.data[6];
        const supplier_sku = this.props.data[9];
        const supplier_id = this.props.data[10];
        let time = null;
        if (!sku || !supplier || !sku_name || !inventory || !supplier_price || !supplier_sku || !supplier_id) {
            popNewMessage('请填写信息');

            return ;
        }
        if (!this.props.data[11] || !this.props.data[12] || !this.props.data[13]) {
            popNewMessage('请填写信息');

            return ;
        }
        if (!/^1[3456789]\d{9}$/.test(this.props.data[13])) { 
            popNewMessage('电话号码格式错误');

            return;
        } 
        if (this.props.shelfLifeActiveIndex === 0) {
            time = [transitTimeStamp(this.props.startTime),transitTimeStamp(this.props.endTime)];
        } else {
            time = '';
        }

        const returnInfo = [this.props.data[11],this.props.data[12],this.props.data[13]];
        if (this.props.status === -1) {
            // -1添加
            addProduct(sku,supplier,sku_name,inventory,supplier_price,time,supplier_sku,supplier_id,returnInfo).then(r => {
                console.log(r);
                if (r.result === 1) {
                    popNewMessage('添加成功');
                    notify(e.node,'ev-change-save',null);  
                } else {
                    popNewMessage('添加失败');
                }
            }).catch(e => {
                popNewMessage('添加失败');
            });
        } else if (this.props.status === 2) {
            // 修改
            popNew('app-components-modalBox',{ content:`确认修改一旦修改，将及时影响品牌信息，请慎重` }, () => {
                editInventory(sku,supplier,sku_name,inventory,supplier_price,time,supplier_sku,supplier_id,returnInfo).then(r => {
                    console.log(r);
                    if (r.result === 1) {
                        popNewMessage('修改成功');
                        notify(e.node,'ev-change-save',null);  
                    } else {
                        popNewMessage('修改失败');
                    }
                }).catch(e => {
                    popNewMessage('修改失败');
                });
            },() => {
                popNewMessage('你已经取消操作！');
            });
        }
    }
    // 去产品库
    public gotoProduct(e:any) {
        notify(e.node,'ev-change-showProduct',null);
    }
}