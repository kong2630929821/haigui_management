import { getRealNode } from '../../../pi/widget/painter';
import { Widget } from '../../../pi/widget/widget';
import { getAllSupplier, getOrder, getOrderById, importTransport } from '../../net/pull';
import { importRead, jsonToExcelConvertor } from '../../utils/tools';

/**
 * 所有订单
 */
export class VipManage extends Widget {
    public props:any = {
        showDataList:[
            ['运费信息','2019-5-15 13:15'],
            ['分类信息','2019-5-15 13:15'],
            ['商品信息','2019-5-15 13:15'],
            ['供应商信息','2019-5-15 13:15'],
            ['地区信息','2019-5-15 13:15'],
            ['品牌信息','2019-5-15 13:15'],
            ['库存信息','2019-5-15 13:15']
        ],
        showTitleList:['选择','订单编号','商品ID','商品名称','商品SKU','商品规格','供货商ID','用户ID','姓名','手机号','地址信息','订单状态'],
        contentList:[],
        supplierList:['供应商id'],
        orderType:['已下单未支付','已支付未发货','已发货未签收','已收货']
    };

    public exportOrder(e:any) {
        // 获取一个供应商id
        const dom = getRealNode(e.node).parentNode.children[2];
        const supplierId = dom.value;
        if (supplierId === '供应商id') {
            alert('请选择供应商');

            return;
        }
        // 根据供应商id获取未发货的订单
        getOrder(Number(supplierId),2).then((jsonData) => {
            console.log('jsonData=',jsonData);
            const jsonHead = [
                'supplierId','id', 'uid',	'labels',	'origin',	 'tax',	'freight',	'other',	'name', 	'tel', 	'area',	'address',	'order_time',	'pay_time',	'ship_time'	,'receipt_time',	'finish_time' ,'物流单号'
            ];
            jsonToExcelConvertor(jsonHead,jsonData,'未发货订单');
        });
    }

    public importTransport(e:any) {
        // 导入运单
        const file = getRealNode(e.node).files[0];
        importRead(file,(res) => {
            importTransport(res);
        });
    }
    // 按订单id查询
    public searchById(e:any) {
        const orderId = Number(getRealNode(e.node).parentNode.children[1].value);
        getOrderById(orderId).then((r) => {
            console.log('r= ',r);
            const orderInfo = JSON.parse(r);
            const contentList = [];
            const temp = [];
            let orderState = '';
            if (orderInfo[0][7] === 0) {
                orderState = '待付款';
            } else if (orderInfo[0][8] === 0) {
                orderState = '待发货';
            } else if (orderInfo[0][9] === 0) {
                orderState = '待收货';
            } else if (orderInfo[0][11] === 0) {
                orderState = '已完成';
            }
            temp.push(0,orderInfo[0][0],orderInfo[0][12],orderInfo[0][15],orderInfo[0][16],orderInfo[0][17],orderInfo[0][18],orderInfo[0][1],orderInfo[0][2],orderInfo[0][3],orderInfo[0][4],orderState);
            contentList.push(temp);
            this.props.contentList = contentList;
            this.paint();
        });
    }
    public test() {
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
    // 显示某供应商指定类型订单
    public showOrder(e:any) {
        const dom = getRealNode(e.node);
        const orderType = dom.parentNode.children[3].options.selectedIndex + 1;
        const supplierId = Number(dom.parentNode.children[2].value);
        getOrder(supplierId,orderType).then((r) => {
            console.log('r= ',r);
            if (!r) return Promise.reject('！！！请求接口错误');
            
            return JSON.parse(r);// 根据供应商和订单类型筛选得到订单id数组
        }).then((r) => {
            for (let i = 0;i < r.length;i++) {
                const orderId = r[i][1];
                getOrderById(orderId).then((r) => { // 根据id把订单查询出来并显示
                    console.log('r= ',r);
                    const orderInfo = JSON.parse(r);
                    const contentList = [];
                    for (let i = 0;i < orderInfo.length;i++) {
                        let orderState = '';
                        if (orderInfo[i][11] === 0) {
                            orderState = '待付款';
                        } else if (orderInfo[i][12] === 0) {
                            orderState = '待发货';
                        } else if (orderInfo[i][13] === 0) {
                            orderState = '待收货';
                        } else if (orderInfo[i][15] === 0) {
                            orderState = '已完成';
                        }
                        const temp = [];
                        temp.push(0,orderInfo[0][0],orderInfo[0][12],orderInfo[0][15],orderInfo[0][16],orderInfo[0][17],orderInfo[0][18],orderInfo[0][1],orderInfo[0][2],orderInfo[0][3],orderInfo[0][4],orderState);
                        contentList.push(temp);
                    }
                    this.props.contentList = contentList;
                    this.paint();
                });
            }
        }).catch((e) => {console.log(e);});
    }
}