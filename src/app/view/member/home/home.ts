
import { popNew } from '../../../../pi/ui/root';
import { Widget } from '../../../../pi/widget/widget';
interface Props {
    userType:number;  // 用户会员等级 0 普通 1 海宝 2 海王
    powerList:any[]; // 权益列表
    tabList:any[];  // tab列表
    code:string;   // 邀请码
}
/**
 * 收益
 */
export class Home extends Widget {
    public props:Props = {
        userType:1,
        powerList:[
            { name:'免费试用装',img:'../../../res/image/income_active.png',tpl:'app-view-member-upgradeUser' },
            { name:'线下课程',img:'../../../res/image/income_active.png',tpl:'' },
            { name:'邀请返利',img:'../../../res/image/income_active.png',tpl:'' },
            { name:'新品预留',img:'../../../res/image/income_active.png',tpl:'' }
        ],
        tabList:[
            { amount:12,title:'我的海宝',fg:'baby' },
            { amount:12000,title:'现金总收益',fg:'cash' },
            { amount:10,title:'我的伙伴',fg:'friend' },
            { amount:100,title:'海贝总收益',fg:'shell' }
        ],
        code:'123456'
    };

    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
    }

    // 权益
    public itemClick(ind:number) {
        if (this.props.powerList[ind].tpl) {
            popNew(this.props.powerList[ind].tpl,{});
        }
    }

    // 当前用户的会员等级
    public goDetail() {
        popNew('app-view-member-powerDetail',{ userType:this.props.userType, code:this.props.code });
    }

    // 会员等级介绍
    public powerDetail(num:number) {
        popNew('app-view-member-powerDetail',{ userType:num });
    }

    // 收益标签
    public tabClick(num:number) {
        switch (num) {
            case 0: case 2:
                popNew('app-view-member-logList',this.props.tabList[num]);
                break;
            case 1: case 3:
                popNew('app-view-member-cashList',this.props.tabList[num]);
                break;
            default:
        }
    }

}