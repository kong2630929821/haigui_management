import { Widget } from '../../../pi/widget/widget';

interface Props {
    isEdit:boolean;  // 是否正在编辑
    activeTab:number;  // 活跃tab
    showEdit:boolean;  // 显示编辑页面
}

/**
 * 商城配置
 */
export class MallSetting extends Widget {
    public props:Props = {
        isEdit:true,
        activeTab:0,
        showEdit:true
    };

    public closeEdit() {
        this.props.showEdit = false;
        this.paint();
    }

    public goEdit() {
        this.props.showEdit = true;
        this.paint();
    }
}