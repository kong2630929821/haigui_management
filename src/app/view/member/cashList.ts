import { popNew } from '../../../pi/ui/root';
import { Widget } from '../../../pi/widget/widget';
interface Props {
    list:any[];
    title:string;  // 头部标题
    amount:number;  // 总数
    select:any;  // 选中的年月
}
/**
 * 所有列表页面
 */
export class  LogList extends Widget {
    public props:Props = {
        list:[
            { name:'提现',time:'04-12 12:30',cash:'-200.00' },
            { name:'提现',time:'04-12 12:30',cash:'-100.00' },
            { name:'升级海宝',time:'04-12 12:30',cash:'+100.00' }
        ],
        title:'======',
        amount:0,
        select:{ 
            num: -1,
            value: [new Date().getFullYear(), new Date().getMonth() + 1]
        }
    };

    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        if (props.fg === 'cash') {
            console.log(props);
        }
    }

    public selectMon() {
        popNew('app-components-selectList-monSelectList',{ selected:this.props.select.num },(r) => {
            this.props.select = r;
            this.paint();
        });
    }
}