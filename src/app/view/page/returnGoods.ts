import { popNew } from '../../../pi/ui/root';
import { Widget } from '../../../pi/widget/widget';
import { perPage } from '../../components/pagination';
import { getAllRefundOrder, getRefundOrder, getReturnGoods, getReturnGoodsId, setRefundStatus, setReturnStatus } from '../../net/pull';
import { popNewMessage, priceFormat, timeConvert, transitTimeStamp, unicode2ReadStr, unicode2Str } from '../../utils/logic';
import { rippleShow } from '../../utils/tools';

/**
 * 商品信息
 */
export class GoodsInfo extends Widget {
    public props:any = {
        showDataList:[],
        returnList:[],// 存所有的商品
        showTitleList:['售后单id','商品ID','商品SKU','用户ID','下单时单价','下单时数量','支付类型','状态','退货原因','申请退货的时间','回应退货申请的时间','完成退货的时间','用户姓名','用户电话','用户微信名','下单时间','支付时间','发货时间',' 收货时间','发货单号','退货运单号','退货申请图片数量','拒绝退货原因','订单总金额','微信支付单号','订单ID'],
        page:1,// 上一个操作是第几页
        currentIndex:0,// 当前页数
        searchValue:'',// 输入的搜索值
        returnStatus:0, // 当前退货状态 0退货申请 1退货中 2退货完成
        startTime:'',  // 查询开始时间
        endTime:'', // 查询结束时间
        showDateBox:false,
        returnApplyNum:0, // 退货申请数量
        refundApplyNum:0,  // 退款申请数量
        typeTitle:'申请时间',
        perPage:perPage[0],
        dataList:[],// 全部数据
        sum:0,// 总共多少条数据
        imgs:[],  // 退货详情图片
        expandIndex:false,// 分页下拉显示
        perPageIndex:0,// 一页多少个的下标
        showDetail:'' // 查看退款订单详情 oid
    };

    public create() {
        super.create();
        const oData = new Date();
        const time = oData.setHours(23, 59, 59, 999);
        this.props.endTime =  timeConvert(time);
        this.props.startTime = '2019-05-01';
        console.log('3333333333333333333333333333333333333',this.props.startTime);
        this.init(1,transitTimeStamp(this.props.startTime),time);
        
        getAllRefundOrder(0,1,transitTimeStamp(this.props.startTime),time,1).then(r => {
            const refundOrder = JSON.parse(r.value);
            this.props.refundApplyNum = refundOrder.length;  // 退款申请总数
            this.paint();
        });
    }
    public init(status:number,startTime:number,time:number) {
        if (status > 3) {
            getAllRefundOrder(0,1,startTime,time,status - 3).then(r => {
                let refundOrder = JSON.parse(r.value);
                this.props.returnList = refundOrder;
                if (refundOrder.length) {
                    refundOrder = this.parseRefund(refundOrder);
                }
                this.props.sum = refundOrder.length;
                this.props.dataList = refundOrder;
                this.props.showDataList = this.props.dataList.slice(0,this.props.perPage);
                if (status === 4) {
                    this.props.refundApplyNum = refundOrder.length;
                }
                this.paint();
            });
        } else {
            getReturnGoods(0,1,startTime,time,status).then(r => {
                let returnGoods = JSON.parse(r.value);
                this.props.returnList = returnGoods;
                if (returnGoods.length) {
                    returnGoods = this.dataProcessing(returnGoods);
                }
                this.props.sum = returnGoods.length;
                this.props.dataList = returnGoods;
                this.props.showDataList = this.props.dataList.slice(0,this.props.perPage);
                if (status === 1) {
                    this.props.returnApplyNum = returnGoods.length;
                }
                this.paint();
            });
        }
    }

    // 切换tab
    public checkType(index:number) {
        this.close();
        this.props.returnStatus = index;
        if (index === 0 || index === 3) {
            this.props.typeTitle = '申请时间';
        } else if (index === 1) {
            this.props.typeTitle = '处理时间';
        } else {
            this.props.typeTitle = '完成时间';
        }
        const oData = new Date();
        const time = oData.setHours(23, 59, 59, 999);
        this.props.endTime =  timeConvert(time);
        this.props.startTime = '2019-05-01';
        this.init(index + 1,transitTimeStamp(this.props.startTime),transitTimeStamp(this.props.endTime));
        this.paint();
    }

