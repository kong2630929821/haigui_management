import { popNew } from '../../../pi/ui/root';
import { Widget } from '../../../pi/widget/widget';
import { perPage } from '../../components/pagination';
import { getReturnGoods, getReturnGoodsId, setReturnStatus } from '../../net/pull';
import { popNewMessage, timeConvert, transitTimeStamp, unicode2ReadStr, unicode2Str } from '../../utils/logic';

/**
 * 商品信息
 */
export class GoodsInfo extends Widget {
    public props:any = {
        showDataList:[
           
        ],
        returnList:[],// 存所有的商品
        showTitleList:['售后单id','商品ID','商品SKU','用户ID','下单时单价','下单时数量','支付类型','状态','退货原因','申请退货的时间','回应退货申请的时间','完成退货的时间','用户姓名','用户电话','用户微信名','下单时间','支付时间','发货时间',' 收货时间','发货单号','退货运单号','退货申请图片','拒绝退货原因'],
        page:1,// 上一个操作是第几页
        currentIndex:0,// 当前页数
        searchValue:'',// 输入的搜索值
        returnStatus:0, // 当前退货状态 0退货申请 1退货中 2退货完成
        startTime:'',  // 查询开始时间
        endTime:'', // 查询结束时间
        showDateBox:false,
        numberOfApplications:0,
        typeTitle:'申请时间',
        perPage:perPage[0],
        dataList:[]// 全部数据
    };
    public checkType(index:number) {
        this.props.returnStatus = index;
        if (index === 0) {
            this.props.typeTitle = '申请时间';
        } else if (index === 1) {
            this.props.typeTitle = '处理时间';
        } else {
            this.props.typeTitle = '完成时间';
        }
        const oData = new Date();
        const time = oData.setHours(23, 59, 59, 999);
        this.props.endTime =  timeConvert(time);
        this.props.startTime = '2019-05-01 00:00:000';
        this.init(index + 1,transitTimeStamp(this.props.startTime),transitTimeStamp(this.props.endTime));
        this.paint();
    }
    public create() {
        super.create();
        const oData = new Date();
        const time = oData.setHours(23, 59, 59, 999);
        this.props.endTime =  timeConvert(time);
        this.props.startTime = '2019-05-01 00:00:000';
        console.log('3333333333333333333333333333333333333',this.props.startTime);
        this.init(1,transitTimeStamp(this.props.startTime),time);
    }
    public init(status:number,startTime:number,time:number) {
       
        getReturnGoods(0,1,startTime,time,status).then(r => {
            let returnGoods;
            returnGoods = JSON.parse(r.value);
            this.props.returnList = returnGoods;
            if (returnGoods.length) {
                returnGoods = this.dataProcessing(returnGoods);
            }
            this.props.showDataList = returnGoods;
            if (status === 1) {
                this.props.numberOfApplications = this.props.showDataList.length;
            }
            this.paint();
        });
    }

    // 处理数据显示格式
    public dataProcessing(returnGoods:any) {
        returnGoods.forEach((element,index) => {
            element.forEach((v,i) => {
                if (i === 6) {  // 支付类型
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

                } else if (i === 22) {  // 拒绝退货原因
                    returnGoods[index][i] = unicode2Str(v);
                }
            });
        });
        console.log('处理数据格式',returnGoods);

        return returnGoods;
    }
    // input输入的值
    public inputChange(e:any) {
        this.props.searchValue = e.value;
    }
    // 搜索指定ID
    public search() {
        let num = this.props.searchValue;
        console.log(num);
        if (num) {
            num = parseInt(this.props.searchValue);
            if (isNaN(num)) {
                return ;
            }
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
                
                this.paint();
            }).catch(e => {
                this.props.showDataList = [];
                this.paint();
            });
        } else {
            console.log('开始时间',this.props.startTime,this.props.endTime);
            console.log('开始时间戳',transitTimeStamp(this.props.startTime),transitTimeStamp(this.props.endTime));
            this.init(this.props.returnStatus + 1,transitTimeStamp(this.props.startTime),transitTimeStamp(this.props.endTime));
        }
        
    }
     // 日期选择框显示
    public changeDateBox(e:any) {
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
        this.paint();
    }
    // 设置退货状态
    public changeReturnGoods(uid:number,id:number,state:number,num:number,reason:string) {
        setReturnStatus(uid,id,state,reason).then(r => {
            if (r.result === 1) {
                this.props.showDataList.splice(num,1);
                if (state === 0) {
                    popNewMessage('开始处理成功');
                    this.props.numberOfApplications--;
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
            popNew('app-view-page-returnGoodsDetail',{ content:e.value[8],username,imgs:e.value[21] });
            
            return;
        }

        if (this.props.returnStatus === 0) {
            // 退货申请
            popNew('app-components-modalBox',{ content:`确认开始处理“<span style="color:#1991EB">${username}</span>”的退货申请` }, () => {
                this.changeReturnGoods(uid,id,0,e.num,'');
            },() => {
                popNewMessage('你已经取消操作！');
            });
            
        } else if (this.props.returnStatus === 1) {
            // 退货中
            if (e.fg === 1) {
                popNew('app-components-modalBoxInput',{ title:`确认拒绝“<span style="color:#1991EB">${username}</span>”退货申请`,placeHolder:'请输入拒绝理由' }, (r) => {
                    if (r) {
                        this.changeReturnGoods(uid,id,-1,e.num,r);
                    } else {
                        popNewMessage('请输入拒绝理由！');
                    }
                },() => {
                    popNewMessage('你已经取消操作！');
                });
            } else {
                popNew('app-components-modalBox',{ content:`确认同意“<span style="color:#1991EB">${username}</span>”退货申请` }, () => {
                    this.changeReturnGoods(uid,id,1,e.num,'');
                },() => {
                    popNewMessage('你已经取消操作！');
                }); 
            }
        }
    }
   
}