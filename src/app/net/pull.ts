import { parseOrder, parseOrderShow } from '../utils/tools';
import { Order } from '../view/page/totalOrders';
import { requestAsync } from './login';

/**
 * 通信接口
 */
 // 解析并导入运费信息
export const importFreight = (res) => {
    const arr = []; 
    for (let i = 0;i < res.length;i++) {
        const id = parseInt(res[i].id,10);
        const price_type = parseInt(res[i].price_type,10);
        const price = Number(res[i].price) * 100;
        const tmp = [id,res[i].area,price_type,price];
        arr[i] = tmp;
    } 
    const str = JSON.stringify(arr);
    const msg = { 
        type: 'set_freight_price', 
        param: { 
            input:str
        } 
    };
    
    console.log('msg = ',msg);

    return requestAsync(msg).then(r => {
        alert('导入运费成功');

        return true;
    }).catch((e) => {
        console.log(e);

        return false;
    });
};

export const importGoodsCate = (res) => { 
    const data = {};
    const arr0 = [];// 存放分组
    let arr2 = [];// 存放同一个分组
    let id1 = res[0].分组id; 
    let id2 = '';
    for (let i = 0;i < res.length;i++) {
        if (res[i].一级分组名) {
            id2 = res[i].分组id;
        }
        if (id1 !== id2) {
            arr0.push(arr2);
            arr2 = [];
        }
        if (res[i].分组id.startsWith(id2)) {
            arr2.push(res[i]);
        } 
        id1 = id2;
    } 
    arr0.push(arr2);
    
    for (let i = 0;i < arr0.length;i++) {
        const group = dealGroup(arr0[i]);
        if (!data[group.root]) {
            data[group.root] = [];
        }
        data[group.root].push({ input:group.input,id:arr0[i][0].分组id });
    }
    const reqArray = [];
    for (const k in data) {
        const childs = [];
        let content = [];
        const v = data[k];
        for (const v1 of v) {
            childs.push(Number(v1.id));
            content = content.concat(v1.input);
        }
        const root = [Number(k),'',true,true,[],'',childs];
        reqArray.push({ root:Number(k),value:JSON.stringify([root,...content]) });
    }

    let index = 0;
    const func = () => {
        if (index < reqArray.length) {
            importGoodsCate1(reqArray[index++]).then(() => {
                func();
            });
        } 
    };
    func();
};

export const importGoodsCate1 = (data) => {
    const msg = { 
        type: 'set_group', 
        param: { 
            location:data.root,
            root:data.root,
            input:data.value
        } 
    };
    console.log('msg = ',msg);

    return requestAsync(msg).then(r => {
        alert('导入分组成功');

        return true;
    }).catch((e) => {
        console.log(e);

        return false;
    });
};
 // 解析一个分组
export const dealGroup = (arr2) => {
    const arr = [];
    for (let i = 0;i < arr2.length;i++) {
        const id = parseInt(arr2[i].分组id,10);
        const name = arr2[i].一级分组名 || arr2[i].二级分组名;
        const goodsType = (arr2[i].子商品 === undefined) ? true : false;// 组类型，分为子组和叶组，子组可以包含任意的其它子组或叶组，叶组只允许包含商品
        const is_show = (arr2[i].是否可见 === 'YES') ? true : false;
        const images = []; 
        if (arr2[i].缩略图) images.push([arr2[i].缩略图,1,1]);
        if (arr2[i].主图) images.push([arr2[i].主图,2,1]);
        const detail = arr2[i].分组详细描述;
        const childs = [];
        if (arr2[i].一级分组名) {
            for (let j = 1;j < arr2.length;j++) {
                childs.push(parseInt(arr2[j].分组id,10));
            }
        } 
        if (arr2[i].二级分组名) {
            if (arr2[i].子商品) {
                arr2[i].子商品.split('/').forEach(e => {
                    childs.push(parseInt(e,10));
                });
            }
        } 
        const inputL = [id,name,goodsType,is_show,images,detail,childs];
        arr[i] = inputL;
    } 
    const paramLoc = parseInt(arr2[0].位置,10);
    const paramRoot = parseInt(arr2[0].根id,10);

    return { 
        location:paramLoc,
        root:paramRoot,
        input:arr
    }; 
    
};

 // 解析并导入商品信息
