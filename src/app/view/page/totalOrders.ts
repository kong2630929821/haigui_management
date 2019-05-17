import { getRealNode } from '../../../pi/widget/painter';
import { Widget } from '../../../pi/widget/widget';
import { getAllSupplier, getOrder, importSupplier, importTransport, selSupplier } from '../../net/pull';
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
    // 查询
    public search(e:any) {
        const supplierId = Number(getRealNode(e.node).parentNode.children[2].value);
        const orderType = getRealNode(e.node).parentNode.children[3].options.selectedIndex + 1;// 订单类型，1待支付、2待发货、3待收货、4待完成
        getOrder(supplierId,orderType).then((r) => {
            console.log('r= ',r);
            const orderInfo = JSON.parse(r);
            const contentList = [];
            let orderState = '';
            if (orderType === 1) {
                orderState = '待支付';
            } else if (orderType === 2) {
                orderState = '待发货';
            } else if (orderType === 3) {
                orderState = '待收货';
            } else if (orderType === 4) {
                orderState = '待完成';
            }
            for (let i = 0;i < orderInfo.length;i++) {
                const temp = [];
                temp.push(0,orderInfo[i][1],'商品ID','商品名称','商品SKU','商品规格',orderInfo[i][0],orderInfo[i][2],orderInfo[i][8],orderInfo[i][9],orderInfo[i][10],orderState);
                contentList.push(temp);
            }
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
        const supplierId = Number(dom.value);
        const orderType = 2; // 订单类型，1待支付、2待发货、3待收货、4待完成
        getOrder(supplierId,orderType);
    }
    
    // // 导入运单信息
    // public imTransport(e:any) {
    //     const dom = getRealNode(e.node);
    //     if (!dom.files) {
    //         return;
    //     }
    //     const f = dom.files[0];
    //     importRead(f,(res) => {
    //         importTransport(res);
    //     });
    // }
}