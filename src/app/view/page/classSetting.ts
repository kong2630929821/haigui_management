// tslint:disable-next-line:missing-jsdoc
import { deepCopy } from '../../../pi/util/util';
import { Widget } from '../../../pi/widget/widget';
import { GroupsLocation, mallImagPre } from '../../config';
import { getGroupsByLocation } from '../../net/pull';
import { getStore, GroupInfo } from '../../store/memstore';
import { parseAllGroups } from '../../utils/tools';

interface Props {
    datas:any;  // 原始数据
    showDataTitle:any;// 标题
    showDataList:any;// 数据
    num:any;// [一级分类个数，2级分类个数]
    mallImagPre:string;// 图片路径
    currentData:GroupInfo;// 当前编辑的数据
    active:number;  // 当前展示的分组位置  0 商城首页 1 分类汇总
    showEdit:boolean;  // 显示编辑页面
    addNewClass:boolean;  // 新增分组
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
            id: 0,
            name: '',
            groupType: true,    // 是否有子分组
            isShow: true,       // 是否展示分组
            imgs: [],
            detail: '',
            children: [],    // 二级分组  商品ID
            time: '',   // 最后更新时间
            localId: GroupsLocation.CLASSIFICATION
        },
        active:1,
        showEdit:false,
        addNewClass:false
    };

    public create() {
        super.create();
        const groups = getStore('groupList',[]);
        if (groups.length > 0) {
            this.props.datas = groups;
            this.changeLocation({ value:this.props.active });
        } else {
            this.init();
        }
    }

    public init() {
        getGroupsByLocation().then(res => {
            this.props.datas = parseAllGroups(res.groupInfo);
            this.changeLocation({ value:this.props.active });
        });
    }

    // 关闭编辑分类页面
    public closeEdit() {
        this.props.showEdit = false;
        this.props.currentData = {
            id: 0,
            name: '',
            groupType: true,    // 是否有子分组
            isShow: true,       // 是否展示分组
            imgs: [],
            detail: '',
            children: [],    // 二级分组  商品ID
            time: '',   // 最后更新时间
            localId: GroupsLocation.CLASSIFICATION
        };
        this.init();
        this.paint();
    }

    // 编辑当前分类
    public goEdit(index:number) {
        this.props.showEdit = true;
        if (index > -1) {
            this.props.currentData = deepCopy(this.props.showDataList[index]);
            this.props.addNewClass = false;
        } else {
            this.props.addNewClass = true;
        }
        this.paint();
    }

    // 切换查看位置
    public changeLocation(e:any) {
        this.props.active = e.value;
        this.props.showDataList = [];

        if (e.value === 1) {   // 返回分类汇总页
            const index = this.props.datas.findIndex(r => r.id === GroupsLocation.CLASSIFICATION);
            this.props.showDataList = this.props.datas[index].groups;
            
        } else {   // 返回商城首页所有分类
            this.props.datas.forEach(r => {
                if (r.id !== GroupsLocation.CLASSIFICATION) {
                    this.props.showDataList = this.props.showDataList.concat(r.groups);
                }
                
            });
        }
        let second = 0;   // 二级分组的长度
        for (const v of this.props.showDataList) {
            if (v.groupType) {
                second += v.children.length;
            }
        }
        this.props.num = [this.props.showDataList.length, second];
        console.log(this.props.showDataList);
        this.paint();
    }
}