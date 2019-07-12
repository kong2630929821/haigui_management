import { isNumber } from '../../../pi/net/websocket/util';
import { Widget } from '../../../pi/widget/widget';
import { getIncome, haiWangSetting } from '../../net/pull';
import { popNewMessage } from '../../utils/logic';

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
        haiWangTitle:['积分','海王收益现金（分）','海王的海王收益海贝'],
        haiBaoTitle:['积分','上级收益现金（分）','海王收益现金（分）','海王的海王收益海贝'],
        shoppingTitle:['上级收益现金','海王收益现金','海王的海王收益海贝'],
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
                this.paint();
            }
        });
    }
    // 编辑状态
    public edit(index:number) {
        this.props.style[index] = false;
        this.paint();
    }
    // 0海王编辑,1海宝编辑,2购物收益编辑
    public haiWangChange(fg:number,index:number,e:any) {
        const value = e.value;
        if (fg === 0) {
            this.props.haiWang[index] =  value;
        } else if (fg === 1) {
            this.props.haiBao[index] =  value;
        } else {
            this.props.shopping[index] = value;
        }
        this.paint();
    }

    // 0海王保存,1海宝保存,2购物收益保存
    public confirm(fg:number) {
        let data = this.props.haiWang;
        let str = '海王';
        let cfgName = cfg.haiWang;
        if (fg === 0) {
            data = this.props.haiWang;
            str = '海王';
            cfgName = cfg.haiWang;
        } else if (fg === 1) {
            data = this.props.haiBao;
            str = '海宝';
            cfgName = cfg.haiBao;
        } else {
            data = this.props.shopping;
            str = '购物';
            cfgName = cfg.shopping;
        }
        data.forEach((v,i) => {
            data[i] = Number(data[i]);
        });
        // 保存海王
        haiWangSetting(cfgName,JSON.stringify(data)).then(r => {
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
}