import { httpPort, sourceIp } from '../config';
import { popNewMessage, priceFormat, timestampFormat,  unicode2Str } from '../utils/logic';
import { analyzeGoods, parseOrderShow, processingGrouping, supplierProcessing } from '../utils/tools';
import { Order, OrderStatus } from '../view/page/totalOrders';
import { requestAsync } from './login';

/**
 * 通信接口
 */
 // 导入运费信息
export const importFreight = (str) => {
    const msg = { 
        type: 'set_freight_price', 
        param: { 
            input:str
        } 
    };
    
    console.log('msg = ',msg);

    return requestAsync(msg).then(r => {
        popNewMessage('导入运费成功');

        return true;
    }).catch((e) => {
        console.log(e);

        return false;
    });
};
// 导入分类信息
export const importGoodsCate = (data) => {
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
        popNewMessage('导入分组成功');

        return true;
    }).catch((e) => {
        console.log(e);

        return false;
    });
};

 // 解析并导入商品信息
export const importGoods = (str) => {
    const msg = { 
        type: 'set_goods', 
        param: { 
            input:str
        } 
    };
    console.log('msg = ',msg);

    return requestAsync(msg).then(r => {
        popNewMessage('导入商品成功');

        return true;
    }).catch((e) => {
        console.log(e);

        return false;
    });
};

 // 解析并导入供应商信息
export const importSupplier = (str) => {
    const msg = { 
        type: 'set_supplier', 
        param: { 
            input:str
        } 
    };
    console.log('msg = ',msg);

    return requestAsync(msg).then(r => {
        popNewMessage('导入供应商成功');

        return true;
    }).catch((e) => {
        console.log(e);

        return false;
    });
};
 // 解析并导入地区信息
export const importArea = (str) => {
    const msg = { 
        type: 'set_area', 
        param: { 
            input:str
        } 
    };
    console.log('msg = ',msg);

    return requestAsync(msg).then(r => {
        popNewMessage('导入地区成功');

        return true;
    }).catch((e) => {
        console.log(e);

        return false;
    });
};
 // 解析并导入品牌信息
export const importBrand = (str) => {
    const msg = { 
        type: 'set_brand', 
        param: { 
            input:str
        } 
    };
    console.log('msg = ',msg);

    return requestAsync(msg).then(r => {
        popNewMessage('导入品牌成功');

        return true;
    }).catch((e) => {
        console.log(e);

        return false;
    });
};
 // 解析并导入库存信息
export const importInventory = (str) => {
        
    const msg = { 
        type: 'set_inventory', 
        param: { 
            input:str
        } 
    };
    console.log('msg = ',msg);
        
    return requestAsync(msg).then(r => {
        popNewMessage('导入库存成功');
        
        return true;
    }).catch((e) => {
        console.log(e);
        
        return false;
    });
};
 // 解析并导入运单信息
export const importTransport = (res) => {
    const maps = new Map();
    for (let i = 0;i < res[1].length;i++) {
        const ret = res[1][i];
        const supplierId = Number(ret.供货商ID);
        const uid = Number(ret.用户ID);
        const oid = Number(ret.订单编号);
        const sid = ret.物流单号;
        const item = maps.get(oid);
        if (!item) {
            maps.set(oid,[supplierId,uid,oid,sid]);
        } else {   // 一个订单多个商品  并且有多个物流
            let sids = item[3];
            if (sids.indexOf(sid) < 0) {
                sids = `${sids}/${sid}`;
            }
            maps.set(oid,[supplierId,uid,oid,sids]);
        }
    }

    const arr = [];
    for (const [k,v] of maps) {
        arr.push(v);
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
        popNewMessage('导入运单成功');
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
        const infos = <Order>JSON.parse(r.value);
        if (!infos) {
            return [[],[]];
        }
        const ordersShow = parseOrderShow([infos],OrderStatus.ALL);
        console.log('ordersShow =====',ordersShow);
        console.log('orders =====',infos);

        return [[infos],ordersShow];

    }).catch((e) => {
        console.log(e);
        
        return [];
    });
};

