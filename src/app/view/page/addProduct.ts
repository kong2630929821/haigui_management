// tslint:disable-next-line:missing-jsdoc
import { popNew } from '../../../pi/ui/root';
import { notify } from '../../../pi/widget/event';
import { Widget } from '../../../pi/widget/widget';
import { addProduct, editInventory, getAllSuppliers } from '../../net/pull';
import { dateToString, parseDate, popNewMessage, timeConvert, transitTimeStamp } from '../../utils/logic';
import { rippleShow } from '../../utils/tools';

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
    data:any;// [SKU,产品名,已下单未支付数量,总销量,库存,供货价,保质期,修改时间]
    status:number; // 1查看 2修改 3添加
    shelfLife:any;// 是否有保质期
    shelfLifeActiveIndex:number;// 下标
    expandIndex:any;
    title:string;// 标题
    supplierType:any;// 供应商下拉
    supplierId:any;// 供应商ID数组
    currendId:number;// 当前供应商ID
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
        supplier:0,
        sku_name:'',
        inventory:0,
        supplier_price:0,
        shelf_life:[0,0],
        data:[],
        status:-1,
        shelfLife:[],
        shelfLifeActiveIndex:0,
        expandIndex:[false,false],
        title:'添加SKU',
        supplierType:[],
        supplierId:[],
        currendId:0
    };
    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        const shelfLife = [
            {
                status:0,
                text:'是'
            },{
                status:1,
                text:'否'
            }
        ];
        this.props.shelfLife = shelfLife;
        this.props.endTime = dateToString(Date.now(),1).split(' ')[0];
        this.props.startTime = parseDate(this.props.endTime,-7,1).split(' ')[0];
        // 获取所有供应商
        getAllSuppliers().then(r => {
            this.props.supplierType = r[2][1];
            this.props.supplierId = r[2][0];
            if (props.data) {
                r[2][0].forEach((v,i) => {
                    if (v === this.props.currendId) {
                        this.props.supplier = i;
                    }
                });
            }
            this.paint();
        });
        if (this.props.status === 3) {

            return ;
        }
        this.props.data[6] = Number(this.props.data[6].substring(1));
        if (this.props.data[7] === '无') {
            this.props.shelfLifeActiveIndex = 1;
        } else {
            const timeArr = this.props.data[7].split('~');
            this.props.startTime = timeArr[0];
            this.props.endTime = timeArr[1];
            this.props.shelfLifeActiveIndex = 0;
        }
        if (this.props.status === 1) {
            this.props.title = '查看SKU';
        } else if (this.props.status === 2) {
            this.props.title = '修改SKU';
        } else {
            this.props.title = '添加SKU';
        }
        this.props.currendId = this.props.data[0];
        this.props.data.shift();
        console.log(props);
    }
    // 是否有保质期变化
    public shelfLifeChange(e:any) {
        this.close();
        this.props.shelfLifeActiveIndex = e.activeIndex;
        this.paint();
    }
    // 重置页面的展开状态
    public close() {
        this.props.showDateBox = false;
        this.props.expandIndex = [false,false];
        this.paint();
    }
    // 日期选择框显示
    public changeDateBox(e:any) {
        this.close();
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
        this.props.data[0] = e.value;
    }
    public sku_nameChange(e:any) {
        this.props.data[1] = e.value;
    }
    public inventoryChange(e:any) {
        this.props.data[4] = Number(e.value);
    }
    public supplier_priceChange(e:any) {
        this.props.data[5] = Number(e.value);
    }
    public supplierSkuChange(e:any) {
        this.props.data[8] = Number(e.value);
    }
    public supplierIdChange(e:any) {
        this.props.data[9] = Number(e.value);
    }
    public returnGoodsInfo(e:any) {
        this.props.data[10] = e.value;
    }
    public recipient(e:any) {
        this.props.data[11] = e.value;
    }
    public phoneChange(e:any) {
        this.props.data[12] = e.value;
    }
    // 保存添加的产品
    public saveProduct(e:any) {
        this.close();
        const sku = this.props.data[0];
        const supplier = this.props.supplierId[this.props.supplier];
        const sku_name =  this.props.data[1];
        const inventory = this.props.data[4];
        const supplier_price = Math.round(this.props.data[5] * 100);
        const supplier_sku = this.props.data[8];
        const supplier_id = this.props.data[9];
        let time = null;
        if (!sku || !supplier || !sku_name || !inventory || !supplier_price || supplier_sku === '' || supplier_id === '') {
            popNewMessage('请填写信息');

            return ;
        }
        if (!this.props.data[10] || !this.props.data[11] || !this.props.data[12]) {
            popNewMessage('请填写信息');

            return ;
        }
        if (!/^1[3456789]\d{9}$/.test(this.props.data[12])) { 
            popNewMessage('电话号码格式错误');

            return;
        } 
        // if (this.props.startTime === '' || this.props.endTime === '') {
        //     popNewMessage('请填写保质期');

        //     return;
        // }
        if (this.props.shelfLifeActiveIndex === 0) {
            if (this.props.startTime === '' || this.props.endTime === '') {
                popNewMessage('请填写保质期');
    
                return;
            }
            time = [transitTimeStamp(this.props.startTime),transitTimeStamp(this.props.endTime)];
        } else {
            time = '';
        }

        const returnInfo = [this.props.data[10],this.props.data[11],this.props.data[12]];
        if (this.props.status === 3) {
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

    // 供应商选择
    public supplierTypeChange(e:any) {
        this.close();
        this.props.supplier = e.value;
    }
    
    // 过滤器变化
    public expand(index:number,e:any) {
        this.close();
        this.props.expandIndex[index] = e.value;
        this.paint();
    }
    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }
}