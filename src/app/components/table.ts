// tslint:disable-next-line:missing-jsdoc
import { deepCopy } from '../../pi/util/util';
import { notify } from '../../pi/widget/event';
import { Widget } from '../../pi/widget/widget';

interface Props {
    title:any[];// 表格标题
    datas:any[];// 表数据
    selectList:any[];// 选择框列表
    allChecked:boolean;// 全选
    isChange:number;// 是否修改数据值
    isAdd:boolean;// 是否是新增数据
    needCheckBox:boolean; // 是否需要选择框
    orgRowData:any[]; // 操作行的原始数据
    btn1:string;
    btn2:string;
    inlineBtn1:string;
    inlineBtn2:string;
}
// tslint:disable-next-line:completed-docs
export class Table extends Widget {
    public props:Props = {
        title:[],
        datas:[],
        selectList:[],
        allChecked:false,
        isChange:-1,
        isAdd:false,
        needCheckBox:true,
        orgRowData:[],
        btn1:'',
        btn2:'',
        inlineBtn1:'',
        inlineBtn2:''
    };
    
    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        this.props.orgRowData = deepCopy(this.props.datas[0]);
    }
    
    // 全选整页
    public allChecked() {
        this.props.allChecked = !this.props.allChecked;
        this.props.selectList = [];
        if (this.props.allChecked) {
            for (let i = 0;i < this.props.datas.length;i++) {
                this.props.selectList.push(i);
            }
        }
        this.paint();
    }

    // 选中对应的行
    public checked(index:number) {
        const ind = this.props.selectList.indexOf(index);
        if (ind === -1) {
            this.props.selectList.push(index);
        } else {
            this.props.allChecked = false;
            this.props.selectList.splice(ind,1);
        }
        this.paint();
    }

    // 点击下方按钮
    public clickBtn(e:any,fg:number) {
        notify(e.node,'ev-table-btnClick',{ fg:fg });
    }

    // 查看详情
    public goDetail(e:any,num:number,fg:number) {
        notify(e.node,'ev-table-detail',{ value:this.props.datas[num], fg:fg });
    }
}