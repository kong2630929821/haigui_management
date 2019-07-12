// tslint:disable-next-line:missing-jsdoc
import { notify } from '../../../pi/widget/event';
import { Widget } from '../../../pi/widget/widget';
import { addShop, changeShop, getAllArea, getClassType, getGroupsByLocation, getShopSale, searchProduct } from '../../net/pull';
import { popNewMessage, timeConvert, transitTimeStamp } from '../../utils/logic';
import { isInputValue, parseAllGroups, parseGroups } from '../../utils/tools';
interface Props {
    selectData:any;// 选中的产品
    showDataTitle:any;// 标题
    style:boolean;// 显示状态 true 添加 false查看
    areaId:any;// 地区ID选择
    areaIdActiveIndex:number;// 地区ID下标
    expandIndex:number ;
    classType1:any;// 分类1
    classTypeOneActiveIndex:number;// 分类下标
    bonded:any;// 是否报税
    bondedActiveIndex:number;// 报税ID
    data:any;// 输入框数据
    spreadList:any;// 差价列表
    inputTitle:any;// 输入框标题
    path:string;// 图片路径
    thumbnail:any;// 缩略图
    mainPicture:any;// 主图
    infoPicture:any;// 详情图
    flag:number;// 用来判断用户是否全部填写
    classType2:any;
    classTypeTwoActiveIndex:number;
    classList:any;
    groupId:number;
    tax:number;// 税费
    dataList:any;// 编辑传入的数据
    shopId:number;// 商品ID
    disable:boolean;// 是否可修改
    btn:string;// 按钮名称
    showDateBox:boolean;// 时间选择
    startTime:string;// 开始时间
    endTime:string;// 借宿时间
    sale:any;// 销售量 【总销售量，时间段销售量】

}
/**
 * 上传商品图片
 */
// tslint:disable-next-line:completed-docs
export class OnShelvesImg extends Widget {
    public props:Props = {
        areaId:[],
        areaIdActiveIndex:0,
        classType1:[],
        classTypeOneActiveIndex:0,
        bonded:[],
        bondedActiveIndex:0,
        expandIndex:-1,
        selectData:[],
        showDataTitle : ['供应商id','SKU','产品名','已下单未支付数量','总销量','库存','供货价','保质期','修改时间','供应商sku','供应商商品ID','收货地址','收件人','联系电话'],
        style:true,
        data:[],
        spreadList:[],
        inputTitle:['商品名称','品牌ID','成本价','普通售价','会员价','折扣价'],
        path:'',
        thumbnail:[],
        mainPicture:[],
        infoPicture:[],
        flag:0,
        classType2:[],
        classTypeTwoActiveIndex:0,
        classList:[],
        groupId:0,
        tax:0,
        dataList:[],
        shopId:0,
        disable:false,
        btn:'保存',
        showDateBox:false,
        startTime:'',  // 查询开始时间
        endTime:'', // 查询结束时间
        sale:[0,0]
    };
    public create() {
        super.create();
        // 分类筛选
        const classType = [
            {
                status:0,
                text:'分类1'
            },{
                status:1,
                text:'分类2'
            }
        ];
        // 是否保税
        const bonded = [
            {
                status:0,
                text:'否'
            },{
                status:1,
                text:'是'
            }
        ];
      
        this.props.classType1 = classType;
        this.props.classType2 = classType;
        this.props.bonded = bonded;
        this.props.areaId = bonded;
        const oData = new Date();
        const time = oData.setHours(23, 59, 59, 999);
        this.props.endTime =  timeConvert(time);
        this.props.startTime = '2019-05-01 00:00:000';
    }

