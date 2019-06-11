import { Widget } from '../../../pi/widget/widget';
import { orderMaxCount } from '../../config';
import { getAllOrder, getAllSupplier, getOrder, getOrderById, getOrderKey, importTransport } from '../../net/pull';
import { dateToString, popNewMessage } from '../../utils/logic';
import { exportExcel, importRead } from '../../utils/tools';

export type GoodsDetails = [number,string,number,number,string,string]; // [商品id,商品名称,购买时价格,数量,sku id,sku 描述]

// [供应商id,订单id,用户id,商品详细信息,商品原支付金额,商品税费,商品运费,其它费用,收件人姓名,收件人电话,收件人地区,收件人详细地址,下单时间,支付时间,发货时间,收货时间,完成时间,运单号,'订单总金额','微信支付单号','姓名','身份证号']
export type Order = [number,number,number,GoodsDetails[],number,number,number,number,string,string,number,string,number,number,number,number,number,string,number,string,string,string];

// ['订单编号','商品ID','商品名称','商品数量','商品SKU','商品规格','供货商ID','下单时间','用户ID','姓名','手机号','地址信息','订单状态','订单总金额','微信支付单号','姓名','身份证号']
export type OrderShow = [number,number,string,number,string,string,number,string,number,string,string,string,string,string,string,string,string];

// 订单类型
export enum OrderStatus {
    FAILED = 0,           // 失败
    PENDINGPAYMENT = 1,   // 待付款
    PENDINGDELIVERED  = 2,   // 待发货
    PENDINGRECEIPT  = 3,   // 待收货
    PENDINGFINISH = 4,     // 待完成     确认收货后7天算已完成   这个时间段内的订单可以申请退货
    FINISHED = 5,    // 已完成  已过7天 
    ALL = 6               // 全部
}

// 订单状态
export enum OrderState {
    NOTEXPORT = 0,   // 未导出
    EXPORTED = 1,   // 已导出
    ALL = 2          // 全部
}

// 订单时间类型
export enum TimeType {
    ORDERTIME = 1,     // 下单时间
    PAYTIME = 2,        // 支付时间
    SHIPTIME = 3,       // 发货时间
    RECEIPTTIME = 4,    // 收货时间
    FINISHED = 5        // 完成时间
}

// 订单状态显示
export const OrderStatusShow = {
    [OrderStatus.ALL]:'全部',
    [OrderStatus.FAILED]:'失败',
    [OrderStatus.PENDINGPAYMENT]:'待付款',
    [OrderStatus.PENDINGDELIVERED]:'待发货',
    [OrderStatus.PENDINGRECEIPT]:'待收货',
    [OrderStatus.PENDINGFINISH]:'已收货',
    [OrderStatus.FINISHED]:'已完成'
};
/**
 * 所有订单
 */
export class TotalOrder extends Widget {
    public props:any = {
        showTitleList:['订单编号','商品ID','商品名称','商品数量','商品SKU','商品规格','供货商ID','下单时间','用户ID','收货人','手机号','地址信息','订单状态','订单总金额','微信支付单号','姓名','身份证号'],
        contentList:[],   // 展示的原始数据
        contentShowList:[], // 展示的数据
        supplierList:[],
        supplierActiveIndex:0,
        orderType:[],
        orderTypeActiveIndex:0,
        orderState:[],
        orderStateActiveIndex:0,
        timeType:[],
        timeTypeActiveIndex:0,
        inputOrderId:0,
        showDateBox:false,
        startTime:'2019-05-30 00:00:00',
        endTime:dateToString(Date.now(),1),
        orderMaxCount,
        selectList:[],
        currentPageIndex:0,    // 当前页数
        totalCount:0,     // 总数目
        forceUpdate:false,   // 强制刷新  通过不断改变其值来触发分页的setProps 分页组件目前不完美
        expandIndex:-1      // 触发下拉列表 
    };

