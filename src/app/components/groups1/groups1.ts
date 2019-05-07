import { notify } from '../../../pi/widget/event';
import { Widget } from '../../../pi/widget/widget';
import { Level1Groups } from '../../store/memstore';

interface Props {
    list:Level1Groups[];   // 展示的分组列表1
}

/**
 * 首页显示分组样式1
 */
export class GroupsOne extends Widget {
    // tslint:disable-next-line:no-unnecessary-override
    public setProps(props:Props,oldProps:Props) {
        super.setProps(props,oldProps);
        // console.log('GroupsOne ----------------',props);
    }

    public clickItem(e:any,index:number) {
        notify(e.node,'ev-click-groups-one',this.props.list[index].id); 
    }
}