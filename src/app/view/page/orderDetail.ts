import { notify } from '../../../pi/widget/event';
import { Widget } from '../../../pi/widget/widget';
import { getOrderById } from '../../net/pull';
import { getStore } from '../../store/memstore';
import { parseOrderDetailShow, rippleShow } from '../../utils/tools';
import { RightsGroups } from '../base/home';
import { Order, OrderStatus } from './totalOrders';

// ['订单编号','供应商ID','用户ID','下单时间','状态','运单号','支付时间','微信支付单号','税费','邮费','总金额','姓名','身份证','微信名','身份','收货人','收货电话','收货地址']
export type OrderDetailBase = [number,number,number,string,string,string,string,string,string,string,string,string,string,string,string,string,string,string];

// ['商品ID','商品名称','SKU编号','SKU名称','供应商商品ID','商品类型','所属分类','购买数量','保质期','成本价','售价','会员价','退货地址','收件人','联系电话']
export type OrderDetailGoods = [number,string,string,string,number,string,string,number,string,string,string,string,string,string,string]; 

// ['返利用户ID','返利用户昵称','返利类型','返利金额','返利时间']
export type OrderDetailRebate = [number,string,string,string,string];

interface Props {
    baseTitleList:string[];
    goodsTitleList:string[];
    rebateTitleList:string[];
    baseDataList:OrderDetailBase;
    goodsDataList:OrderDetailGoods[];
    rebateDataList:OrderDetailRebate[];
    dataList:Order;
    auth:boolean;
    oid:number;  // 订单id
}

/**
 * 订单详情
 */
export class OrderDetail extends Widget {
    public props:Props = {
        baseTitleList:['订单编号','供应商ID','用户ID','下单时间','状态','运单号','支付时间','微信支付单号','税费','邮费','总金额','姓名','身份证号','微信名','身份','收货人','收货电话','收货地址'],   // 基础信息标题
        goodsTitleList:['商品ID','商品名称','SKU编号','SKU名称','供应商商品ID','商品类型','所属分类','购买数量','保质期','成本价','售价','会员价','退货地址','收件人','联系电话'],  // 商品信息标题
        rebateTitleList:['返利用户ID','返利用户昵称','返利类型','返利金额','返利时间'], // 返利信息标题
        baseDataList:null,    // 基础信息
        goodsDataList:[],   // 商品信息
        rebateDataList:[],  // 返利信息
        dataList:null,
        auth:false,
        oid:null
    };

    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        const auths = getStore('flags/auth');
        if (auths[0] === 0 || auths.indexOf(RightsGroups.finance) !== -1) {
            this.props.auth = true;
        }
        if (props.oid) {
            getOrderById(props.oid).then(([orders,ordersShow]) => {
                const orderShow = parseOrderDetailShow(orders[0].length > 0 ? orders[0][0] :orders[0], OrderStatus.ALL);
                this.props.baseDataList = orderShow.orderBase;
                this.props.goodsDataList = orderShow.orderGoods;
                this.props.rebateDataList = orderShow.orderRebate;
                this.paint();
                console.log('!!!!!!!!!!!!!OrderDetail',this.props);

            });

            return;
        }
        const orderShow = parseOrderDetailShow(props.dataList[0].length ? props.dataList[0] :props.dataList, OrderStatus.ALL);
        this.props.baseDataList = orderShow.orderBase;
        this.props.goodsDataList = orderShow.orderGoods;
        this.props.rebateDataList = orderShow.orderRebate;
        console.log('!!!!!!!!!!!!!OrderDetail',this.props);
    }

    public goBack(e:any) {
        notify(e.node,'ev-detail-back',null);
    }

    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }
}