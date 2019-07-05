// tslint:disable-next-line:missing-jsdoc
import { Widget } from '../../../pi/widget/widget';
import { mallImagPre } from '../../config';
import { getGroup } from '../../net/pull';
import { deepCopy } from '../../../pi/util/util';

interface Props {
    showDataTitle:any;// 标题
    showDataList:any;// 数据
    style:number;// 状态 0分类设置列表  1添加分类 2编辑分类
    num:any;// [一级分类个数，2级分类个数]
    mallImagPre:string;// 图片路径
    currentData:any;// 当前编辑的数据
}
/**
 * 分类设置
 */
// tslint:disable-next-line:completed-docs
export class ClassSetting extends Widget {
    public props:Props = {
        showDataTitle:['一级分类','二级分类','最后一次调整时间','操作'],
        showDataList:[],
        style:0,
        num:[0,0],
        mallImagPre:mallImagPre,
        currentData:[]
    };
    public create() {
        super.create();
        this.init();
    }
    public init() {
        getGroup(1).then(r => {// 1 全部分类 1一级  2二级
            this.props.showDataList = r[2];// 第0项原始数据 1项处理后的数据
            this.props.num = [r[0],r[1]];
            this.paint();
            console.log(r);
        });
    }
    // 改变当前分类
    public changeRow(index:number) {
        this.props.style = 2;
        this.props.currentData = deepCopy(this.props.showDataList[index]);
        this.paint();
    }
}