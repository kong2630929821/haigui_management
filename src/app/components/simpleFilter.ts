/**
 * 简单选择框
 */

// ================================================ 导入
import { notify } from '../../pi/widget/event';
import { Widget } from '../../pi/widget/widget';
import { deepCopy } from '../store/memstore';

// ================================================ 导出
interface Props {
    active:number; // 当前选择的选项
    options:any[];// 选项
    expand:boolean;// 是否展开所有选项 
    search:boolean;// 是否支持搜索
    inputValue:string;// 搜索值
    dataList:any;// 原始数据
    dataListId:any;// 原始数据ID
    showBrandId:any;// 搜索展示的ID
    disabled:boolean;// 是否禁用
}

// tslint:disable-next-line:completed-docs
export class SimpleFilter extends Widget {
    public props:Props = {
        active:0,
        options:[],
        expand:false,
        search:false,
        inputValue:'',
        dataList:[],
        dataListId:[],
        showBrandId:[],
        disabled:false
    };
    
    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        if (this.props.search) {
            this.props.options = deepCopy(this.props.dataList);
            this.props.dataListId.forEach((v,i) => {
                this.props.showBrandId.push(i);
            });
        }
    }

    // 切换展示隐藏
    public change(e:any) {
        if (!this.props.disabled) {
            this.props.expand = !this.props.expand;
            notify(e.node,'ev-expand',{ value:this.props.expand });
            this.paint();
        } 
    }

    // 选择选项
    public select(e:any,num:number) {
        this.props.active = this.props.search ? this.props.showBrandId[num] :num;
        this.props.expand = false;
        notify(e.node,'ev-selected',{ value:this.props.active });
        this.props.options = this.props.dataList;
        this.paint();
    }

    // 搜索
    public inputChange(e:any) {
        const value = e.value;
        const data = this.props.dataList;
        const dataBrandId = [];
        const optionsList = [];
        data.forEach((v,i) => {
            if (v.indexOf(value) !== -1) {
                dataBrandId.push(i);
                optionsList.push(this.props.dataList[i]);
            }
        });
        this.props.showBrandId = dataBrandId;
        this.props.options = optionsList;
        this.paint();
    }

}

// ================================================ 本地