    public create() {
        // 订单类型
        const orderType = [{
            status:OrderStatus.ALL,
            text:'全部'
        },{
            status:OrderStatus.FAILED,
            text:'失败'
        },{
            status:OrderStatus.PENDINGPAYMENT,
            text:'已下单未支付'
        },{
            status:OrderStatus.PENDINGDELIVERED,
            text:'已支付未发货'
        },{
            status:OrderStatus.PENDINGRECEIPT,
            text:'已发货未签收'
        },{
            status:OrderStatus.PENDINGFINISH,
            text:'已收货'
        },{
            status:OrderStatus.FINISHED,
            text:'已完成'
        }];

        // 订单状态
        const orderState = [{
            status:OrderState.ALL,
            text:'全部'
        },{
            status:OrderState.NOTEXPORT,
            text:'未导出'
        },{
            status:OrderState.EXPORTED,
            text:'已导出'
        }];

        const timeType = [{
            status:TimeType.ORDERTIME,
            text:'下单时间'
        },{
            status:TimeType.PAYTIME,
            text:'支付时间'
        },{
            status:TimeType.SHIPTIME,
            text:'发货时间'
        },{
            status:TimeType.RECEIPTTIME,
            text:'收货时间'
        },{
            status:TimeType.FINISHED,
            text:'完成时间'
        }];
        this.props.orderType = orderType;
        this.props.orderState = orderState;
        this.props.timeType = timeType;
        // 切换到所有订单页时将所有供应商查询出来
        getAllSupplier().then((r) => {
            const supplier = JSON.parse(r);
            const arr = [];    // 代表所有供应商
            for (const v of supplier) {
                arr.push(v[0]);
            }
            this.props.supplierList = arr;
            this.paint();
            this.filterOrderQuery();
            this.pageChangeQuery();
        });

    }

    public selectClick(e:any) {
        this.props.selectList = e.selectList;
    }
    
    public async exportOrder(e:any) {
        const supplierId = Number(this.props.supplierList[this.props.supplierActiveIndex]);
        const status = this.props.orderType[this.props.orderTypeActiveIndex].status;
        const exportList = [];
        const oidsSet = new Set();
        for (let i = 0;i < this.props.contentShowList.length;i++) {
            if (this.props.selectList[i]) {
                const content = this.props.contentShowList[i];
                exportList.push(content);
                oidsSet.add(content[0]);
            }
        }

        if (exportList.length === 0) {
            popNewMessage('请选择要导出的订单');

            return;
        }
        this.updateOrderTitle(status);
        const titleList = JSON.parse(JSON.stringify(this.props.showTitleList));
        if (status === OrderStatus.PENDINGDELIVERED) {
            this.props.contentShowList = await getOrder(supplierId,2,[...oidsSet]);
            titleList.push('物流单号');
        }
        
        const aoa = [titleList];
        
        for (const v of exportList) {
            for (let i = 0;i < v.length;i++) {
                v[i] = v[i].toString();
            }
            aoa.push(v);
        }
        console.log(aoa);
        exportExcel(aoa,`${this.props.orderType[this.props.orderTypeActiveIndex].text}订单.xlsx`);
        
    }

    public importTransport(e:any) {
        // 导入运单
        const file = e.file;
        importRead(file,(res) => {
            importTransport(res);
        });
    }
    // 按订单id查询
    public searchById(e:any) {
        const orderId = Number(this.props.inputOrderId);
        if (!orderId) {
            this.filterOrderQuery();
            this.pageChangeQuery();

            return;
        }
        getOrderById(orderId).then(([orders,ordersShow]) => {
            console.log('r= ',ordersShow);
            if (ordersShow.length === 0) {
                popNewMessage('订单不存在');

                return;
            }
            this.props.contentShowList = ordersShow;
            this.props.contentList = orders;
            this.paint();
        });
    }
    
    // 获取订单
    public filterOrderQuery(id:number = 0) {
        const time_type = this.props.timeType[this.props.timeTypeActiveIndex].status; // 时间类型，1下单，2支付，3发货， 4收货，5完成
        const start = this.props.startTime;     // 启始时间，单位毫秒
        const tail = this.props.endTime;         // 结束时间，单位毫秒
        let sid = Number(this.props.supplierList[this.props.supplierActiveIndex]);        
        sid = isNaN(sid) ? 0 : sid;                   // 供应商id，等于0表示所有供应商，大于0表示指定供应商
        const orderType = this.props.orderType[this.props.orderTypeActiveIndex].status ;  // 订单类型，0失败，1待支付，2待发货，3待收货，4待完成
        const state = this.props.orderState[this.props.orderStateActiveIndex].status;    // 订单状态，0未导出，1已导出

        return getAllOrder(id,orderMaxCount,time_type,start,tail,sid,orderType,state).then(([orders,ordersShow]) => {
            this.updateOrderTitle(orderType);
            this.props.contentShowList = ordersShow;
            this.props.contentList = orders;
            this.paint();
        });
        
    }