    // 处理数据显示格式
    public dataProcessing(returnGoods:any) {
        this.props.showTitleList = ['售后单id','商品ID','商品SKU','用户ID','下单时单价','下单时数量','支付类型','状态','退货原因','申请退货的时间','回应退货申请的时间','完成退货的时间','用户姓名','用户电话','用户微信名','下单时间','支付时间','发货时间',' 收货时间','发货单号','退货运单号','退货申请图片数量','拒绝退货原因','订单总金额','微信支付单号','订单ID'];
        returnGoods.forEach((element,index) => {
            // tslint:disable-next-line:cyclomatic-complexity
            element.forEach((v,i) => {
                if (i === 4) {  // 下单时单价 单位分
                    returnGoods[index][i] = priceFormat(v);
                } else if (i === 6) {  // 支付类型
                    if (v === 1) {
                        returnGoods[index][i] = '现金';
                    } else if (v === 2) {
                        returnGoods[index][i] = '积分';
                    } else {
                        returnGoods[index][i] = '现金和积分';
                    }
                } else if (i === 7) {  // 状态
                    if (v === -1) {
                        returnGoods[index][i] = '退货失败';
                    } else if (v === 0) {
                        returnGoods[index][i] = '未申请退货';
                    } else {
                        if (this.props.returnStatus === 0) {
                            returnGoods[index][i] = '申请退货';
                        } else if (this.props.returnStatus === 2) {
                            returnGoods[index][i] = '退货成功';
                        } else {
                            returnGoods[index][i] = '退货中';
                        }
                        
                    }

                } else if (i === 8) { // 退货原因
                    returnGoods[index][i] = unicode2Str(v);

                } else if (i >= 9 && i <= 11) { 
                    if (v !== 0) {
                        returnGoods[index][i] = timeConvert(v);
                    }
                } else if (i >= 15 && i <= 18) {
                    if (v !== 0) {
                        returnGoods[index][i] = timeConvert(v);
                    }
                    
                } else if (i === 14) {   // 用户微信名
                    returnGoods[index][i] = unicode2ReadStr(v);

                } else if (i === 21) {  // 退货申请图片
                    returnGoods[index][i] = v.length || '';
                    this.props.imgs[index] = v;

                } else if (i === 22) {  // 拒绝退货原因
                    returnGoods[index][i] = unicode2Str(v);
                } else if (i === 23) {
                    returnGoods[index][i] = priceFormat(v);
                }

            });
        });
        console.log('处理数据格式',returnGoods);

        return returnGoods;
    }

    // 解析退款申请
    public parseRefund(refundOrders:any) {
        this.props.showTitleList = ['订单id','用户id','退款金额','状态','退款单号','备注','申请退款时间'];
        refundOrders.forEach((v,i) => {
            v.forEach((r,j) => {
                if (j === 2) { // 退款金额
                    refundOrders[i][j] = priceFormat(r);
                }
                if (j === 3) {  // 状态
                    refundOrders[i][j] = r === 1 ? '申请退款' :'退款完成';
                }
                if (j === 6) {   // 申请退款时间
                    refundOrders[i][j] = timeConvert(r);
                }
            });
        });
        console.log('处理数据格式',refundOrders);

        return refundOrders;
    }

    // input输入的值
    public inputChange(e:any) {
        this.props.searchValue = e.value;
    }
    // 搜索指定ID
    public search() {
        this.close();
        let num = this.props.searchValue;
        console.log(num);
        if (num) {
            num = parseInt(this.props.searchValue);
            if (isNaN(num)) {
                return ;
            }
            this.props.showDataList = [];
            this.paint();
            if (this.props.returnStatus < 3) {
                getReturnGoodsId(num).then(r => {
                    const returnGoods = JSON.parse(r.value);
                    this.props.returnList = returnGoods;
                    returnGoods[0].forEach((v,i) => {
                        if (i === 7) {
                            // 判断退货完成查询
                            if ((v === 1 || v === -1) && this.props.returnStatus === 2 && returnGoods[0][11] !== 0) {
                                this.props.showDataList = this.dataProcessing(returnGoods);
                            } else if (v === 1 && this.props.returnStatus === 1 && returnGoods[0][10] !== 0 && returnGoods[0][11] === 0) {
                            // 判断退货中查询
                                this.props.showDataList = this.dataProcessing(returnGoods);
                            } else if (v === 1 && this.props.returnStatus === 0 && returnGoods[0][10] === 0) {
                            // 判断申请查询
                                this.props.showDataList = this.dataProcessing(returnGoods);
                            } else {
                            // 其他情况
                                this.props.showDataList = [];
                            }
                        }
                   
                    });
                    this.props.num = this.props.showDataList.length;
                    this.paint();
                });
            } else {
                getRefundOrder(num).then(r => {
                    const refundOrder = JSON.parse(r.value);
                    this.props.showDataList = this.parseRefund(refundOrder);
                    this.props.num = refundOrder.length;
                    this.paint();
                });
            }
        } else {
            console.log('开始时间',this.props.startTime,this.props.endTime);
            console.log('开始时间戳',transitTimeStamp(this.props.startTime),transitTimeStamp(this.props.endTime));
            this.init(this.props.returnStatus + 1,transitTimeStamp(this.props.startTime),transitTimeStamp(this.props.endTime));
        }
        
    }
     // 日期选择框显示
    public changeDateBox(e:any) {
        this.close();
        this.props.showDateBox = e.value;
        this.paint();
    }

