import { Widget } from '../../../pi/widget/widget';

/**
 * 提现
 */
export class Withdraw extends Widget {
    public props:any = {
        showDataList:[
            ['123456','￥500.00','现金','2017-12-25 14:35','申请中'],
            ['123456','￥500.00','现金','2017-12-25 14:35','申请中'],
            ['123456','￥500.00','现金','2017-12-25 14:35','申请中'],
            ['123456','￥500.00','现金','2017-12-25 14:35','申请中'],
            ['123456','￥500.00','现金','2017-12-25 14:35','申请中']
        ],
        showTitleList:['用户ID','提现金额','支付方式','提交时间','受理状态'],
        activeTab:0
    };

    public changeTab(num:number) {
        this.props.activeTab = num;
        this.paint();
    }

    public dealWith(e:any) {
        console.log(e.fg);
    }
}