    // tslint:disable-next-line:max-func-body-length
    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        const typeList = [];
        // 获取地址ID
        getAllArea().then(r => {
            if (r.result === 1) {
                const data = r.areaInfo;
                data.forEach((v,i) => {
                    typeList.push({ status:i,text:v[0].toString() });
                });
                this.props.areaId = typeList;

                if (props.dataList) {
      
                    data.forEach((v,i) => {
                        if (v[0] === props.dataList.area) {
                            this.props.areaIdActiveIndex = i;
                        }
                    });
                }  
                this.paint();
            }
        });
         // 获取一级分类默认设置二级分类;
        const typeClass1 = [];
        let typeClass2 = [];
        getGroupsByLocation().then(res => {
            const data = parseAllGroups(res.groupInfo);
            data.forEach(r => {
                r.groups.forEach(v => {
                    const class2 = [];
                    v.children.forEach(t => { 
                        class2.push([t.id,t.name]);
                    });
                    this.props.classList.push([v.id,v.name,class2]);
                   
                });
            });
            
            this.props.classList.forEach((r,t) => {
                typeClass1.push({ status:t,text:r[1] });
            });
            this.props.classType1 = typeClass1;
            this.props.classList[0][2].forEach((v,i) => {
                typeClass2.push({ status:i,text:v[1] });
            });
            this.props.groupId = this.props.classList[0][2][0][0];
            this.props.classType2 = typeClass2;
            if (props.dataList) {
                this.props.classList.forEach((v,i) => {
                    if (v[0] === props.dataList.typeName_1[0][0]) {
                        this.props.classTypeOneActiveIndex = i;
                        typeClass2 = [];
                        this.props.classList[i][2].forEach((item,index) => {
                            typeClass2.push({ status:index,text:item[1] });
                        });
                        this.props.classType2 = typeClass2;
                        v[2].forEach((item,index) => {
                            if (item[0] === props.dataList.typeName_2[0][0]) {
                                this.props.classTypeTwoActiveIndex = index;
                                this.paint();
                            }
                        });
                    }
                });
            } 
            this.paint();
        });
        const oData = new Date();
        this.props.path = `goods/${oData.getFullYear()}/${oData.getMonth() + 1}/${oData.getDate()}`;
        const arr = this.props.dataList;
        if (!arr.id) {
            return;
        }
        // ['商品名称','品牌ID','成本价','普通售价','会员价','折扣价']
        const price = arr.type[0][2].split('/');
        this.props.data = [arr.name,arr.brand,Math.floor(Number(price[0]) * 100),Math.floor(Number(price[1]) * 100),Math.floor(Number(price[2]) * 100),Math.floor(Number(arr.discount) * 100)];
        this.props.tax = Math.floor(Number(arr.tax) * 100);
        if (this.props.dataList.shopType === '保税商品') {
            this.props.bondedActiveIndex = 1;
        }
        // 图片展示
        arr.img.forEach(v => {
            if (v[1] === 1) {
                // 缩略图
                this.props.thumbnail.push(v);
                const imgList = v[0].split('/');
                imgList.pop();
                this.props.path = imgList.join('/');
            } else if (v[1] === 2) {
                // 主图
                this.props.mainPicture.push(v);
            } else if (v[1] === 3) {
                // 详情图
                this.props.infoPicture.push(v);
            }
        });
        // SUK显示
        arr.type.forEach(v => {
            searchProduct(v[1]).then(r => {
                this.props.selectData.push(r[0]);
                this.paint();
            });
            this.props.spreadList.push([v[1],Math.floor(Number(v[3]) * 100)]);
        });
        // 商品ID
        this.props.shopId = arr.id;
        this.props.btn = '修改';