    // 改变时间
    public  changeDate(e:any) {
        this.props.startTime = e.value[0];
        this.props.endTime = e.value[1];
    }
    // 页面点击
    public close() {
        this.props.showDateBox = false;
        this.props.expandIndex = false;
        this.paint();
    }
    // 设置退货状态
    public changeReturnGoods(uid:number,id:number,state:number,num:number,reason:string) {
        setReturnStatus(uid,id,state,reason).then(r => {
            if (r.result === 1) {
                this.props.showDataList.splice(num,1);
                if (state === 0) {
                    popNewMessage('开始处理成功');
                    this.props.returnApplyNum--;
                } else if (state === -1) {
                    popNewMessage('拒绝退货成功');
                } else {
                    popNewMessage('同意退货成功');
                }
                this.paint();
            }
        });
    }
    public goDetail(e:any) {
        console.log('这行数据',e);
        const uid = e.value[3];
        const id = e.value[0];
        const username = e.value[12];
        if (e.fg === 3) {  // 查看退货申请
            if (this.props.returnStatus < 3) {
                popNew('app-view-page-returnGoodsDetail',{ content:e.value[8],username,imgs:this.props.imgs[e.num] });
            } else {
                this.props.showDetail = String(e.value[0]);
                this.paint();
            }
            
            return;
        }

        if (this.props.returnStatus === 0) {
            // 退货申请
            if (e.fg === 1) {
                popNew('app-components-modalBoxInput',{ title:`确认拒绝“<span style="color:#1991EB">${username}</span>”的退货`,placeHolder:'请输入拒绝理由',errMessage:'请输入拒绝理由' }, (r) => {
                    if (r) {
                        this.changeReturnGoods(uid,id,-1,e.num,r);
                    } else {
                        popNewMessage('请输入拒绝理由！');
                    }
                },() => {
                    popNewMessage('你已经取消操作！');
                });
            } else {
                popNew('app-components-modalBox',{ content:`确认开始处理“<span style="color:#1991EB">${username}</span>”的退货申请` }, () => {
                    this.changeReturnGoods(uid,id,0,e.num,'');
                },() => {
                    popNewMessage('你已经取消操作！');
                });
            }
            
        } else if (this.props.returnStatus === 1) {
            // 退货中
            if (e.fg === 1) {
                popNew('app-components-modalBoxInput',{ title:`确认拒绝“<span style="color:#1991EB">${username}</span>”的退货`,placeHolder:'请输入拒绝理由',errMessage:'请输入拒绝理由' }, (r) => {
                    if (r) {
                        this.changeReturnGoods(uid,id,-1,e.num,r);
                    } else {
                        popNewMessage('请输入拒绝理由！');
                    }
                },() => {
                    popNewMessage('你已经取消操作！');
                });
            } else {
                popNew('app-components-modalBox',{ content:`确认“<span style="color:#1991EB">${username}</span>”的退货已完成` }, () => {
                    this.changeReturnGoods(uid,id,1,e.num,'');
                },() => {
                    popNewMessage('你已经取消操作！');
                }); 
            }
        } else if (this.props.returnStatus === 3) {
            // 退款申请
            if (e.fg === 1) {
                popNew('app-components-modalBox',{ content:`确认同意“<span style="color:#1991EB">${e.value[1]}</span>”的退款申请` }, () => {
                    setRefundStatus(id).then(r => {
                        this.props.showDataList.splice(e.num, 1);
                        this.props.refundApplyNum--;
                        this.paint();
                        popNewMessage('退款处理成功');
                    }).catch(r => {
                        popNewMessage('退款处理失败');
                    });
                    
                },() => {
                    popNewMessage('你已经取消操作！');
                });
            }
        }
    }

    // 分页变化
    public pageChange(e:any) {
        this.close();
        this.props.currentIndex = e.value;
        console.log(e.value);
        this.props.showDataList = this.props.dataList.slice(e.value * this.props.perPage,(e.value + 1) * this.props.perPage);
        console.log('当前页数据：',this.props.showDataList);
        this.paint();
    }

    // 每页展示多少数据
    public perPage(e:any) {
        this.close();
        this.props.perPage = e.value;
        this.props.expandIndex = false;
        this.props.perPageIndex = e.index;
        this.pageChange({ value:0 });   
    }
    
    // 过滤器
    public expand(e:any) {
        this.close();
        this.props.expandIndex = e.value;
        this.paint();
    }

    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }

    // 从详情页返回
    public detailBack() {
        this.props.showDetail = '';
        this.paint();
    }

}