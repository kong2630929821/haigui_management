import { Forelet } from '../../../../pi/widget/forelet';
import { Widget } from '../../../../pi/widget/widget';
import { Level1Groups, register } from '../../../store/memstore';

export const forelet = new Forelet();

/**
 * 商城首页
 */
export class MallHome extends Widget {
    public state:any;
    public create() {
        super.create();
        this.state = STATE;
    }
}
const STATE = {
    groups:new Map<number, Level1Groups>(),
    filtersGroups:[]
};
register('mall/groups',(groups:Map<number, Level1Groups>) => {
    console.log('mall groups =',groups);
    const filtersGroups = [];
    groups.forEach(value => {
        if (value.location === 1) filtersGroups.push(value);
    });
    STATE.groups = groups;
    STATE.filtersGroups = filtersGroups;
    forelet.paint(STATE);
});