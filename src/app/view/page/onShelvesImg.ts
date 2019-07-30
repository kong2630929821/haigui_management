// tslint:disable-next-line:missing-jsdoc
import { notify } from '../../../pi/widget/event';
import { Widget } from '../../../pi/widget/widget';
import { addShop, changeShop, getAllArea,  getAllBrand, getShopSale, searchProduct } from '../../net/pull';
import { popNewMessage, timeConvert, transitTimeStamp, unicode2Str } from '../../utils/logic';
import { rippleShow } from '../../utils/tools';
interface Props {
    selectData:any;// 选中的产品
    showDataTitle:any;// 标题
    style:boolean;// 显示状态 true 添加 false修改
    areaId:any;// 国家选择
    areaIdActiveIndex:number;// 地区ID下标
    expandIndex:any ;
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
    searchValue:string;// 搜索值
    searchData:any;// 搜索到的SKU
    areaIdList:any;// 国家ID数组
    brandType:any;// 品牌下拉数组
    brandId:any;// 品牌ID数组
    brandTypeIndex:number;// 品牌数组下标
}
/**
 * 上传商品图片
 */
// tslint:disable-next-line:completed-docs
export class OnShelvesImg extends Widget {
    public props:Props = {
        areaId:[],
        areaIdActiveIndex:0,
        bonded:[],
        bondedActiveIndex:0,
        expandIndex:[false,false,false],
        selectData:[],
        showDataTitle : ['供应商id','SKU','产品名','已下单未支付数量','总销量','库存','供货价','保质期','修改时间','供应商sku','供应商商品ID','收货地址','收件人','联系电话'],
        style:true,
        data:['','','','',''],
        spreadList:[],
        inputTitle:['商品名称','成本价(元)','普通售价(元)','会员价(元)','折扣价(元)'],
        path:'',
        thumbnail:[],
        mainPicture:[],
        infoPicture:[],
        flag:0,
        groupId:0,
        tax:0,
        dataList:[],
        shopId:0,
        disable:false,
        btn:'确认',
        showDateBox:false,
        startTime:'',  // 查询开始时间
        endTime:'', // 查询结束时间
        sale:[0,0],
        searchValue:'',
        searchData:[],
        areaIdList:[],
        brandType:[],
        brandId:[],
        brandTypeIndex:0
    };
    public create() {
        super.create();
        // 是否保税
        const bonded = [
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
        this.props.bonded = bonded;
        this.props.areaId = bonded;
        const oData = new Date();
        const time = oData.setHours(23, 59, 59, 999);
        this.props.endTime =  timeConvert(time);
        this.props.startTime = '2019-05-01';
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
                    this.props.areaIdList.push(v[0]);
                    typeList.push({ status:i,text:unicode2Str(v[1][0]) });
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
        // 获取所有的品牌
        getAllBrand().then(r => {
            this.props.brandType = r[2][1];
            this.props.brandId = r[2][0];
            if (props.dataList) {
                r[2][0].forEach((v,i) => {
                    if (v === props.dataList.brand) {
                        this.props.brandTypeIndex = i;
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
        const price = arr.skus[0][2].split('/');
        this.props.data = [arr.name,Number(price[0]),Number(price[1]),Number(price[2]),Number(arr.discount)];
        this.props.tax = Number(arr.tax);
        if (this.props.dataList.shopType === '保税商品') {
            this.props.bondedActiveIndex = 1;
        } else if (this.props.dataList.shopType === '海外直购') {
            this.props.bondedActiveIndex = 2;
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
                // 详情图  [图片名字，图片描述，图片]
                this.props.infoPicture.push(['','',v]);
            }
        });
        // SUK显示
        arr.skus.forEach(v => {
            searchProduct(v[1]).then(r => {
                this.props.selectData.push(r[0]);
                this.paint();
            });
            this.props.spreadList.push([v[1],Number(v[3])]);
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
        this.props.expandIndex[0] = false;
        this.paint();
    }
    // 是否保税
    public bondedChange(e:any) {
        this.props.bondedActiveIndex = e.activeIndex;
        this.props.expandIndex[1] = false;
        this.paint();
    }
    // 税费
    public taxChange(e:any) {
        this.props.tax = e.value;
    }
    // 输入框变化
    public inputChange(index:number,e:any) {
        this.props.data[index] = e.value;
    }
    // 差价输入变化
    public spread(e:any,index:number) {
        const sku_id = this.props.selectData[index][1];
        this.props.spreadList[index] = [sku_id,Number(e.value)];
    }
    // 缩略图替换/上传
    public updataImg(e:any) {
        this.props.thumbnail[0] = [`${e.src}`,1,1];
        this.paint();
    }
    // 主图替换
    public updataImgMain(index:number,e:any) {
        this.props.mainPicture[index] = [`${e.src}`,2,2];
        this.paint();
    }
    // 详细图替换
    public updataImgInfo(index:number,e:any) {
        this.props.infoPicture[index] = ['','',[`${e.src}`,3,3]];
        this.paint();
    }
    // 添加主图
    public addMainImg(e:any) {
        this.props.mainPicture.push([`${e.src}`,2,2]);
        this.paint();
    }
    // 添加详情图
    public addInfoImg(e:any) {
        this.props.infoPicture.push(['','',[`${e.src}`,3,3]]) ;
        this.paint();
    }
    // 下一步
    public next(e:any) {
        this.close();
        const img = [this.props.thumbnail[0],...this.props.mainPicture];
        // '商品名称','品牌ID','成本价','普通售价','会员价','折扣价'
        let flag = false;// 判断输入的是否有空值
        debugger;
        this.props.data.forEach(v => {
            debugger;
            if (v === '') {
                flag = true;

                return ;
            }
        });
        if (flag) {
            popNewMessage('请输入信息');

            return;
        }
        if (this.props.mainPicture.length === 0 || this.props.infoPicture.length === 0 || this.props.thumbnail.length === 0) {
            popNewMessage('请上传商品图片');

            return ;
        }
        if (this.props.style) {
            if (this.props.spreadList.length === 0) {
                popNewMessage('请填写差价');
    
                return ;
            }
        }
        if (this.props.selectData.length !== this.props.spreadList.length) {
            popNewMessage('请填写差价');
    
            return ;
        }
        if (this.props.selectData.length === 0) {
            popNewMessage('请选择SKU');
    
            return ;
        }
        const name = this.props.data[0];// 商品名称
        const brand = this.props.brandId[this.props.brandTypeIndex];
        const area = Number(this.props.areaIdList[this.props.areaIdActiveIndex]);// 地址ID
        const supplier = this.props.selectData[0][0];// 供应商ID
        const pay_type = 1;// 支付方式
        const cost = Math.round(Number(this.props.data[1]) * 100);// 成本价
        const origin = Math.round(Number(this.props.data[2]) * 100);// 普通售价
        const vip_price = Math.round(Number(this.props.data[3]) * 100);// 会员价
        const has_tax = this.props.bondedActiveIndex;// 是否报税
        let tax = Math.round(Number(this.props.tax) * 100);// 税费
        if (has_tax === 0) {
            tax = 0;
        }
        const discount = this.props.data[4] ? Math.round(Number(this.props.data[4]) * 100) :0;// 折扣价
        const labels = [];// 规格
        this.props.spreadList.forEach(v => {
            labels.push([v[0],Math.round(v[1] * 100)]);
        });
        const images = img;// 图片
        const intro = [];// 商品介绍
        const spec = [];//
        const detail = this.props.infoPicture;// 详情图片
        if (cost > origin || cost > discount || cost > vip_price) {
            popNewMessage('请填写正确的价格');
    
            return ;
        }
        if (tax < 0) {
            popNewMessage('税费不能为负数');

            return;
        }
        const arr = [name,brand,area,supplier,pay_type,cost,origin,vip_price,has_tax,tax,discount,labels,images,intro,spec,detail];
        if (this.props.style) {
            addShop(JSON.stringify(arr)).then(r => {
                if (r.result === 1) {
                    popNewMessage('添加成功');
                    notify(e.node,'ev-change-showShop',{});
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
        this.props.expandIndex = [false,false,false];
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
    // 搜索产品
    public searchProduct() {
        this.close();
        if (!this.props.searchValue) {

            return ;
        }
        searchProduct(this.props.searchValue).then(r => {
            this.props.searchData = r;
            console.log('搜索到的产品',r);
            this.paint();
        });
    }
     // 搜索SKU
    public inputProductChange(e:any) {
        this.props.searchValue = e.value;
    }

    // 删除现有的SKU
    public remove(index:number) {
        this.props.selectData.splice(index,1);
        this.props.spreadList.splice(index,1);
        this.paint();
    }
    // 添加到选中的产品中
    public check(index:number) {
        let flag = false;
        this.props.selectData.forEach(v => {
            if (v[0] !== this.props.searchData[index][0]) {
                flag = true;
            }
        });
        if (flag) {
            popNewMessage('供应商ID不一致');

            return;
        }
        this.props.selectData.push(this.props.searchData[index]);
        this.props.searchData.splice(index,1);
        this.paint();
    }

    // 删除主图图片
    public removeMainImg(index:number) {
        this.props.mainPicture.splice(index,1);
        this.paint();
    }

    // 删除详细图片
    public removeInfoImg(index:number) {
        this.props.infoPicture.splice(index,1);
        this.paint();
    }

    // 品牌选择
    public brandTypeChange(e:any) {
        this.props.brandTypeIndex = e.value;
        this.props.expandIndex[2] = false;
        this.paint();
    }

    // 过滤器变化
    public expand(index:number,e:any) {
        this.close();
        this.props.expandIndex[index] = e.value;
        this.paint();
    }

    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }
}