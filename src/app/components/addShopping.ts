import { Widget } from '../../pi/widget/widget';
import { popNewMessage } from '../utils/logic';

// tslint:disable-next-line:missing-jsdoc
interface Props {
    sureText:string;
    cancelText:string;
    style:number;
    showDataTitle:any;// input标题
    title:string;// 标题
    postage:any;// 是否需要邮费
    postageActiveIndex:number;// 下标
    expandIndex:number;
    currentData:any;// 当前编辑的数据
    data:any;// 输入框的值
    content:string;
}
const cfg = {
    shop:['商品ID','商品价格','商品返利','积分','抽奖次数'],
    haiWang:['商品ID','领取间隔时间','领取次数']
};
/**
 * 修改特殊商品
 */
export class AddShopping extends Widget {
    public cancel:() => void;
    public ok:(val:any) => void;
    public props:Props = {
        sureText:'确定',
        cancelText:'取消',
        style:0,
        showDataTitle:[],
        title:'添加特殊商品',
        postage:[],
        postageActiveIndex:0,
        expandIndex:-1,
        currentData:[],
        data:[],
        content:'邮费'
    };
    public create() {
        super.create();
        const timeType = [
            {
                status:0,
                text:'否'
            },{
                status:1,
                text:'是'
            }
        ];
        this.props.postage = timeType;
    }
    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        // 配置input框
        if (this.props.style === 0) {
            // 添加
        } else if (this.props.style === 1) {
            this.props.showDataTitle = cfg.shop;
            this.props.data = props.currentData;
            this.props.title = this.props.data[0];
            this.props.data.shift();
            if (JSON.parse(this.props.data[2])) {
                this.props.postageActiveIndex = 1;
            } else {
                this.props.postageActiveIndex = 0;
            }
            
            this.props.data.splice(2,1);
        } else {
            this.props.content = '是否默认赠送';
            this.props.showDataTitle = cfg.haiWang;
            this.props.data = props.currentData;
            this.props.title = this.props.data[0];
            this.props.data.shift();
            this.props.postageActiveIndex = this.props.data[1];
            this.props.data.splice(2,1);
        }
    }

    // 是否选择邮费
    public filterPostage(e:any) {
        this.props.postageActiveIndex = e.activeIndex;
        this.paint();
    }

    // input变化
    public change(index:number,e:any) {
        this.props.data[index] = e.value;
    }

    // 取消
    public cancelBtnClick() {
        this.cancel && this.cancel();
    }

    // 保存
    public okBtnClick() {
        const arr = [];
        let str = null;
        this.props.data.forEach(v => {
            arr.push(JSON.parse(v));
        });
        if (this.props.style === 0) {
            // 添加
        } else if (this.props.style === 1) {
            if (this.props.postageActiveIndex === 0) {
                str = 'false';
            } else {
                str = 'true';
            }
            arr.splice(2,0,str);
        } else {
            str = this.props.postageActiveIndex;
            arr.splice(1,0,str);
        }
        
        this.ok && this.ok(arr);
    }
}