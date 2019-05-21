import { getRealNode } from '../../../pi/widget/painter';
import { Widget } from '../../../pi/widget/widget';
import { getAllOrder, getAllSupplier, getOrder, getOrderById, importTransport } from '../../net/pull';
import { exportExcel, importRead } from '../../utils/tools';

/**
 * 所有订单
 */
export class TotalOrder extends Widget {
    public props:any = {
        showTitleList:['选择','订单编号','商品ID','商品名称','商品SKU','商品规格','供货商ID','用户ID','姓名','手机号','地址信息','订单状态'],
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
        orderList:[]
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
    public async exportOrder(e:any) {
        const supplierId = Number(this.props.supplierList[this.props.supplierActive]);
        console.log(this.props.orderTypeActive);
        if (this.props.orderTypeActive === 2) {
            await getOrder(supplierId,2).then((r) => {
                const data = JSON.parse(r);
                const arr = [];
                for (let i = 0;i < data.length;i++) {
                    let orderState = '';
                    if (data[i][13] === 0) {
                        orderState = '待付款';
                    } else if (data[i][14] === 0) {
                        orderState = '待发货';
                    } else if (data[i][15] === 0) {
                        orderState = '待收货';
                    } else if (data[i][16] > 0) {
                        orderState = '已完成';
                    }
                    arr.push([data[i][0],data[i][1],data[i][3][0][0],data[i][3][0][1],data[i][3][0][4],data[i][3][0][5],data[i][0],data[i][2],data[i][8],data[i][9],data[i][11],orderState]);
                }
                this.props.contentList = arr;
            });
        }
        const jsonHead = ['订单编号','商品ID','商品名称','商品SKU','商品规格','供货商ID','用户ID','姓名','手机号','地址信息','订单状态','物流单号'];
        const aoa = [jsonHead];
        const jsonData = this.props.contentList;
        for (let v of jsonData) {
            v = v.slice(1);
            v[0] = v[0].toString();
            aoa.push(v);
        }
        console.log(aoa);
        exportExcel(aoa,`${this.props.orderType[this.props.orderTypeActive]}订单.xlsx`);
        
        console.log('contentList ===',jsonData);
    }

    public importTransport(e:any) {
        // 导入运单
        const file = (<any>getRealNode(e.node)).files[0];
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
        const start = !argsList[3] ? 0 : argsList[3];// 启始时间，单位毫秒
        const tail = !argsList[4] ? 1758175602826 : argsList[4];// 结束时间，单位毫秒
        const sid = !Number(argsList[0]) ? 0 : Number(argsList[0]);// 供应商id，等于0表示所有供应商，大于0表示指定供应商
        const orderType = argsList[1];// 订单类型，0失败，1待支付，2待发货，3待收货，4待完成
        const state = argsList[2];// 订单状态，0未导出，1已导出

        return getAllOrder(id,count,time_type,start,tail,sid,orderType,state);
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
        this.showAllOrder(argsList).then((orderList) => {
            this.showOrderOnPage(orderList);
        });
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
        this.showAllOrder(argsList).then((orderList) => {
            this.showOrderOnPage(orderList);
        });
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
        this.showAllOrder(argsList).then((orderList) => {
            this.showOrderOnPage(orderList);
        });
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
        this.showAllOrder(argsList).then((orderList) => {
            this.showOrderOnPage(orderList);
        });
    }

        //  在页面显示订单
    public showOrderOnPage(orderList:any) {
        console.log('r= ',orderList);
        if (!orderList) {
            this.props.contentList = [];
            this.paint();
            alert('没有对应查询结果'); 

            return;
        }
        const orderInfo = JSON.parse(orderList);
        if (!orderInfo) {
            this.props.contentList = [];
            this.paint();

            return;
        }
        const contentList = [];
        for (let i = 0;i < orderInfo.length;i++) {
            const temp = [];
            let orderState = '';
            if (orderInfo[i][7] === 0) {
                orderState = '失败';
            } else if (orderInfo[i][8] === 0) {
                orderState = '待付款';
            } else if (orderInfo[i][9] === 0) {
                orderState = '待发货';
            } else if (orderInfo[i][10] === 0) {
                orderState = '待收货';
            } else if (orderInfo[i][11] > 0) {
                orderState = '已完成';
            }
            temp.push(0,orderInfo[i][0],orderInfo[i][12],orderInfo[i][15],orderInfo[i][16],orderInfo[i][17],orderInfo[i][18],orderInfo[i][1],orderInfo[i][2],orderInfo[i][3],orderInfo[i][5],orderState);
            contentList.push(temp);
            this.props.contentList = contentList;
            this.paint();
        }
    }
    public startTime(e:any) {
        // debugger;
        // this.props.start = e.value;
    }

    public inputValue(e:any) {
        this.props.inputOrderId = e.value;
        this.paint();
    }
}