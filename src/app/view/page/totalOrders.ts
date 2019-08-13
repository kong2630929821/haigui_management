import { popNew } from '../../../pi/ui/root';
import { Widget } from '../../../pi/widget/widget';
import { perPage } from '../../components/pagination';
import { orderMaxCount } from '../../config';
import { getAllOrder, getAllSupplier, getOrder, getOrderById, getOrderKey, importTransport, quitOrder } from '../../net/pull';
import { getStore } from '../../store/memstore';
import { dateToString, popNewMessage, timeConvert, transitTimeStamp } from '../../utils/logic';
import { exportExcel, importRead, rippleShow } from '../../utils/tools';
import { RightsGroups } from '../base/home';
// [商品id,商品名称,购买时价格,数量,skuId,sku名,商品类型,成本价，售价，会员价，【一级分组，二级分组】，【退货地址，姓名，电话】，【供应商SKU，供应商商品ID，保质期，最近修改时间】]
export type GoodsDetails = [number,string,number,number,string,string,number,number,number,number,
    [[number,string][],[number,string][]],   // 【一级分组，二级分组】
    [string,string,string],  // 【退货地址，姓名，电话】
    [number,number,any,number],   // 【供应商SKU，供应商商品ID，保质期，最近修改时间】
    number// 供货价
]; 

// 返利用户id，返利用户昵称，返利类型，返利金额，返利时间
export type RebateInfo = [number,string,number,number,number]; 

// [供应商id,订单id,用户id,商品详细信息,商品原支付金额,商品税费,商品运费,其它费用,收件人姓名,收件人电话,收件人地区,收件人详细地址,下单时间,支付时间,发货时间,收货时间,完成时间,运单号,'订单总金额','微信支付单号','姓名','身份证号',微信名，用户等级，用户标签，返利信息]
export type Order = [number,number,number,GoodsDetails[],number,number,number,number,string,string,number,string,number,number,number,number,number,string,number,string,string,string,string,number,number,RebateInfo[]];

// ['订单编号','商品ID','商品名称','商品数量','商品SKU','商品规格','供货商ID','下单时间','用户ID','姓名','手机号','地址信息','订单状态','订单总金额','微信支付单号','姓名','身份证号','金额','商品类型','运费','运单号','供货价','成本价']
export type OrderShow = [number,number,string,number,string,string,number,string,number,string,string,string,string,string,string,string,string,string,string,string,string,string,string];

// 订单类型
export enum OrderStatus {
    FAILED = 0,           // 失败
    PENDINGPAYMENT = 1,   // 待付款
    PENDINGDELIVERED  = 2,   // 待发货
    PENDINGRECEIPT  = 3,   // 待收货
    PENDINGFINISH = 4,     // 待完成     确认收货后7天算已完成   这个时间段内的订单可以申请退货
    FINISHED = 5,    // 已完成  已过7天 
    ALL = 6 ,              // 全部
    CANCEL= 7// 已取消
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
    [OrderStatus.FINISHED]:'已完成',
    [OrderStatus.CANCEL]:'已取消'
};

/**
 * 所有订单
 */
export class TotalOrder extends Widget {
    public props:any = {
        showTitleList:['订单编号','商品ID','商品名称','商品数量','商品SKU','商品规格','供货商ID','下单时间','用户ID','收货人','手机号','地址信息','订单状态','订单总金额','微信支付单号','姓名','身份证号','金额','商品类型','运费','物流单号','供货价','成本价'],
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
        expandIndex:[false,false,false,false,false],        // 触发下拉列表 
        showDetail:-1,    // 查看详情数据下标
        perPage:perPage[0],// 每页多少条数据
        perPageIndex:0,// 每页多少个的下标
        auth:getStore('flags/auth')// 权限组
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
        },{
            status:OrderStatus.CANCEL,
            text:'已取消'
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
        const oData = new Date();
        const time = oData.setHours(23, 59, 59, 999);
        this.props.endTime =  timeConvert(time);
        this.init();
    }

