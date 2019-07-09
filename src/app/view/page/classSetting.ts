// tslint:disable-next-line:missing-jsdoc
import { deepCopy } from '../../../pi/util/util';
import { Widget } from '../../../pi/widget/widget';
import { GroupsLocation, mallImagPre } from '../../config';
import { getGroupsByLocation } from '../../net/pull';
import { parseGroups } from '../../utils/tools';

interface Props {
    datas:any;  // 原始数据
    showDataTitle:any;// 标题
    showDataList:any;// 数据
    num:any;// [一级分类个数，2级分类个数]
    mallImagPre:string;// 图片路径
    currentData:any;// 当前编辑的数据
    active:number;  // 当前展示的分组位置  0 商城首页 1 分类汇总
    showEdit:boolean;  // 显示编辑页面
}
/**
 * 分类设置
 */
// tslint:disable-next-line:completed-docs
export class ClassSetting extends Widget {
    public props:Props = {
        datas:[],
        showDataTitle:['一级分类','二级分类','最后一次调整时间','操作'],
        showDataList:[],
        num:[0,0],
        mallImagPre:mallImagPre,
        currentData:{
            name:'',
            children:[]
        },
        active:1,
        showEdit:false
    };
    public create() {
        super.create();
        this.init();
    }
    public init() {
        getGroupsByLocation().then(res => {
            this.props.datas = res.groupInfo;
            this.props.datas.forEach(r => {
                if (r[0] === GroupsLocation.CLASSIFICATION) {
                    const val = parseGroups(r[6]);
                    this.props.showDataList = val[2];
                    this.props.num = [val[0],val[1]];
                }
            });
            this.paint();
            console.log(this.props.showDataList);
        });
    }

    public closeEdit() {
        this.props.showEdit = false;
        this.props.currentData = {
            name:'',
            children:[]
        };
        this.paint();
    }

    // 编辑当前分类
    public goEdit(index:number) {
        this.props.showEdit = true;
        if (index > -1) {
            this.props.currentData = deepCopy(this.props.showDataList[index]);
        }
        this.paint();
    }

    public changeLocation(e:any) {
        this.props.active = e.value;
        if (e.value === 1) {   // 返回分类汇总页
            this.props.datas.forEach(r => {
                if (r[0] === GroupsLocation.CLASSIFICATION) {
                    const val = parseGroups(r[6]);
                    this.props.showDataList = val[2];
                    this.props.num = [val[0],val[1]];
                }
            });
        } else {   // 返回商城首页所有分类
            this.props.showDataList = [];
            this.props.num = [0,0];
            this.props.datas.forEach(r => {
                if (r[0] !== GroupsLocation.CLASSIFICATION) {
                    const val = parseGroups(r[6]);
                    this.props.showDataList = this.props.showDataList.concat(val[2]);
                    this.props.num[0] += val[0];
                    this.props.num[1] += val[1];
                }
                
            });
        }
        console.log(this.props.showDataList);
        this.paint();
    }
}