export const importGoods = (res) => {
    const arr = []; 
    for (let i = 0;i < res.length;i++) {
        const id = parseInt(res[i].商品id,10);
        const name = res[i].商品名称;
        const brandId = parseInt(res[i].品牌id,10);
        const areaId = parseInt(res[i].地区id,10);
        const supplierId = parseInt(res[i].供应商id,10);
        const pay_type = parseInt(res[i].支付类型,10);
        const cost = Number(res[i].成本价) * 100;
        const origin = Number(res[i].普通售价) * 100;
        const vip_price = Number(res[i].会员价) * 100;
        const has_tax = res[i].是否保税区的产品 === 'YES' ? true : false;
        const tax = Number(res[i].税费) * 100;
        const discount = res[i].折后价 === undefined ? origin : Number(res[i].折后价) * 100;
        const labels = [];
        res[i].标签.split(',').forEach(e => {
            e = e.replace(/\n/,'');
            labels.push([e.split(':')[0],Number(e.split(':')[1]) * 100]);
        });
        const images = []; 
        if (res[i].缩略图) images.push([res[i].缩略图,1,1]);
        if (res[i].主图) {
            res[i].主图.split(',').forEach(e => {
                e = e.replace(/\n/,'');
                images.push([e,2,1]);
            });
        }
        const intro = '';
        const spec = [];
        const detail = [];
        if (res[i].详情图) {
            res[i].详情图.split(',').forEach(e => {
                e = e.replace(/\n/,'');
                detail.push(['','',[e,3,1]]);
            });
        }
        const tmp = [id,name,brandId,areaId,supplierId,pay_type,cost,origin,vip_price,has_tax,tax,discount,labels,images,intro,spec,detail];
        arr[i] = tmp;
    } 
    const str = JSON.stringify(arr);
    const msg = { 
        type: 'set_goods', 
        param: { 
            input:str
        } 
    };
    console.log('msg = ',msg);

    return requestAsync(msg).then(r => {
        alert('导入商品成功');

        return true;
    }).catch((e) => {
        console.log(e);

        return false;
    });
};

 // 解析并导入供应商信息
export const importSupplier = (res) => {
    const arr = []; 
    for (let i = 0;i < res.length;i++) {
        const id = parseInt(res[i].供应商id,10);
        const name = res[i].供应商名称;
        const detail = res[i].供应商详细描述;
        const images = [];
        const tmp = [id,name,detail,images];
        arr[i] = tmp;
    } 
    const str = JSON.stringify(arr);
    const msg = { 
        type: 'set_supplier', 
        param: { 
            input:str
        } 
    };
    console.log('msg = ',msg);

    return requestAsync(msg).then(r => {
        alert('导入供应商成功');

        return true;
    }).catch((e) => {
        console.log(e);

        return false;
    });
};
 // 解析并导入地区信息
export const importArea = (res) => {
    const arr = []; 
    for (let i = 0;i < res.length;i++) {
        const id = parseInt(res[i].id,10);
        const name = res[i].地区名;
        const detail = '';
        const images = [];
        images.push([res[i].国旗小图,4,1]);
        const tmp = [id,name,detail,images];
        arr[i] = tmp;
    } 
    const str = JSON.stringify(arr);
    const msg = { 
        type: 'set_area', 
        param: { 
            input:str
        } 
    };
    console.log('msg = ',msg);

    return requestAsync(msg).then(r => {
        alert('导入地区成功');

        return true;
    }).catch((e) => {
        console.log(e);

        return false;
    });
};
 // 解析并导入品牌信息
export const importBrand = (res) => {
    const arr = []; 
    for (let i = 0;i < res.length;i++) {
        const id = parseInt(res[i].品牌id,10);
        const name = res[i].品牌名;
        const detail = res[i].品牌详细信息;
        const images = [];
        images.push([res[i].小图,4,1]);
        images.push([res[i].缩略图,1,1]);
        images.push([res[i].主图,2,1]);
        const tmp = [id,name,detail,images];
        arr[i] = tmp;
    } 
    const str = JSON.stringify(arr);
    const msg = { 
        type: 'set_brand', 
        param: { 
            input:str
        } 
    };
    console.log('msg = ',msg);

    return requestAsync(msg).then(r => {
        alert('导入品牌成功');

        return true;
    }).catch((e) => {
        console.log(e);

        return false;
    });
};
 // 解析并导入库存信息
export const importInventory = (res) => {
    const arr = []; 
    for (let i = 0;i < res.length;i++) {
        const id = parseInt(res[i].供应商id,10);
        const sku = res[i].sku;
        let lable = '';
        for (let j = 1;j <= 10;j++) {
            const str = `标签${j}`;
            lable += res[i][str] === undefined ? '' : res[i][str];
        }
        const amount = parseInt(res[i].库存,10);
        const supplierPrice = Number(res[i].供货价) * 100;
        const tmp = [id,sku,lable,amount,supplierPrice];
        arr[i] = tmp;
    } 
    const str = JSON.stringify(arr);
    const msg = { 
        type: 'set_inventory', 
        param: { 
            input:str
        } 
    };
    console.log('msg = ',msg);

    return requestAsync(msg).then(r => {
        alert('导入库存成功');

        return true;
    }).catch((e) => {
        console.log(e);

        return false;
    });
};
 // 解析并导入运单信息