    // 分页变动
    public pageChangeQuery(count:number = 0) {
        count = !count ? orderMaxCount : this.props.currentPageIndex * orderMaxCount;          // 需要获取的订单信息数量，即一页需要显示的数量
        const time_type = this.props.timeType[this.props.timeTypeActiveIndex].status; // 时间类型，1下单，2支付，3发货， 4收货，5完成
        const start = this.props.startTime;     // 启始时间，单位毫秒
        const tail = this.props.endTime;         // 结束时间，单位毫秒
        let sid = Number(this.props.supplierList[this.props.supplierActiveIndex]);        
        sid = isNaN(sid) ? 0 : sid;                   // 供应商id，等于0表示所有供应商，大于0表示指定供应商
        const orderType = this.props.orderType[this.props.orderTypeActiveIndex].status ;  // 订单类型，0失败，1待支付，2待发货，3待收货，4待完成
        const state = this.props.orderState[this.props.orderStateActiveIndex].status;    // 订单状态，0未导出，1已导出

        return getOrderKey(count,time_type,start,tail,sid,orderType,state).then(([orders,totalCount]) => {
            this.props.totalCount = totalCount;
            this.paint();
            console.log(orders);

            return orders[0][0];
        });
    }

    public updateOrderTitle(orderType:OrderStatus) {
        if (orderType === OrderStatus.PENDINGPAYMENT) {
            this.props.showTitleList[7] = '下单时间';
        } else {
            this.props.showTitleList[7] = '支付时间';
        }
    }
        // 根据供应商id筛选
    public filterSupplierId(e:any) {
        this.props.supplierActiveIndex = e.value;
        this.props.currentPageIndex = 0;
        this.props.forceUpdate = !this.props.forceUpdate;
        this.props.totalCount = 0;
        this.filterOrderQuery();
        this.pageChangeQuery();
    }

        // 根据订单类型筛选
    public filterOrderType(e:any) {
        this.props.orderTypeActiveIndex = e.activeIndex;
        this.props.currentPageIndex = 0;
        this.props.forceUpdate = !this.props.forceUpdate;
        this.props.totalCount = 0;
        this.filterOrderQuery();
        this.pageChangeQuery();
    }

        // 根据导出状态筛选,未导出，已导出
    public filterExportType(e:any) {
        this.props.orderStateActiveIndex = e.activeIndex;
        this.props.currentPageIndex = 0;
        this.props.forceUpdate = !this.props.forceUpdate;
        this.props.totalCount = 0;
        this.filterOrderQuery();
        this.pageChangeQuery();
    }

        // 根据时间筛选
    public filterTimeType(e:any) {
        this.props.timeTypeActiveIndex = e.activeIndex;
        this.props.currentPageIndex = 0;
        this.props.forceUpdate = !this.props.forceUpdate;
        this.props.totalCount = 0;
        this.filterOrderQuery();
        this.pageChangeQuery();
    }

    public changeTime(e:any) {
        console.log('time ==',e.value);
        this.props.startTime = e.value[0];
        this.props.endTime = e.value[1];
    }

    public inputValue(e:any) {
        this.props.inputOrderId = e.value;
        this.paint();
    }

    public closeClick() {
        console.log('close',this.props.showDateBox);
        this.props.showDateBox = false;
        this.props.expandIndex++;
        this.paint();
    }

    public changeDateBox(e:any) {
        this.props.showDateBox = e.value;
        console.log(this.props.showDateBox);
        this.paint();
    }

    public pageChange(e:any) {
        this.props.currentPageIndex = e.value;
        console.log('当前页数 ===',e);
        if (this.props.currentPageIndex === 0) {
            this.filterOrderQuery();
            this.pageChangeQuery();
        } else {
            this.pageChangeQuery().then(id => {
                this.filterOrderQuery(id);
            });
        }
        
    }

}