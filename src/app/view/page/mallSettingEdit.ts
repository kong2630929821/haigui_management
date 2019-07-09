import { notify } from '../../../pi/widget/event';
import { Widget } from '../../../pi/widget/widget';

interface Props {
    isEdit:boolean;  // 是否正在编辑
    activeTab:number;  // 活跃tab
    showEdit:boolean;  // 显示编辑页面
}

/**
 * 商城配置编辑详情
 */
export class MallSettingEdit extends Widget {
    public props:Props = {
        isEdit:true,
        activeTab:0,
        showEdit:true
    };

    public goBack(e:any) {
        notify(e.node,'ev-detail-back',{});
    }
}