import { popNew } from '../../../pi/ui/root';
import { Widget } from '../../../pi/widget/widget';
interface Props {
    list:any[];
}
/**
 * 所有列表页面
 */
export class  LogList extends Widget {
    public props:Props = {
        list:[
            { name:'微信名微信名',desc:'我的本月收益：315.00',tel:'13200013252' },
            { name:'微信名微信名',desc:'我的本月收益：315.00',tel:'13200013252' },
            { name:'微信名微信名',desc:'我的本月收益：315.00',tel:'13200013252' }
        ]
    };

    public goDetail(ind:number) {
        popNew('app-view-member-myCash');
    }
}