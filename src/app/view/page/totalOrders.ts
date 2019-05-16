import { Widget } from '../../../pi/widget/widget';
import { getOrder } from '../../net/pull';

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

    public search() {
        
        console.log('132');
        getOrder(1011001,1);
        getOrder(1011001,2);
        getOrder(1011001,3);
        getOrder(1011001,4);
        // 得到订单
        
    }
    
}