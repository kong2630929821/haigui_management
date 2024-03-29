/**
 * 输入框的逻辑处理
 * {input:"",placehold:"",disabled:false,clearable:false,itype:"text",style:"",autofacus:false,maxLength:1}
 * input?: 初始内容
 * placeHolder?: 提示文字
 * disabled?: 是否禁用
 * clearable?: 是否可清空
 * itype?: 输入框类型 text number password integer
 * style?: 样式
 * autofocus?: 是否自动获取焦点
 * maxLength?: 输入最大长度，仅对text和password类型输入有效
 * 外部可监听 ev-input-change，ev-input-blur，ev-input-focus，ev-input-clear事件
 */
import { notify } from '../../pi/widget/event';
import { getRealNode, paintWidget } from '../../pi/widget/painter';
import { Widget } from '../../pi/widget/widget';

interface Props {
    input?:string;
    placeHolder?:string;
    style?:string;
    maxLength?:number;
    surplus?:number;
}
interface State {
    currentValue:string;
    inputLock:boolean; // 中文输入结束标记，未结束时不执行change方法
}

// tslint:disable-next-line:completed-docs
export class Input extends Widget {
    public props: Props;
    public state: State = {
        currentValue:'',
        inputLock:false
    };
    
    public setProps(props: Props, oldProps: Props) {
        super.setProps(props,oldProps);
        this.state.currentValue = props.input ? props.input :'';
        
    }
    /**
     * 绘制方法
     * @param reset 表示新旧数据差异很大，不做差异计算，直接生成dom
     */
    public paint(reset?: boolean): void {
        if (!this.tree) {
            super.paint(reset);
        }
        if (!this.props) {
            this.props = {};
        }
        const textarea = (<any>this.getInput());
        textarea.value = this.state.currentValue;
        textarea.scrollTop = textarea.scrollHeight - textarea.style.height;
        paintWidget(this, reset);
    }
    /**
     * 获取真实输入框dom
     */
    public getInput() {
        return getRealNode((<any>this.tree).children[1]);
    }

    /**
     * 用户开始进行非直接输入(中文输入)的时候触发，
     * 而在非直接输入结束。
     */
    public compositionstart() {
        this.state.inputLock = true;
    }
    
    /**
     * 用户输入完成,点击候选词或确认按钮时触发
     */
    public compositionend(e:any) {
        this.state.inputLock = false;
        this.change(e);  // 部分浏览器compositionend事件在input事件之前触发，导致输入值为空
    }

    /**
     * 输入事件
     */
    public change(event:any) {
        if (this.state.inputLock) {
            return;
        }
        let currentValue = event.currentTarget.value;
        // 最大长度限制
        if (this.props.maxLength) {
            currentValue = String(currentValue).slice(0,this.props.maxLength);
            this.props.surplus = this.props.maxLength - currentValue.length;
        }
        this.state.currentValue = currentValue;
        notify(event.node,'ev-input-change',{ value:this.state.currentValue,state:false }); 
        
        this.paint();  
    }

    /**
     * 失焦事件
     */
    public onBlur(event:any) {
        notify(event.node,'ev-input-blur',{ value:this.state.currentValue });
    }

    /**
     * 聚焦事件
     */
    public onFocus(event:any) {
        notify(event.node,'ev-input-focus',{});
    }

    /**
     * 返回正确的行数
     */
    public getRows(value:string) {
        let len = 1;
        if (value.match(/\n/g)) {
            len = value.match(/\n/g).length + 1;
            len = len < 5 ? len :5;
        }

        return len;
    }
   
}