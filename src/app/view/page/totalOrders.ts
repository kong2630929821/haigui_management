import { getRealNode } from '../../../pi/widget/painter';
import { Widget } from '../../../pi/widget/widget';
import { getOrder, importSupplier, importTransport, selSupplier } from '../../net/pull';
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
        showTitleList:['选择','订单编号','商品ID','商品名称','商品SKU','商品规格','供货商ID','用户ID','姓名','手机号','地址信息','订单状态']
    };

    public exportOrder() {
        selSupplier().then((supplierId) => {// 获取所有有未发货订单的供应商
            console.log('supplierId',supplierId);

            return supplierId;
        }).then((supplierId) => {// 根据供应商id获取未发货的订单
            for (let i = 0;i < supplierId.length;i++) {
                getOrder(supplierId[i],2).then((jsonData) => {
                    const jsonHead = [
                        'id', 'uid',	'labels',	'origin',	 'tax',	'freight',	'other',	'name', 	'tel', 	'area',	'address',	'order_time',	'pay_time',	'ship_time'	,'receipt_time',	'finish_time','supplierId' ,'物流单号'
                    ];
                    jsonToExcelConvertor(jsonHead,jsonData,'未发货订单');
                });
            }

        });
    }

    public importTransport(e:any) {
        
        // 导入运单
        const file = getRealNode(e.node).files[0];
        importRead(file,(res) => {
            importTransport(res);
        });
        
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