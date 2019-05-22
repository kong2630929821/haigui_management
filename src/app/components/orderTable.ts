// tslint:disable-next-line:missing-jsdoc
import { notify } from '../../pi/widget/event';
import { Widget } from '../../pi/widget/widget';

interface Props {
    title:any[];// 表格标题
    datas:any[];// 表数据
    selectList:any[];// 选择框列表
    allChecked:boolean;// 全选
    needCheckBox:boolean; // 是否需要选择框
    btn1:string;
    btn2:string;
    inlineBtn1:string;
    inlineBtn2:string;
    inputFile:string;
    color:boolean;
    isexport:boolean;
}
// tslint:disable-next-line:completed-docs
export class OrderTable extends Widget {
    public props:Props = {
        title:[],
        datas:[],
        selectList:[],
        allChecked:false,
        needCheckBox:true,
        btn1:'',
        btn2:'',
        inlineBtn1:'',
        inlineBtn2:'',
        inputFile:'',
        color:false,
        isexport:false
    };
    
    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        this.allCheckedInit(false);
        console.log(this.props);
    }

    // 全选or not
    public allCheckedInit(selected:Boolean) {
        for (let i = 0;i < this.props.datas.length;i++) {
            this.props.selectList[i] = selected;
        }
        this.props.selectList.length = this.props.datas.length;
    }

    // 是否全选
    public isAllChecked() {
        let allChecked = true;
        for (let i = 0;i < this.props.datas.length;i++) {
            if (!this.props.selectList[i]) {
                allChecked = false;
                break;
            }
        }

        return allChecked;
    }
    
    // 全选整页
    public allChecked(e:any) {
        this.props.allChecked = !this.props.allChecked;
        if (this.props.allChecked) {
            this.allCheckedInit(true);
        } else {
            this.allCheckedInit(false);
        }
        console.log(this.props.selectList);
        notify(e.node,'ev-select-click',{ selectList:this.props.selectList });
        this.paint();
    }

    // 选中对应的行
    public checked(e:any,index:number) {
        const isSelected = !this.props.selectList[index];
        this.props.selectList[index] = isSelected;
        this.checkNextChoosed(index,isSelected);
        console.log(this.props.selectList);
        this.props.allChecked = this.isAllChecked();
        notify(e.node,'ev-select-click',{ selectList:this.props.selectList });
        this.paint();
    }

    // 检查下一个元素是否需要同时被选中或者不被选中  适用于同一个订单多个商品
    public checkNextChoosed(curIndex:number,selected:boolean) {
        if (curIndex < this.props.datas.length - 1) {
            const curOrderId = this.props.datas[curIndex][0];
            const nextOrderId = this.props.datas[curIndex + 1][0];
            if (curOrderId === nextOrderId) {
                this.props.selectList[curIndex + 1] = selected;
                this.checkNextChoosed(curIndex + 1,selected);
            }
        }
    }
    // 点击下方按钮
    public clickBtn(e:any,fg:number) {
        notify(e.node,'ev-table-btnClick',{ fg:fg,value:this.props.selectList });
    }

    // 查看详情
    public goDetail(e:any,num:number,fg:number) {
        notify(e.node,'ev-table-detail',{ value:this.props.datas[num], fg:fg,num:num });
    }

    // 导入excel
    public importExcel(e:any,num:number) {
        notify(e.node,'ev-table-detail',{ value:num });
    }

}
