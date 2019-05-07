import { Forelet } from '../../../../pi/widget/forelet';
import { Widget } from '../../../../pi/widget/widget';
import { Level1Groups, register } from '../../../store/memstore';

export const forelet = new Forelet();

interface Props {
    isActive:boolean;
    activeIndex:number;
}
/**
 * 分类首页
 */
export class GroupsHome extends Widget {
    public state:any;
    public props:any;
    public create() {
        super.create();
        this.state = STATE;
    }
    public setProps(props:Props,oldProps:Props) {
        this.props = {
            ...props,
            activeIndex:0
        };
        super.setProps(this.props);
    }

    // 一级分组点击
    public clickLevel1Item(e:any,index:number) {
        console.log('clickLevel1Item  ======',index);
        this.props.activeIndex = index;
        this.paint();
    }

    // 二级分组点击
    public clickLevel2Item(e:any,index:number) {
        console.log('clickLevel2Item  ======',index);
    }
}

const STATE = {
    groups:new Map<number, Level1Groups>(),     // 所有分组信息 
    groupsArray:[]                           // 所有分组信息（数组格式）
};
// 分组信息监听
register('mall/groups',(groups:Map<number, Level1Groups>) => {   
    const groupsArray = [...groups];

    STATE.groups = groups;
    STATE.groupsArray = groupsArray;
    forelet.paint(STATE);
});