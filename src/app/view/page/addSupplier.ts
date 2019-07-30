// tslint:disable-next-line:missing-jsdoc
import { notify } from '../../../pi/widget/event';
import { Widget } from '../../../pi/widget/widget';
import { addSupplier, changeSupplier, getFreight, getFreightInfo } from '../../net/pull';
import { popNewMessage, priceFormat, unicode2Str } from '../../utils/logic';
import { analysisFreightData, exportExcel, importRead, rippleShow } from '../../utils/tools';

interface Props {
    statusType:any;// 状态筛选
    statusTypeActiveIndex:number;// 状态筛选当前下标
    expandIndex:boolean; // 控制下拉显示
    showDataList:any;// 处理后的邮费数据
    showTitleList:any;// 表格标题运费
    currentData:any;// 当前编辑的数据
    style:boolean;// 当前状态 true编辑  false 添加
    freightList:any;// 原始邮费数据
    isChange:boolean;// 修改数据时，是否修改运费
    pageTitle:string;// 页面标题
    time:string;// 修改时间
    dataList:any;// 普通商品邮费 保税商品邮费 海外直购邮费
    oldData:any;// 新增时的邮费
    oldFreightList:any;// 新增原始邮费数据
}
/**
 * 添加供应商
 */
// tslint:disable-next-line:completed-docs
export class AddSupplier extends Widget {
    public props:Props = {
        statusType:[],
        statusTypeActiveIndex:0,
        expandIndex:false,
        showDataList:[],
        showTitleList:['ID','地区','支付类型','邮费'],
        currentData:[[],[]],
        style:true,
        freightList:[],
        isChange:false,
        pageTitle:'添加供应商',
        time:'',
        dataList:[[],[],[]],
        oldData:[],
        oldFreightList:[]
    };
    public create() {
        super.create();
        // 状态筛选
        const timeType = [
            {
                status:0,
                text:'普通商品'
            },{
                status:1,
                text:'保税商品'
            },{
                status:2,
                text:'海外直购'
            }
        ];
        this.props.statusType = timeType;
    }
    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        if (this.props.currentData.length) {
            this.props.currentData[1][0] = unicode2Str(this.props.currentData[1][0]);
            this.props.currentData[1][2] = unicode2Str(this.props.currentData[1][2]);
        }
        for (let i = 0;i < 3;i++) {
            getFreightInfo(this.props.currentData[0],i).then(r => {
                this.props.dataList[i] = r;
                // 如果执行到第3次时
                if (i === 2) {
                    this.props.dataList.forEach((v,j) => {
                        if (v.length) {
                            this.props.statusTypeActiveIndex = j;
                            this.props.showDataList = v[1];
                            this.props.freightList = v[0];
                            this.props.time = v[2];
                            this.paint();

                            return ;
                        }
                    });
                }
            });
        }
        
        this.props.pageTitle = '查看供应商';
    }
    // input框输入
    public inputChange(index:number,e:any) {
        this.props.currentData[index] = e.value;
    }
    // 供应商名称变化
    public supplierChange(e:any) {
        this.props.currentData[1][0] = e.value;
    }
    // 描述变化
    public textareaChange(e:any) {
        this.props.currentData[1][2] = e.value;
    }
    // 保存
    public save(e:any) {
        const id = parseInt(this.props.currentData[0]);
        const name = this.props.currentData[1][0];
        const supplier_desc = this.props.currentData[1][2];
        const supplier_phone = this.props.currentData[2];
        if (!supplier_phone || !name) {
            popNewMessage('输入信息不能为空');

            return ;
        }
        if (!/^1[3456789]\d{9}$/.test(supplier_phone)) { 
            popNewMessage('电话号码格式错误');

            return;
        } 
        if (!this.props.freightList.length) {
            popNewMessage('没有配置运费信息');

            return;
        }
        if (this.props.style) {
            // 编辑保存
            console.log(this.props.currentData);
            changeSupplier(id,name,supplier_desc,'',supplier_phone).then(r => {
                if (r.result === 1) {
                    // 是否修改运费
                    getFreight(id,this.props.statusTypeActiveIndex,JSON.stringify(this.props.freightList)).then(res => {
                        if (res.result === 1) {
                            popNewMessage('修改成功');
                            notify(e.node,'ev-save-change',{});
                        } else {
                            popNewMessage('修改失败');
                        }
                    });
                    
                } else {
                    popNewMessage('修改失败');
                }
            });
        } else {
            // 添加
            addSupplier(name,supplier_desc,'',supplier_phone).then(r => {
                if (r.result === 1) {
                    getFreight(r.id,this.props.statusTypeActiveIndex,JSON.stringify(this.props.freightList)).then(res => {
                        if (res.result === 1) {
                            popNewMessage('添加成功');
                            notify(e.node,'ev-save-change',{});
                        } else {
                            popNewMessage('修改失败');
                        }
                    });
                 
                } else {
                    popNewMessage('添加失败');
                }
            });
            
        }
    }

    // 过滤器
    public expand(e:any) {
        this.props.expandIndex = e.value;
        this.paint();
    }

    // 重置页面的展开状态
    public close() {
        this.props.expandIndex = false;
        this.paint();
    }

    // 运费类型发生变化
    public filterTimeType(e:any) {
        this.props.expandIndex = false;
        const index = e.activeIndex;
        this.props.statusTypeActiveIndex = index;
        this.props.showDataList = this.props.dataList[index][1] ? this.props.dataList[index][1] :this.props.oldData;
        this.props.freightList = this.props.dataList[index][0] ? this.props.dataList[index][0] :this.props.oldFreightList;
        this.props.time = this.props.dataList[index][2] ? this.props.dataList[index][2] :'';
        this.paint();
    }

    // 导入运单号
    public importTransport(e:any) {
         // 导入运单
        const file = e.file;
        importRead(file,(res) => {
            console.log(res);
            const data = analysisFreightData(res);
            this.props.freightList = analysisFreightData(res);
            this.props.oldFreightList = analysisFreightData(res);
            data.forEach(item => {
                if (item[2] === 1) {
                    item[2] = '微信';// 判断微信支付类型
                }
                item[3] = `￥${priceFormat(item[3])}`;
            });
            this.props.showDataList = data;
            this.props.oldData = data;
            this.paint();
        });
    }
    // 导出表单
    public exportForm() {
        if (!this.props.showDataList.length) {
            popNewMessage('无邮费列表');

            return;
        }
        const jsonHead = this.props.showTitleList;
        const aoa = [jsonHead];
        const jsonData = this.props.freightList;
        for (const v of jsonData) {
            v[0] = v[0].toString();
            aoa.push(v);
        }
        console.log(aoa);
        exportExcel(aoa,`运费表.xlsx`);
    
        console.log('contentList ===',jsonData);
    }
    // 取消
    public cancel(e:any) {
        notify(e.node,'ev-change-showShop',null);
    }
    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }
}