
import { popNew } from '../../../../pi/ui/root';
import { Widget } from '../../../../pi/widget/widget';
interface Props {
    userType:number;  // 用户会员等级 0 普通 1 海宝 2 海王
    powerList:any[]; // 权益列表
    tabList:any[];  // tab列表
}
/**
 * 收益
 */
export class Home extends Widget {
    public props:Props = {
        userType:1,
        powerList:[
            { name:'免费试用装',img:'../../../res/image/chat.png',tpl:'app-view-member-logList' },
            { name:'线下课程',img:'../../../res/image/chat.png',tpl:'' },
            { name:'邀请返利',img:'../../../res/image/chat.png',tpl:'' },
            { name:'新品预留',img:'../../../res/image/chat.png',tpl:'' }
        ],
        tabList:[
            { amount:12,total:'我的海宝' },
            { amount:12000,total:'现金总收益' },
            { amount:10,total:'我的伙伴' },
            { amount:100,total:'海贝总收益' }
        ]
    };

    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
    }

    public itemClick(ind:number) {
        if (this.props.powerList[ind].tpl) {
            popNew(this.props.powerList[ind].tpl);
        }
    }
}