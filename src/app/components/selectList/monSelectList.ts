import { Widget } from '../../../pi/widget/widget';
interface Props {
    selected:number; // 选中的下标
    list:any[];
}
/**
 * 选择列表
 */
export class SelectList extends Widget {
    public cancel:() => void;
    public ok:(param:any) => void;
    public props:Props;

    public setProps(props:any) {
        super.setProps(props);
        this.props.list = [];
        console.log(props);
        const year = new Date().getFullYear();
        const mon = new Date().getMonth() + 1;
        for (let i = 0;i < 12;i++) {
            if (mon - i > 0) {
                this.props.list.push([year,mon - i]);
            } else {
                this.props.list.push([year - 1,mon - i + 12]);                
            }
        }
        console.log(this.props);
    }

    public select(num:number) {
        this.props.selected = num;
        this.paint();
        setTimeout(() => {
            this.ok && this.ok({ value:this.props.list[num],num:num });
        }, 200);
    }

    public close() {
        this.cancel && this.cancel();
    }
}