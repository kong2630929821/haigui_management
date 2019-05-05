import { popNew } from '../../../pi/ui/root';
import { Widget } from '../../../pi/widget/widget';

/**
 * 我的现金
 */
export class MyCash extends Widget {
    public props:any;

    public goDetail() {
        popNew('app-view-member-cashList',{ list:[
            { name:'提现',time:'04-12 12:30',cash:'- 200.00' },
            { name:'提现',time:'04-12 12:30',cash:'- 100.00' },
            { name:'升级海宝',time:'04-12 12:30',cash:'+ 100.00' }
        ],
            hasTitle:true
        });
    }
}