export const importTransport = (res) => {
    const arr = [];
    for (let i = 0;i < res.length;i++) {
        // const supplierId = Number(res[i].供货商ID);
        // const uid = Number(res[i].订单用户ID);
        // const oid = Number(res[i].订单编号);
        // const sid = res[i].物流单号 ? res[i].物流单号 : '';
        // const supplierId = Number(res[i].供货商ID);
        const supplierId = Number(res[i].供货商ID);
        const uid = Number(res[i].用户ID);
        const oid = Number(res[i].订单编号);
        const sid = res[i].物流单号;
        arr.push([supplierId,uid,oid,sid]);
    }
    const str = JSON.stringify(arr);
    const msg = {
        type: 'set_supplier_order', 
        param: { 
            input:str
        } 
    };
    console.log('msg = ',msg);
    requestAsync(msg).then(r => {
        alert('导入运单成功');
    }).catch((e) => {
        console.log(e);
    });
};
// 获取所有供应商
export const getAllSupplier = () => {
    const msg = { 
        type: 'all_supplier',
        param: { 
        } 
    };

    return requestAsync(msg).then(r => {
        console.log('所有的供应商:',r.value);

        return r.value;
    }).catch((e) => {
        console.log(e);
    });
};
// 获取所有有未发货订单的供应商
export const selSupplier = () => {
    const msg = { 
        type: 'select_supplier',
        param: { 
        } 
    };

    return requestAsync(msg).then(r => {
        console.log('所有有未发货订单的供应商:',r.value);
        const supplier = JSON.parse(r.value);
        console.log('所有有未发货订单的供应商:',supplier[0]);
        const supplierId = [];
        for (const v of supplier) {
            supplierId.push(v[0]);
        }
        
        return supplierId;
    }).catch((e) => {
        console.log(e);

        return [];
    });

};
// 按订单编号查询订单
export const getOrderById  = (orderId) => {
    const msg = { 
        type: 'select_orders',
        param: { 
            id:orderId
        } 
    };

    return requestAsync(msg).then(r => {
        return r.value;
    }).catch((e) => {
        console.log(e);
    });
};
// 获取所有订单
export const getAllOrder  = (id,count,time_type,start,tail,sid,orderType,state) => {
    const msg = { 
        type: 'select_all_orders',
        param: { 
            id:id,       // 订单id,等于0表示从最大开始获取，大于0表示从指定订单id开始获取
            count:count,   // 需要获取的订单信息数量，即一页需要显示的数量
            time_type:time_type,    // 时间类型，1下单，2支付，3发货， 4收货，5完成
            start:start ,               // 启始时间，单位毫秒
            tail:new Date().getTime(),                // 结束时间，单位毫秒
            sid:sid,                    // 供应商id，等于0表示所有供应商，大于0表示指定供应商
            type:orderType,                // 订单类型，0失败，1待支付，2待发货，3待收货，4待完成
            state:state                // 订单状态，0未导出，1已导出
        } 
    };

    return requestAsync(msg).then(r => {
        console.log('r=',r);
        const infos = <Order[]>JSON.parse(r.value);
        if (!infos) {
            alert('暂无数据');

            return [];
        }
        const ordersShow = parseOrderShow(infos,orderType);
        console.log('orders =====',ordersShow);

        return ordersShow;
    }).catch((e) => {
        console.log(e);

        return '';
    });
};
// 获取指定供应商指定类型的订单
export const getOrder  = (supplier,Ordertype,oids) => {
    const msg = { 
        type: 'select_supplier_order',
        param: { 
            id:supplier,
            type:Ordertype,
            oids
        } 
    };

    return requestAsync(msg).then(r => {
        const infos = <Order[]>JSON.parse(r.value);
        if (!infos) {
            alert('暂无数据');

            return [];
        }
        const ordersShow = parseOrderShow(infos,Ordertype);
        console.log('orders =====',ordersShow);

        return ordersShow;
    }).catch((e) => {
        console.log(e);

        return 0;
    });
};
// 获取用户退货记录
export const getRreturnGoods = () => {
    const msg = { 
        type: 'get_return_goods',
        param: { 
            // id:supplier,
            // type:Ordertype
            id:1011002,
            type:2
        } 
    };
    requestAsync(msg).then(r => {
        console.log('r=',r);

        return r;
    }).catch((e) => {
        console.log(e);
    });
};

/**
 * 获取海王统计信息
 */
export const getHwangTotal = () => {
    const msg = {
        type:'mall_mgr/members@get_haiwang_application_total',
        param:{}
    };

    return requestAsync(msg);
};

/**
 * 获取海王申请列表
 */