    public init() {
// 切换到所有订单页时将所有供应商查询出来
        getAllSupplier().then((r) => {
            const supplier = JSON.parse(r);
            const arr = [];    // 代表所有供应商
            for (const v of supplier) {
                arr.push(v[0]);
            }
            this.props.supplierList = arr;
            this.paint();
            this.pageChangeQuery(1);
        });
        if (this.props.auth[0] !== 0 && this.props.auth.indexOf(RightsGroups.finance) === -1) {
            this.props.showTitleList.pop();
        }
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
            // titleList.push('物流单号');
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
    public async exportAllOrder(e:any) {
        this.closeClick();
        const time_type = this.props.timeType[this.props.timeTypeActiveIndex].status; // 时间类型，1下单，2支付，3发货， 4收货，5完成
        const start = transitTimeStamp(this.props.startTime);     // 启始时间，单位毫秒
        const tail = transitTimeStamp(this.props.endTime);         // 结束时间，单位毫秒
        let sid = Number(this.props.supplierList[this.props.supplierActiveIndex]);        
        sid = isNaN(sid) ? 0 : sid;                   // 供应商id，等于0表示所有供应商，大于0表示指定供应商
        const orderType = this.props.orderType[this.props.orderTypeActiveIndex].status ;  // 订单类型，0失败，1待支付，2待发货，3待收货，4待完成
        const state = this.props.orderState[this.props.orderStateActiveIndex].status;    // 订单状态，0未导出，1已导出
        let exportList = [];
        await getAllOrder(0,this.props.totalCount,time_type,start,tail,sid,orderType,state).then(([orders,ordersShow]) => {
            // this.updateOrderTitle(orderType);
            // this.props.contentShowList = ordersShow;
            // this.props.contentList = orders;
            // this.paint();
            exportList  = ordersShow;
            if (this.props.auth[0] !== 0 && this.props.auth.indexOf(RightsGroups.finance) === -1) {
                exportList.forEach((v,i) => {
                    v.pop();
                });
            }
           
        });
        const supplierId = Number(this.props.supplierList[this.props.supplierActiveIndex]);
        const status = this.props.orderType[this.props.orderTypeActiveIndex].status;
       
        if (exportList.length === 0) {
            popNewMessage('请选择要导出的订单');

            return;
        }
        this.updateOrderTitle(status);
        const titleList = JSON.parse(JSON.stringify(this.props.showTitleList));
        if (status === OrderStatus.PENDINGDELIVERED) {
            this.props.contentShowList = await getOrder(supplierId,2,[]);
            // titleList.push('物流单号');
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
        this.closeClick();
        // 导入运单
        const file = e.file;
        importRead(file,(res) => {
            importTransport(res);
        });
    }
    // 按订单id查询
    public searchById(e:any) {
        this.closeClick();
        const orderId = this.props.inputOrderId;
        if (!orderId) {

            const index = this.props.currentPageIndex * this.props.perPage;
            this.pageChangeQuery(index === 0 ? 1 :index);
            // this.filterOrderQuery(1);

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
            if (this.props.auth[0] !== 0 && this.props.auth.indexOf(RightsGroups.finance) === -1) {
                this.props.contentShowList.forEach((v,i) => {
                    v.pop();
                });
            }
            this.paint();
        });
    }
    
    // 获取订单
    public filterOrderQuery(id:number = 0) {
        const time_type = this.props.timeType[this.props.timeTypeActiveIndex].status; // 时间类型，1下单，2支付，3发货， 4收货，5完成
        const start = transitTimeStamp(this.props.startTime);     // 启始时间，单位毫秒
        const tail = transitTimeStamp(this.props.endTime);         // 结束时间，单位毫秒
        let sid = Number(this.props.supplierList[this.props.supplierActiveIndex]);        
        sid = isNaN(sid) ? 0 : sid;                   // 供应商id，等于0表示所有供应商，大于0表示指定供应商
        const orderType = this.props.orderType[this.props.orderTypeActiveIndex].status ;  // 订单类型，0失败，1待支付，2待发货，3待收货，4待完成
        const state = this.props.orderState[this.props.orderStateActiveIndex].status;    // 订单状态，0未导出，1已导出

        return getAllOrder(id,this.props.perPage,time_type,start,tail,sid,orderType,state).then(([orders,ordersShow]) => {
        
            this.updateOrderTitle(orderType);
            this.props.contentShowList = ordersShow;
            this.props.contentList = orders;
            if (this.props.auth[0] !== 0 && this.props.auth.indexOf(RightsGroups.finance) === -1) {
                this.props.contentShowList.forEach((v,i) => {
                    v.pop();
                });
            }
            this.paint();
        });
        
    }

    // 初始化数据
    public pageChangeQuery(index:number) {
        // const count = this.props.currentPageIndex * this.props.perPage ? this.props.currentPageIndex * this.props.perPage :1;          // 需要获取的订单信息数量，即一页需要显示的数量
        const time_type = this.props.timeType[this.props.timeTypeActiveIndex].status; // 时间类型，1下单，2支付，3发货， 4收货，5完成
        const start = transitTimeStamp(this.props.startTime);     // 启始时间，单位毫秒
        const tail = transitTimeStamp(this.props.endTime);         // 结束时间，单位毫秒
        let sid = Number(this.props.supplierList[this.props.supplierActiveIndex]);        
        sid = isNaN(sid) ? 0 : sid;                   // 供应商id，等于0表示所有供应商，大于0表示指定供应商
        const orderType = this.props.orderType[this.props.orderTypeActiveIndex].status ;  // 订单类型，0失败，1待支付，2待发货，3待收货，4待完成
        const state = this.props.orderState[this.props.orderStateActiveIndex].status;    // 订单状态，0未导出，1已导出
        // 获取某页的第一条数据的ID
        getOrderKey(index,time_type,start,tail,sid,orderType,state).then(([orders,totalCount]) => {
            this.props.totalCount = totalCount;
            const data = orders[0];
            //
            getAllOrder(index === 1 ? 0 :data[0],this.props.perPage,time_type,start,tail,sid,orderType,state).then(([orders,ordersShow]) => {
                this.updateOrderTitle(orderType);
                this.props.contentShowList = ordersShow;
                this.props.contentList = orders;
                if (this.props.auth[0] !== 0 && this.props.auth.indexOf(RightsGroups.finance) === -1) {
                    this.props.contentShowList.forEach((v,i) => {
                        v.pop();
                    });
                }
                this.paint();
            });
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
        this.props.expandIndex[1] = false;
        this.props.supplierActiveIndex = e.value;
        this.props.currentPageIndex = 0;
        this.props.forceUpdate = !this.props.forceUpdate;
        this.props.totalCount = 0;
        this.pageChangeQuery(1);
    }

        // 根据订单类型筛选
    public filterOrderType(e:any) {
        this.props.expandIndex[2] = false;
        this.props.orderTypeActiveIndex = e.activeIndex;
        this.props.currentPageIndex = 0;
        this.props.forceUpdate = !this.props.forceUpdate;
        this.props.totalCount = 0;
        
        this.pageChangeQuery(1);
    }

        // 根据导出状态筛选,未导出，已导出
    public filterExportType(e:any) {
        this.props.expandIndex = false;
        this.props.orderStateActiveIndex = e.activeIndex;
        this.props.currentPageIndex = 0;
        this.props.forceUpdate = !this.props.forceUpdate;
        this.props.totalCount = 0;
        
        this.pageChangeQuery(1);
    }

        // 根据时间筛选
    public filterTimeType(e:any) {
        this.props.expandIndex[0] = false;
        this.props.timeTypeActiveIndex = e.activeIndex;
        this.props.currentPageIndex = 0;
        this.props.forceUpdate = !this.props.forceUpdate;
        this.props.totalCount = 0;
      
        this.pageChangeQuery(1);
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
        this.props.expandIndex = [false,false,false,false,false];
        this.paint();
    }

    public changeDateBox(e:any) {
        this.closeClick();
        this.props.showDateBox = e.value;
        console.log(this.props.showDateBox);
        this.paint();
    }

    public pageChange(e:any) {
        this.closeClick();
        this.props.currentPageIndex = e.value;
        const index = (e.value) * this.props.perPage;
        this.pageChangeQuery(index === 0 ? 1 :index);
        this.paint();
        
    }

    // 取消订单
    public quitOrder(e:any) {
        this.closeClick();
        const orderId = this.props.contentShowList[e.value][0];
        const currentPageId = this.props.contentShowList[0][0];
        // popNew('app-components-confirmQuitOrder',{},() => {
        //     quitOrder(orderId).then(r => {
        //         this.filterOrderQuery(currentPageId);
        //     });
        // });
        popNew('app-components-modalBoxInput',{ title:`确认取消编号为“<span style="color:#1991EB">${orderId}</span>”的订单`,placeHolder:'请输入取消理由', errMessage:'请输入取消理由' },async (r) => {
            if (!r) {
                popNewMessage('请输入取消理由！');
            } else {
                await quitOrder(orderId, r).then(r => { // 拒绝
                    if (r.result === 1) {
                        popNewMessage('处理完成');
                    } else {
                        popNewMessage('处理失败');
                    }
                }).catch(e => {
                    popNewMessage('处理失败');
                });
                this.filterOrderQuery(currentPageId);
            }  
        });
    }

    // 查看详情
    public goDetail(e:any) {
        this.closeClick();
        this.props.showDetail = this.props.contentList.findIndex(r => r[1] === e.value[0]);
        this.paint();
    }

    // 从详情页返回
    public detailBack() {
        this.props.showDetail = -1;
        this.paint();
    }

        // 每页展示多少数据
    public perPage(e:any) {
        this.closeClick();
        this.props.perPage = e.value;
        this.props.perPageIndex = e.index;
        this.props.expandIndex[4] = false;
        if (this.props.inputOrderId) {
            this.searchById(e);
        } else {
            this.pageChange({ value:0 });
        }
            
    }

    // 过滤器
    public expand(index:number,e:any) {
        this.closeClick();
        this.props.expandIndex[index] = e.value;
        this.paint();
    }

    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }
}