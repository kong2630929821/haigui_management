import { popNew } from '../../../pi/ui/root';
import { bindVipUser, getHbaoGoodsList } from '../../net/pull';
import { getStore } from '../../store/memstore';
import { popNewMessage } from '../../utils/logic';
import { CommodityLibrary } from './commodityLibrary';

/**
 * 399商品绑定商户
 */
export class HBaoGoodsSetting extends CommodityLibrary {
    public state:any = getStore('hBaoGoods',[]);
    public create() {
        super.create();
        this.props.showDateTitle = ['规格','SKU','价格（成本/普通价/会员价）','实际差价','库存','供应商（ID）','供应商SKU','供应商商品ID','绑定状态'];
    }
    // 绑定用户
    public bindUser(e:any) {
        popNew('app-components-modalBoxInput',{ title:`将商品“<span style="color:#1991EB">${e.value.name}</span>”会员关系绑定到`,placeHolder:'输入邀请码' },(r) => {
            bindVipUser(e.value.id, r).then(r => {
                popNewMessage('绑定用户成功');
                getHbaoGoodsList().then(res => {  // 重新获取所有399商品
                    this.state = res;
                    this.paint();
                }); 
            });
        });
    }

}