// 获取第count个订单的id
export const getOrderKey = (count,time_type,start,tail,sid,orderType,state) => {
    let startTimestamp = 0; 
    let endTimestamp = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
    if (start) {
        startTimestamp = new Date(start).getTime();
    }
    if (tail) {
        endTimestamp = new Date(tail).getTime();
    }
    const msg = {
        type:'select_all_orders_keys',
        param:{
            id:0,       // 订单id,等于0表示从最大开始获取，大于0表示从指定订单id开始获取
            count:count,   // 需要获取的订单信息数量，即一页需要显示的数量
            time_type:time_type,    // 时间类型，1下单，2支付，3发货， 4收货，5完成
            start:startTimestamp ,               // 启始时间，单位毫秒
            tail:endTimestamp,                // 结束时间，单位毫秒
            sid:sid,                    // 供应商id，等于0表示所有供应商，大于0表示指定供应商
            type:orderType,                // 订单类型，0失败，1待支付，2待发货，3待收货，4待完成
            state:state                // 订单状态，0未导出，1已导出
        }
    };

    return requestAsync(msg).then(r => {
        const infos = <any[]>JSON.parse(r.value);
        if (!infos) {
            return [[],[]];
        }
        const ordersShow = parseOrderShow([infos[0]],orderType);
        console.log('select_all_orders_keys',ordersShow);
        console.log('select_all_orders_keys',infos[1]);

        return [ordersShow,infos[1]];
    });
};
// 获取所有订单
export const getAllOrder  = (id,count,time_type,start,tail,sid,orderType,state) => {
    let startTimestamp = 0; 
    let endTimestamp = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
    if (start) {
        startTimestamp = new Date(start).getTime();
    }
    if (tail) {
        endTimestamp = new Date(tail).getTime();
    }

    return fetch(`http://${sourceIp}:${httpPort}/console/select_all_orders?id=${id}&count=${count}&time_type=${time_type}&start=${startTimestamp}&tail=${endTimestamp}&sid=${sid}&type=${orderType}&state=${state}`).then(res => {
        return res.json().then(r => {
            console.log(r);
            if (!r.value) {
                return [[],[]];
            }
            const infos = <Order[]>JSON.parse(r.value);
            if (!infos) {
                return [[],[]];
            }
            const ordersShow = parseOrderShow(infos,orderType);
            console.log('ordersShow =====',ordersShow);
            console.log('orders =====',infos);

            return [infos,ordersShow];
        }).catch(e => {
            return  [[],[]];
        });
      
    });
    // const msg = { 
    //     type: 'select_all_orders',
    //     param: { 
    //         id:id,       // 订单id,等于0表示从最大开始获取，大于0表示从指定订单id开始获取
    //         count:count,   // 需要获取的订单信息数量，即一页需要显示的数量
    //         time_type:time_type,    // 时间类型，1下单，2支付，3发货， 4收货，5完成
    //         start:startTimestamp ,               // 启始时间，单位毫秒
    //         tail:endTimestamp,                // 结束时间，单位毫秒
    //         sid:sid,                    // 供应商id，等于0表示所有供应商，大于0表示指定供应商
    //         type:orderType,                // 订单类型，0失败，1待支付，2待发货，3待收货，4待完成
    //         state:state                // 订单状态，0未导出，1已导出
    //     } 
    // };

    // return requestAsync(msg).then(r => {
    //     console.log('r=',r);
    //     if (!r.value) {
    //         return [[],[]];
    //     }
    //     const infos = <Order[]>JSON.parse(r.value);
    //     if (!infos) {
    //         return [[],[]];
    //     }
    //     const ordersShow = parseOrderShow(infos,orderType);
    //     console.log('ordersShow =====',ordersShow);
    //     console.log('orders =====',infos);

    //     return [infos,ordersShow];
    // }).catch((e) => {
    //     console.log(e);

    //     return  [[],[]];
    // });

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
            popNewMessage('暂无数据');

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

    return requestAsync(msg).then(r => {
        return r;
    }).catch(e => {

        return e;
    });
};

/**
 * 获取会员列表    
 */
