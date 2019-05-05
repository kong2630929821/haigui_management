import { Widget } from '../../../pi/widget/widget';
interface Props {
    list:any[];
    hasTitle:boolean;  // 是否含有头部
}
/**
 * 所有列表页面
 */
export class  LogList extends Widget {
    public props:Props = {
        list:[
            { name:'提现',time:'04-12 12:30',cash:'- 200.00' },
            { name:'提现',time:'04-12 12:30',cash:'- 100.00' },
            { name:'升级海宝',time:'04-12 12:30',cash:'+ 100.00' }
        ],
        hasTitle:true
    };
}