        // 获取当前商品的销售量
        getShopSale(arr.id,transitTimeStamp(this.props.startTime),transitTimeStamp(this.props.endTime)).then(r => {
            if (r.result === 1) {
                const amount = r.amount;
                this.props.sale = [amount[0],amount[1]];
                this.paint();
            }
        });
    }
    // 地区ID选择
    public areaIdChange(e:any) {
        this.props.areaIdActiveIndex = e.activeIndex;
        this.paint();
    }
    // 一级分类选择改变二级分类
    public classTypeChange1(e:any) {
        const typeClass2 = [];
        const index = e.activeIndex;
        this.props.classTypeOneActiveIndex = index;
        this.props.classList[index][2].forEach((v,i) => {
            typeClass2.push({ status:i,text:v[1] });
        });
        this.props.groupId = this.props.classList[index][2][0][0];
        this.props.classType2 = typeClass2;
        this.paint();
    }
    public classTypeChange2(e:any) {
        this.props.classTypeTwoActiveIndex = e.activeIndex;
        this.paint();
    }
    // 是否保税
    public bondedChange(e:any) {
        this.props.bondedActiveIndex = e.activeIndex;
        this.paint();
    }
    // 税费
    public taxChange(e:any) {
        this.props.tax = e.value;
        this.props.flag++;
    }
    // 输入框变化
    public inputChange(index:number,e:any) {
        this.props.data[index] = e.value;
        this.props.flag++;
    }
    // 差价输入变化
    public spread(e:any,index:number) {
        const sku_id = this.props.selectData[index][1];
        this.props.spreadList[index] = [sku_id,parseInt(e.value)];
    }
    // 缩略图上传
    public updataImg(e:any) {
        this.props.thumbnail = [`${e.src}`,1,1];
        this.paint();
    }
    // 主图上传
    public updataImgMain(index:number,e:any) {
        this.props.mainPicture[index] = [`${e.src}`,2,2];
        this.paint();
    }
    // 详细图
    public updataImgInfo(index:number,e:any) {
        this.props.infoPicture[index] = [[],[],[`${e.src}`,3,3]];
        this.paint();
    }
    // 添加主图
    public addMainImg(e:any) {
        this.props.mainPicture.push([`${e.src}`,2,2]);
        this.paint();
    }
    // 添加详情图
    public addInfoImg(e:any) {
        this.props.infoPicture.push([[],[],[`${e.src}`,3,3]]) ;
        this.paint();
    }
    // 下一步
    public next(e:any) {
        console.log(this.props.selectData);
        console.log(this.props.data);
        console.log(this.props.spreadList);
        this.props.mainPicture.unshift(this.props.thumbnail[0]);
        // '商品名称','品牌ID','成本价','普通售价','会员价','折扣价'
        const name = this.props.data[0];// 商品名称
        const brand = Number(this.props.data[1]);// 品牌ID
        const area = Number(this.props.areaId[this.props.areaIdActiveIndex].text);// 地址ID
        const supplier = this.props.selectData[0][0];// 供应商ID
        const pay_type = 1;// 支付方式
        const cost = Number(this.props.data[2]);// 成本价
        const origin = Number(this.props.data[3]);// 普通售价
        const vip_price = Number(this.props.data[4]);// 会员价
        const has_tax = this.props.bondedActiveIndex ? true :false;// 是否报税
        const tax = Number(this.props.tax);// 税费
        const discount = this.props.data[5] ? Number(this.props.data[5]) :0;// 折扣价
        const labels = this.props.spreadList;// 规格
        const images = this.props.mainPicture;// 图片
        const intro = [];// 商品介绍
        const spec = [];//
        const detail = this.props.infoPicture;// 详情图片
        const group = Number(this.props.groupId);// 分组
        // if (isInputValue(brand) || isInputValue(cost) || isInputValue(origin) || isInputValue(vip_price) || isInputValue(tax) || isInputValue(discount)) {
        //     popNewMessage('填写商品信息错误');

        //     return;
        // }
        const arr = [name,brand,area,supplier,pay_type,cost,origin,vip_price,has_tax,tax,discount,labels,images,intro,spec,detail,group];
        if (this.props.style) {
            addShop(JSON.stringify(arr)).then(r => {
                if (r.result === 1) {
                    popNewMessage('添加成功');
                    notify(e.node,'ev-change-showShopOk',{});
                } else {
                    popNewMessage('添加失败');
                }

            }).catch(e => {
                popNewMessage('添加失败');
            });
        } else {
            arr.unshift(this.props.shopId);
            changeShop(JSON.stringify(arr)).then(r => {
                if (r.result === 1) {
                    popNewMessage('修改成功');
                    notify(e.node,'ev-change-showShop',{});
                } else {
                    popNewMessage('修改失败');
                }
            });
        }
    }
    // 取消
    public gotoShop(e:any) {
        if (this.props.disable) {
            notify(e.node,'ev-change-cancel',{});
            
            return;
        }
        if (this.props.style) {
            // 添加
            notify(e.node,'ev-change-cancel',{});
        } else {
            // 修改
            notify(e.node,'ev-change-cancel',{});  
        } 
    }

    // 页面点击
    public close() {
        this.props.expandIndex++;
        // 判断时间选择框是否展开过
        if (this.props.showDateBox) {
            console.log('时间筛选',this.props.startTime,this.props.endTime);
               // 获取当前商品的销售量
            getShopSale(this.props.shopId,transitTimeStamp(this.props.startTime),transitTimeStamp(this.props.endTime)).then(r => {
                if (r.result === 1) {
                    const amount = r.amount;
                    this.props.sale = [amount[0],amount[1]];
                    this.paint();
                }
            });
        }
        this.props.showDateBox = false;
        this.paint();
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
}