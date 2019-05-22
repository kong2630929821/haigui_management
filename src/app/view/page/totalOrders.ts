import { Widget } from '../../../pi/widget/widget';
import { getAllOrder, getAllSupplier, getOrder, getOrderById, importTransport } from '../../net/pull';
import { exportExcel, importRead } from '../../utils/tools';

export type GoodsDetails = [number,string,number,number,string,string]; // [商品id,商品名称,购买时价格,数量,sku id,sku 描述]

// [供应商id,订单id,用户id,商品详细信息,商品原支付金额,商品税费,商品运费,其它费用,收件人姓名,收件人电话,收件人地区,收件人详细地址,下单时间,支付时间,发货时间,收货时间,完成时间]
export type Order = [number,number,number,GoodsDetails[],number,number,number,number,string,string,number,string,number,number,number,number,number];

// ['订单编号','商品ID','商品名称','商品数量','商品SKU','商品规格','供货商ID','用户ID','姓名','手机号','地址信息','订单状态']
export type OrderShow = [number,number,string,number,string,string,number,number,string,string,string,string];

// 订单状态
export enum OrderStatus {
    FAILED = 0,           // 失败
    PENDINGPAYMENT = 1,   // 待付款
    PENDINGDELIVERED  = 2,   // 待发货
    PENDINGRECEIPT  = 3,   // 待收货
    PENDINGFINISH = 4     // 待完成     确认收货后7天算已完成   这个时间段内的订单可以申请退货
}

// 订单状态显示
export const OrderStatusShow = {
    [OrderStatus.FAILED]:'失败',
    [OrderStatus.PENDINGPAYMENT]:'待付款',
    [OrderStatus.PENDINGDELIVERED]:'待发货',
    [OrderStatus.PENDINGRECEIPT]:'待收货',
    [OrderStatus.PENDINGFINISH]:'待完成'
    
};
/**
 * 所有订单
 */
export class TotalOrder extends Widget {
    public props:any = {
        showTitleList:['订单编号','商品ID','商品名称','商品数量','商品SKU','商品规格','供货商ID','用户ID','姓名','手机号','地址信息','订单状态'],
        contentList:[],
        supplierList:['供应商id'],
        orderType:['失败','已下单未支付','已支付未发货','已发货未签收','已收货'],
        exportType:['未导出','已导出'],
        timeType:['下单时间','支付时间','收货时间','发货时间','完成时间'],
        active:0,
        supplierActive:0,
        orderTypeActive:0,
        exportActive:0,
        timeTypeActive:0,
        start:0,
        tail:0,
        inputOrderId:0,
        orderList:[],
        showDateBox:false,
        startTime:'',
        endTime:'',
        selectList:[]
    };

    public create() {
        // 切换到所有订单页时将所有供应商查询出来
        getAllSupplier().then((r) => {
            const supplier = JSON.parse(r);
            const arr = [];
            for (const v of supplier) {
                arr.push(v[0]);
            }
            this.props.supplierList = arr;
            this.paint();
        });
    }

