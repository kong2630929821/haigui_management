import { popNew } from '../../../pi/ui/root';
import { Widget } from '../../../pi/widget/widget';
import { changeGiftSetting, changeLevelGift, getGiftSetting } from '../../net/pull';
import { deepCopy } from '../../store/memstore';
import { popNewMessage } from '../../utils/logic';
import { rippleShow } from '../../utils/tools';

interface Props {
    style:boolean;
    goodsConfig:any;// 商品配置
    showTitleList:any;// 标题
    realSum:number;// 商品配置条数
    activeTab:number;// 当前活动项
    dataList:any;// 原始数据
}
// 特殊商品名称
const cfg = [
    ['免费试用装','线下课程','399美白礼包A','399美白礼包B','1万美白礼包A','1万美白礼包B','尊享面膜礼包(海宝)','尊享面膜礼包(海王)','5980线下课程(海宝)','5980线下课程(海王)','29800线下课程(海宝)','29800线下课程(海王)'],
    ['海王每周权益','免费试用装','线下课程','1万美白礼包A','1万美白礼包B','海王5980线下课程','海王29800线下课程'],
    ['海宝每周权益','免费试用装','线下课程','399美白礼包A','399美白礼包B','5980线下课程','29800线下课程'],
    ['免费试用装','线下课程']
];
// 标题
const tilt = [
    ['名称','商品ID','商品价格','是否需要邮费','商品返利','积分','增加的免费抽奖次数'],
    ['名称','商品ID','1表示默认赠送、0表示可选','领取间隔时间(天)','领取次数'],
    ['名称','商品ID','1表示默认赠送、0表示可选','领取间隔时间(天)','领取次数'],
    ['名称','商品ID','1表示默认赠送、0表示可选','领取间隔时间(天)','领取次数']
];
/**
 * 礼包配置
 */
export class InvitationSetting extends Widget {
    public props:Props = {
        style:false,
        goodsConfig:[],
        showTitleList:[],
        realSum:0,
        activeTab:1,
        dataList:[]
    };

    public create() {
        super.create();
        this.init(0);
    }

    // 初始化
    public init(index:number) {
        getGiftSetting().then(r => {
            if (r.length) {
                const data = [];
                const arr = [];
                r[index].forEach((v,i) => {
                    data.push([cfg[index][i],...v]);
                    arr.push(v);
                });
               
                this.props.goodsConfig = data;
                this.props.dataList = arr;
                this.props.realSum = r[index].length;
                this.props.showTitleList = tilt[index];
                this.props.style = false;
                this.paint();
            }
            
        });
    }
    // 切换tab
    public changeTab(index:number) {
        this.props.activeTab = index;
        this.init(index);
        this.paint();
    }
    
    // 表格操作
    public goDetail(index:number,e:any) {
        const str = e.value[0];
        if (e.fg === 1) {
            // 编辑
            popNew('app-components-addShopping',{ title:'编辑配置',currentData:deepCopy(e.value),sureText:'修改',style:index + 1 },(val) => {
                popNewMessage('修改成功');
                this.props.goodsConfig[e.num] = [str,...val];
                this.props.dataList[e.num] = val;
                this.props.style = true;
                this.paint();
            });
        } else {
           // 删除
            // this.props.goodsConfig.splice(e.num,1);
            // this.props.dataList.splice(e.num,1);
            // this.props.realSum--;
            // this.paint();
        }
            
    }

    // 应用
    public application() {
        if (!this.props.style) {

            return;
        }
        if (this.props.activeTab === 0) {
            changeGiftSetting('goods',JSON.stringify(this.props.dataList)).then(r => {
                if (r.result === 1) {
                    popNewMessage('配置成功');
                    this.props.style = false;
                    this.paint();
                } else {
                    popNewMessage('配置失败');
                }
            }).catch(e => {
                popNewMessage('配置失败');
            });
        } else {
            changeLevelGift('goods_limit',this.props.activeTab,JSON.stringify(this.props.dataList)).then(r => {
                if (r.result === 1) {
                    popNewMessage('配置成功');
                    this.props.style = false;
                    this.paint();
                } else {
                    popNewMessage('配置失败');
                }
            }).catch(e => {
                popNewMessage('配置失败');
            });
        }
    }
    
    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }
        
}