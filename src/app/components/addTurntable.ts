import { Widget } from '../../pi/widget/widget';
import { popNewMessage } from '../utils/logic';

// tslint:disable-next-line:missing-jsdoc
interface Props {
    title:string;// 标题
    price:number;// 金额
    probability:number;// 概率
    cancelText:string;// 取消
    sureText:string;// 确定
    currentData:any;// 当前账户数据
    style:boolean;// 状态  true为添加 false 修改
}

/**
 * 添加修改大转盘
 */
export class AddTurntable extends Widget {
    public props:Props = {
        title:'',
        price:0,
        probability:0,
        cancelText:'取消',
        sureText:'确定',
        currentData:[],
        style:true
    };
    public ok:(val:any) => void;
    public cancel:() => void;
    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        if (props.style === false) {
            this.props.price = props.currentData[0];
            this.props.probability = props.currentData[1];  
        }
        
    }

    // 金额
    public priceChange(e:any) {
        this.props.price = e.value;
        this.paint;
    }

    // 概率
    public probabilityChange(e:any) {
        this.props.probability = e.value;
        this.paint();
    }

    // 取消
    public cancelBtnClick() {
        this.cancel && this.cancel();
    }

    // 保存修改
    public okBtnClick() {
        const price = this.props.price;
        const probability = this.props.probability;
        if (this.props.style) {
            // 添加
            const arr = [Number(price),Number(probability)];
            this.ok && this.ok(arr);
        } else {
            // 修改
            const arr = [Number(price),Number(probability)];
            this.ok && this.ok(arr);
        }
    }
}