    public selectClick(e:any) {
        this.props.selectList = e.selectList;
    }
    public async exportOrder(e:any) {
        const supplierId = Number(this.props.supplierList[this.props.supplierActive]);
        console.log(this.props.orderTypeActive);
        const exportList = [];
        const oidsSet = new Set();
        for (let i = 0;i < this.props.contentList.length;i++) {
            if (this.props.selectList[i]) {
                const content = this.props.contentList[i];
                exportList.push(content);
                oidsSet.add(content[0]);
            }
        }

        if (this.props.orderTypeActive === 2) {
            this.props.contentList = await getOrder(supplierId,2,[...oidsSet]);
        }
        const titleList = JSON.parse(JSON.stringify(this.props.showTitleList));
        titleList.push('物流单号');
        const aoa = [titleList];
        for (const v of exportList) {
            v[0] = v[0].toString();
            aoa.push(v);
        }
        console.log(aoa);
        exportExcel(aoa,`${this.props.orderType[this.props.orderTypeActive]}订单.xlsx`);
        
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
            alert('订单不存在');

            return;
        }
        getOrderById(orderId).then((r) => {
            console.log('r= ',r);
            if (!r) {
                alert('订单不存在');

                return;
            }
            const orderInfo = JSON.parse(r);
            const contentList = [];
            const temp = [];
            let orderState = '';
            if (orderInfo[0][7] === 0) {
                orderState = '失败';
            } else if (orderInfo[0][8] === 0) {
                orderState = '待付款';
            } else if (orderInfo[0][9] === 0) {
                orderState = '待发货';
            } else if (orderInfo[0][10] === 0) {
                orderState = '待收货';
            } else if (orderInfo[0][11] > 0) {
                orderState = '已完成';
            }
            temp.push(0,orderInfo[0][0],orderInfo[0][12],orderInfo[0][15],orderInfo[0][16],orderInfo[0][17],orderInfo[0][18],orderInfo[0][1],orderInfo[0][2],orderInfo[0][3],orderInfo[0][4],orderState);
            contentList.push(temp);
            this.props.contentList = contentList;
            this.paint();
        });
    }
    
    // 获取订单
    public showAllOrder(argsList:any) {
        const id = 0;// 订单id,等于0表示从最大开始获取，大于0表示从指定订单id开始获取
        const count = 10;// 需要获取的订单信息数量，即一页需要显示的数量
        const time_type = argsList[5];// 时间类型，1下单，2支付，3发货， 4收货，5完成
        const start = this.props.startTime;// 启始时间，单位毫秒
        const tail = this.props.endTime;// 结束时间，单位毫秒
        const sid = !Number(argsList[0]) ? 0 : Number(argsList[0]);// 供应商id，等于0表示所有供应商，大于0表示指定供应商
        const orderType = argsList[1];// 订单类型，0失败，1待支付，2待发货，3待收货，4待完成
        const state = argsList[2];// 订单状态，0未导出，1已导出

        return getAllOrder(id,count,time_type,start,tail,sid,orderType,state).then(ordersShow => {
            this.props.contentList = ordersShow;
            this.paint();
        });
    }
        // 根据供应商id筛选
    public filterSupplierId(e:any) {
        this.props.supplierActive = e.value;
        const supplierId = Number(this.props.supplierList[this.props.supplierActive]);
        const orderType = this.props.orderTypeActive;
        const exportType = this.props.exportActive;
        const start = this.props.start;
        const tail = this.props.tail;
        const timeType = this.props.timeTypeActive + 1;
        const argsList = [supplierId,orderType,exportType,start,tail,timeType];
        this.showAllOrder(argsList);
    }

        // 根据订单类型筛选
    public filterOrderType(e:any) {
        this.props.orderTypeActive = e.value;
        const supplierId = Number(this.props.supplierList[this.props.supplierActive]);
        const orderType = this.props.orderTypeActive;
        const exportType = this.props.exportActive;
        const start = this.props.start;
        const tail = this.props.tail;
        const timeType = this.props.timeTypeActive + 1;
        const argsList = [supplierId,orderType,exportType,start,tail,timeType];
        this.showAllOrder(argsList);
    }

        // 根据导出状态筛选,未导出，已导出
    public filterExportType(e:any) {
        this.props.exportActive = e.value;
        const supplierId = Number(this.props.supplierList[this.props.supplierActive]);
        const orderType = this.props.orderTypeActive;
        const exportType = this.props.exportActive;
        const start = this.props.start;
        const tail = this.props.tail;
        const timeType = this.props.timeTypeActive + 1;
        const argsList = [supplierId,orderType,exportType,start,tail,timeType];
        this.showAllOrder(argsList);
    }

        // 根据时间筛选
    public filterTimeType(e:any) {
        this.props.timeTypeActive = e.value;
        const supplierId = Number(this.props.supplierList[this.props.supplierActive]);
        const orderType = this.props.orderTypeActive;
        const exportType = this.props.exportActive;
        const start = this.props.start;
        const tail = this.props.tail;
        const timeType = this.props.timeTypeActive + 1;
        const argsList = [supplierId,orderType,exportType,start,tail,timeType];
        this.showAllOrder(argsList);
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
        this.paint();
    }

    public changeDateBox(e:any) {
        this.props.showDateBox = e.value;
        console.log(this.props.showDateBox);
        this.paint();
    }
}