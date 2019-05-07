import { popNew } from '../../../pi/ui/root';
import { Widget } from '../../../pi/widget/widget';
interface Props {
    list:string[];  // 权益详情介绍
    userType:number;  // 用户会员等级 1 海宝 2 海王
    powerList:any[];  // 权益列表
    showType:string;  // 用户类型名称
    code:string;  // 邀请码
}
/**
 * 权益详情
 */
export class PowerDetail extends Widget {
    public props:Props;
   
    public setProps(props:any) {
        super.setProps(props);
        if (props.userType === 2) {
            this.props.list = this.config.value.hWangList;
            this.props.powerList = this.config.value.hBaoPower;
            this.props.showType = '海王';
        } else {
            this.props.list = this.config.value.hBaoList;
            this.props.powerList = this.config.value.hWangPower;
            this.props.showType = '海宝';
        }
        
    }

    // 升级会员等级
    public upgradeUser() {
        popNew('app-view-member-modalBoxInput');
    }
}