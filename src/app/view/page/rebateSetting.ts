import { Widget } from '../../../pi/widget/widget';
import { getIncome, haiWangSetting } from '../../net/pull';
import { popNewMessage, priceFormat } from '../../utils/logic';
import { rippleShow } from '../../utils/tools';

// tslint:disable-next-line:missing-jsdoc
interface Props {
    haiWang:any;
    haiBao:any;
    shopping:any;
    haiWangTitle:any;
    haiBaoTitle:any;
    shoppingTitle:any;
    style:any;
}
const cfg = {
    haiWang:'up_level1',// 海王接口参数
    haiBao:'up_level2',// 海宝接口参数
    shopping:'shopping'// 购物接口参数
};
/**
 * 返利设置
 */
export class RebateSetting extends Widget {
    public props:Props = {
        haiWang:[],
        haiBao:[],
        shopping:[],
        haiBaoTitle:['新海宝（积分）','上级海宝（现金）','上级海王（现金）','平级海王（海贝）'],
        haiWangTitle:['新海王（积分）','上级海王（现金）','平级海王（海贝）'],
        shoppingTitle:['上级海宝（%）','上级海王（%）','平级海王（%）'],
        style:[true,true,true]
    };

    public create() {
        super.create();
        this.init();
    }

    // 初始化
    public init() {
        getIncome().then(r => {
            if (r.result === 1) {
                // r.up2[0,200000,0] [39900,1000,9500,40]
                this.props.haiWang = r.up1;
                this.props.haiBao = r.up2;
                this.props.shopping = r.shopping;
                
                this.props.haiWang[1] = priceFormat(r.up1[1]);
                this.props.haiBao[1] = priceFormat(r.up2[1]);
                this.props.haiBao[2] = priceFormat(r.up2[2]);
                this.paint();
            }
        });
    }
    // 编辑状态
    public edit(index:number) {
        this.props.style[index] = false;
        this.paint();
    }

    // 0海宝编辑 1海王编辑 2购物收益编辑
    public rebateChange(fg:number,index:number,e:any) {
        const value = e.value;
        if (fg === 0) {
            this.props.haiBao[index] =  value;
        } else if (fg === 1) {
            this.props.haiWang[index] =  value;
        } else {
            this.props.shopping[index] = value;
        }
        this.paint();
    }

    // 0海宝保存 1海王保存 2购物收益保存
    public confirm(fg:number) {
        let data = this.props.haiWang;
        let str = '海王';
        let cfgName = cfg.haiWang;
        // 如果没点击修改则不调用接口
        if (this.props.style[fg]) {

            return; 
        }
        if (fg === 0) {
            data = this.props.haiBao;
            str = '海宝';
            cfgName = cfg.haiBao;
        } else if (fg === 1) {
            data = this.props.haiWang;
            str = '海王';
            cfgName = cfg.haiWang;
        } else {
            data = this.props.shopping;
            str = '购物';
            cfgName = cfg.shopping;
        }
        let breakFg = false;
        const curData = [];  // 处理后数据 传给后端
        data.forEach((v,i) => {
            curData[i] = Number(v);
            if (curData[i] < 0) {
                breakFg = true;
            }

            if (fg === 0 && (i === 1 || i === 2)) curData[i] = curData[i] * 100;  // 海宝收益 上级海宝|上级海王
            if (fg === 1 && i === 1) curData[i] = curData[i] * 100;  // 海王收益 上级海王
        });

        if (breakFg) {
            popNewMessage('返利不能存在负数');

            return;
        }
        // 保存海王
        haiWangSetting(cfgName,JSON.stringify(curData)).then(r => {
            if (r.result === 1) {
                popNewMessage(`修改${str}收益成功`);
                this.props.style = [true,true,true];
                this.init();
            } else {
                popNewMessage(`修改${str}收益失败`);
            }
        }).catch(e => {
            popNewMessage(`修改${str}收益失败`);
        });
    } 

    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }
}