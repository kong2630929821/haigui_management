// tslint:disable-next-line:missing-jsdoc
import { Widget } from '../../../pi/widget/widget';

interface Props {
    showDataTitle:any;// 标题
}
// tslint:disable-next-line:completed-docs
export class ClassSetting extends Widget {
    public props:Props = {
        showDataTitle:['一级分类','二级分类','最后一次调整时间','操作']
    };
}