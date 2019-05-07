import { popNew } from '../../../pi/ui/root';
import { Forelet } from '../../../pi/widget/forelet';
import { Widget } from '../../../pi/widget/widget';
interface Props {
    list:any[];
    title:string;  // 标题
    amount:number;  // 总数
}
export const foelet = new Forelet();
/**
 * 所有列表页面
 */
export class  LogList extends Widget {
    public props:Props = {
        list:[
            { name:'微信名微信名',desc:'我的本月收益：315.00',tel:'13200013252' },
            { name:'微信名微信名',desc:'我的本月收益：315.00',tel:'13200013252' },
            { name:'微信名微信名',desc:'我的本月收益：315.00',tel:'13200013252' }
        ],
        title:'======',
        amount:0
    };

    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        if (props.fg === 'baby') {
            console.log(props);
        }
    }
    
    public goDetail(ind:number) {
        popNew('app-view-member-logDetail');
    }
}