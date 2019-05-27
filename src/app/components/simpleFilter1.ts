/**
 * 简单选择框
 */

// ================================================ 导入
import { notify } from '../../pi/widget/event';
import { Widget } from '../../pi/widget/widget';

// ================================================ 导出
interface Props {
    options:Option[];// 选项
    expand:boolean;// 是否展开所有选项 
    activeIndex:number;   // 当前选择的数组下标
}

interface Option {
    status:number;
    text:string;
}

// tslint:disable-next-line:completed-docs
export class SimpleFilter1 extends Widget {
    public props:Props = {
        options:[],
        expand:false,
        activeIndex:0
    };
    
    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        console.log('SimpleFilter1 ===',this.props);
    }

    // 切换展示隐藏
    public change(e:any) {
        this.props.expand = !this.props.expand;
        this.paint();
    }

    // 选择选项
    public select(e:any,num:number,status:number) {
        this.props.activeIndex = num;
        this.props.expand = false;
        notify(e.node,'ev-selected',{ activeIndex:num });
        this.paint();
    }

}

// ================================================ 本地