export const getVipMember = () => {
    // const msg = {
    //     type:'mall_mgr/members@get_level_user',
    //     param:{}
    // };

    // return requestAsync(msg);
    return fetch(`http://${sourceIp}:${httpPort}/members/get_level_user`).then(res => res.json());
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
export const getAllGoods = (star:number,num:number,state:number,start_time:number,end_time:number) => {
    
    return fetch(`http://${sourceIp}:${httpPort}/console/select_all_goods?id=${star}&count=${num}&state=${state}&start_time=${start_time}&end_time=${end_time}`).then(res => {
        // return res.json();
        return res.json().then(r => {
            const data = JSON.parse(r.value);

            return analyzeGoods(data);
        });
    });
};
// 获取当前商品的信息
export const getCurrentGood = (shopValue:string) => {
    let shopID = 0;
    let shopName = '';
    let supplier_id = 0;
    if (isNaN(parseInt(shopValue))) {
        shopName = shopValue;
    } else {
        if (shopValue.indexOf('1011') !== -1) {
            supplier_id = parseInt(shopValue);
        } else {
            shopID = parseInt(shopValue);
        }
        
    }
    const msg = {
        type:'select_goods',
        param:{
            id:shopID,
            name:shopName,
            supplier_id
        }
    };
  
    return requestAsync(msg).then(r => {
        const data = JSON.parse(r.value);
    
        return analyzeGoods(data);
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

// 取消订单
export const quitOrder = (orderId:number) => {
    const msg = {
        type:'console_cancel_order',
        param:{
            id:orderId
        }
    };
    
    return requestAsync(msg).then((r) => {
        console.log(r);

        return r;
    }).catch((e) => {
        console.log(e);
    });

};

// 修改资产
// tslint:disable-next-line:no-reserved-keywords
export const changeMoney = (type:number,uid:number,money:number) => {
    const msg = {
        type:'console_alter_balance',
        param:{
            type,
            uid,
            money,
            note:''
        }
    };

    return requestAsync(msg).then(r => {
        console.log(r);
        
        return r;
    }).catch(e => {
        console.log(e);
    });
};
// 获取所有产品信息
export const getAllProduct = (start_time:number,end_time:number) => {
    return fetch(`http://${sourceIp}:${httpPort}/console/select_all_inventory?start_time=${start_time}&end_time=${end_time}`).then(res => {
        return res.json().then(r => {
            
            const data = JSON.parse(r.value);
            const num = data[0];
            console.log(data);
            const arr = [];
            data[1].forEach((element,index) => {
                arr.push(element);
                const item = element[0];
                const returnGoodsInfo = element[10];
                arr[index].splice(0,1);
                arr[index].unshift(...item);
                arr[index][6] = `￥${priceFormat(arr[index][6])}`;
                arr[index][8] = timestampFormat(arr[index][8]);
                if (arr[index][7].length) {
                    arr[index][7] = `${timestampFormat(arr[index][7][0])}~${timestampFormat(arr[index][7][1])}`;
                }
                arr[index][12] = '';
                arr[index][13] = '';
                if (returnGoodsInfo.length) {
                    arr[index][11] = returnGoodsInfo[0];
                    arr[index][12] = returnGoodsInfo[1];
                    arr[index][13] = returnGoodsInfo[2];
                }

            });

            return [num,arr];
            
        });
    });
};
// 搜索产品信息
export const searchProduct = (keyValue:any) => {
    let product_id = 0;
    let sku = '';
    if (keyValue.indexOf('1011') === -1) {
        sku = keyValue;
    } else {
        product_id = parseInt(keyValue);
    }

    return fetch(`http://${sourceIp}:${httpPort}/console/select_inventory?id=${product_id}&name=${sku}`).then(res => {
        return res.json().then(r => {
            const data = JSON.parse(r.value);
            if (!data) {
                return [];
            }
            console.log(data);
            const arr = [];
            data.forEach((element,index) => {
                arr.push(element);
                const item = element[0];
                const returnGoodsInfo = element[10];
                arr[index].splice(0,1);
                arr[index].unshift(...item);
                arr[index][6] = `￥${priceFormat(arr[index][6])}`;
                arr[index][8] = timestampFormat(arr[index][8]);
                if (arr[index][7].length) {
                    arr[index][7] = `${timestampFormat(arr[index][7][0])}~${timestampFormat(arr[index][7][1])}`;
                }
                arr[index][12] = '';
                arr[index][13] = '';
                if (returnGoodsInfo.length) {
                    arr[index][11] = returnGoodsInfo[0];
                    arr[index][12] = returnGoodsInfo[1];
                    arr[index][13] = returnGoodsInfo[2];
                }
            });

            return arr;
        }).catch(e => {
            console.log(e);
        });
    });
};
// 新增产品信息
export const addProduct = (sku:string,supplier:number,sku_name:string,inventory:number,supplier_price:number,shelf_life:any,supplier_sku:number,supplier_goodsId:number, return_address:any) => {
    const msg = {
        type:'new_inventory',
        param:{
            sku,
            supplier,
            sku_name,
            inventory,
            supplier_price,
            shelf_life,
            supplier_sku,
            supplier_goodsId,
            return_address
        }
    };

    return requestAsync(msg);
};
// 编辑产品信息
export const editInventory = (sku:string,supplier:number,sku_name:string,inventory:number,supplier_price:number,shelf_life:any,supplier_sku:number,supplier_goodsId:number, return_address:any) => {
    const msg = {
        type:'edit_inventory',
        param:{
            sku,
            supplier,
            sku_name,
            inventory,
            supplier_price,
            shelf_life,
            supplier_sku,
            supplier_goodsId,
            return_address
        }
    };

    return requestAsync(msg);
};
// 获取所有供应商
export const getAllSuppliers = (ids?:any) => {
    const msg = { 
        type: 'console_get_supplier',
        param: { 
        } 
    };
    if (ids) {
        msg.param = { ids:ids };
    }

    return requestAsync(msg).then(r => {
        if (r.result === 1) {
            const data = r.supplierInfo;
            
            return [data,supplierProcessing(data)];
        }
    }).catch(e => {
        
        return [[],[]];
    });
};
// 获取分组信息
export const getGroup = (typeStatus:number) => {
    const msg = {
        type:'console_get_group',
        param:{
            type:typeStatus
        }
    };
   
    return requestAsync(msg).then(r => {
        const res = r.groupInfo;
     
        return processingGrouping(res);
    }).catch(e => {
        console.log(e);
    });
};

// 商品上下架
export const shelf = (id:number,state:number) => {
    const msg = {
        type:'set_goods_sale',
        param:{
            id,
            state
        }
    };

    return requestAsync(msg);
};
// 获取所有地区ID
export const getAllArea = () => {
    const msg = {
        type:'console_get_area',
        param:{}
    };

    return requestAsync(msg);
};

// 新增供应商
export const addSupplier = (supplier:number,supplier_name:string,supplier_desc:string,supplier_image:any,supplier_phone:string) => {
    const msg = {
        type:'console_add_supplier',
        param:{
            supplier,
            supplier_name,
            supplier_desc,
            supplier_image,
            supplier_phone 
        }
    };

    return requestAsync(msg);
};