export const getHWangApply = (stTime?:number,edTime?:number) => {
    const msg = {
        type:'mall_mgr/members@get_haiwang_application',
        param:{
            start_time: stTime || 0,
            end_time: edTime || Date.now()
        }
    };

    return requestAsync(msg);
};

/**
 * 修改海王申请状态
 * @param id id
 * @param uid uid
 * @param state 1: 处理中 2：同意 3：拒绝
 */
export const changeHWangState = (id:number,uid:number,state:number) => {
    const msg = {
        type:'mall_mgr/members@haiwang_application_state',
        param:{
            id,
            uid,
            state
        }
    };

    return requestAsync(msg);
};

/**
 * 获取提现统计
 */
export const getWithdrawTotal = () => {
    const msg = {
        type:'mall_mgr/members@get_withdraw_total',
        param:{}
    };

    return requestAsync(msg);
};
/**
 * 获取提现申请列表
 */
export const getWithdrawApply = (stTime?:number,edTime?:number) => {
    const msg = {
        type:'mall_mgr/members@get_withdraw_info',
        param:{
            start_time:stTime || 0,
            end_time:edTime || Date.now()
        }
    };

    return requestAsync(msg);
};

/**
 * 修改提现状态
 * @param id id
 * @param uid uid
 * @param state 1: 处理中 2：同意 3：拒绝
 */
export const changeWithdrawState = (id:number,uid:number,state:number) => {
    const msg = {
        type:'mall_mgr/members@withdraw_application_state',
        param:{
            id,
            uid,
            state
        }
    };

    return requestAsync(msg);
};

/**
 * 获取会员列表
 */
export const getVipMember = () => {
    const msg = {
        type:'mall_mgr/members@get_level_user',
        param:{}
    };

    return requestAsync(msg);
};

/**
 * 查看会员详情
 */
export const getVipDetail = (uid:number) => {
    const msg = {
        type:'mall_mgr/members@get_level_details',
        param:{
            uid
        }
    };

    return requestAsync(msg);
};

/**
 * 登录
 * @param user user
 * @param password pwd
 */
export const login = (user:string,password:string) => {
    const msg = {
        type:'mgr_login',
        param:{
            user,
            password
        }
    };

    return requestAsync(msg);
};

/**
 * 设置海王标签
 */
export const setHwangLabel = (uid:number,label:number) => {
    const msg = {
        type:'mall_mgr/members@set_haiwang_label',
        param:{
            uid,
            label
        }
    };

    return requestAsync(msg);
};
// select_goods_keys
export const getGoodsKey = (count:number) => {
    const msg = {
        type:'select_goods_keys',
        param:{
            count
        }
    };

    return requestAsync(msg).then(r => {

        return r;
    }).catch(e => {
        console.log(e);
    });
};
// 获取所有的商品信息，支付分页
export const getAllGoods = (star:number,num:number) => {
    const msg = { 
        type: 'select_all_goods',
        param: { 
            id:star,
            count:num
        } 
    };
    
    return requestAsync(msg).then(r => {
        // console.log('r=',r);

        return r;
    }).catch((e) => {
        console.log(e);
    });
};
// 获取当前商品的信息
export const getCurrentGood = (shopValue:string) => {
    let shopID = 0;
    let shopName = '';
    if (isNaN(parseInt(shopValue))) {
        shopName = shopValue;
    } else {
        shopID = parseInt(shopValue);
    }
    const msg = {
        type:'select_goods',
        param:{
            id:shopID,
            name:shopName
        }
    };

    return requestAsync(msg).then(r => {
        
        return r;
    }).catch(e => {
        console.log(e);
    });
};

// 获取所有退货信息
export const getReturnGoods = (id:number,count:number,start:number,tail:number,state:number) => {
    const msg = {
        type:'select_all_return_goods',
        param:{
            id,
            count,
            start,
            tail,
            state
        }
    };

    return requestAsync(msg).then(r => {

        return r;
    }).catch(e => {
        console.log(e);
    });
};

// 订单号查询退货信息
export const getReturnGoodsId = (id:number) => {
    const msg = {
        type:'select_return_goods',
        param:{
            id
        }
    };

    return requestAsync(msg).then(r => {

        return r;
    }).catch(e => {
        console.log(e);
    });
};

// 改变退货状态
export const getReturnStatus = (uid:number,id:number,state:number) => {
    const msg = {
        type:'set_return_goods',
        param:{
            uid,
            id,
            state
        }
    };

    return requestAsync(msg).then(r => {

        return r;
    }).catch(e => {
        console.log(e);
    });
};

// 获取最新导入时间
export const getExportTime = () => {
    const msg = {
        type:'get_new_import_time',
        param:{
        }
    };

    return requestAsync(msg).then((r) => {
        console.log(r);

        return r;
    }).catch((e) => {
        console.log(e);
    });
};