import { httpPort, sourceIp } from '../config';
import { deepCopy, setStore } from '../store/memstore';
import { popNewMessage, priceFormat, timestampFormat, unicode2Str } from '../utils/logic';
import { analyzeGoods, brandProcessing, parseGoodsList, parseOrderShow, processingBalanceLog, processingGroupingType, processingLogs, processingPostage, processingShare, processingShoppingTop10, processingShopSetting, processingUser, processingUserLevelChange, processingUserType, processingVip, supplierProcessing } from '../utils/tools';
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
export const getOrderById  = (orderId:any) => {
    let src = '';
    if (/^1[3456789]\d{9}$/.test(orderId)) { 
        // 手机号码
        src = `http://${sourceIp}:${httpPort}/console/select_orders?phone=${orderId}`;
    } else if (orderId.indexOf('1051') !== -1) {
        // 订单
        src = `http://${sourceIp}:${httpPort}/console/select_orders?id=${Number(orderId)}`;
    } else {
        // 用户ID
        src = `http://${sourceIp}:${httpPort}/console/select_orders?uid=${Number(orderId)}`;
    } 

    return fetch(src).then(res => {
        return res.json().then(r => {
            
            let infos = JSON.parse(r.value);
            if (!infos[0].length) {
                infos = [infos];
            }
            if (!infos) {
                return [[],[]];
            }
            const ordersShow = parseOrderShow(infos,OrderStatus.ALL);
            console.log('ordersShow =====',ordersShow);
            console.log('orders =====',infos);
    
            return [infos,ordersShow];
        }). catch (e => {
            return [[],[]];
        });
      
    });
    // const msg = { 
    //     type: 'select_orders',
    //     param: { 
    //         id:orderId,
    //         uid,
    //         phone
    //     } 
    // };

    // return requestAsync(msg).then(r => {
    //     const infos = <Order>JSON.parse(r.value);
    //     if (!infos) {
    //         return [[],[]];
    //     }
    //     const ordersShow = parseOrderShow([infos],OrderStatus.ALL);
    //     console.log('ordersShow =====',ordersShow);
    //     console.log('orders =====',infos);

    //     return [[infos],ordersShow];

    // }).catch((e) => {
    //     console.log(e);
        
    //     return [];
    // });
};

// 获取第count个订单的id
export const getOrderKey = (count,time_type,start,tail,sid,orderType,state) => {
    const msg = {
        type:'select_all_orders_keys',
        param:{
            id:0,       // 订单id,等于0表示从最大开始获取，大于0表示从指定订单id开始获取
            count:count,   // 需要获取的订单信息数量，即一页需要显示的数量
            time_type:time_type,    // 时间类型，1下单，2支付，3发货， 4收货，5完成
            start:start ,               // 启始时间，单位毫秒
            tail:tail,                // 结束时间，单位毫秒
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
        
        // const ordersShow = parseOrderShow([infos[0]],orderType);
        // console.log('select_all_orders_keys',ordersShow);
        // console.log('select_all_orders_keys',infos[1]);

        const ordersShow = [[infos[0]]];

        return [ordersShow,infos[1]];
    });
};
// 获取所有订单
export const getAllOrder  = (id,count,time_type,start,tail,sid,orderType,state) => {
 
    return fetch(`http://${sourceIp}:${httpPort}/console/select_all_orders?id=${id}&count=${count}&time_type=${time_type}&start=${start}&tail=${tail}&sid=${sid}&type=${orderType}&state=${state}`).then(res => {
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
export const getHWangApply = (time_type:number,stTime:number,edTime:number) => {
    const msg = {
        type:'mall_mgr/members@get_haiwang_application',
        param:{
            start_time: stTime,
            end_time: edTime,
            time_type
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
export const changeHWangState = (id:number,uid:number,state:number,reason:string) => {
    const msg = {
        type:'mall_mgr/members@haiwang_application_state',
        param:{
            id,
            uid,
            state,
            reason
        }
    };

    return requestAsync(msg);
};

/**
 * 获取提现统计
 */
export const getWithdrawTotal = (start_time:number,end_time:number) => {
    const msg = {
        type:'mall_mgr/members@get_withdraw_total',
        param:{
            start_time,
            end_time
        }
    };

    return requestAsync(msg);
};

/**
 * 获取提现申请列表
 */
export const getWithdrawApply = (stTime:number,edTime:number,time_type:number) => {
    // const msg = {
    //     type:'mall_mgr/members@get_withdraw_info',
    //     param:{
    //         start_time:stTime,
    //         end_time:edTime,
    //         time_type
    //     }
    // };

    // return requestAsync(msg);

    return fetch(`http://${sourceIp}:${httpPort}/members/get_withdraw_info?start_time=${stTime}&end_time=${edTime}&time_type=${time_type}`).then(res => res.json());

};

/**
 * 修改提现状态
 * @param id id
 * @param uid uid
 * @param state 1: 处理中 2：同意 3：拒绝
 * @param note 拒绝理由
 */
export const changeWithdrawState = (id:number,uid:number,state:number,note:string) => {
    const msg = {
        type:'mall_mgr/members@withdraw_application_state',
        param:{
            id,
            uid,
            state,
            note
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
    // const msg = {
    //     type:'mall_mgr/members@get_level_details',
    //     param:{
    //         uid
    //     }
    // };

    // return requestAsync(msg);
    return fetch(`http://${sourceIp}:${httpPort}/members/get_level_details?uid=${uid}`).then(res => res.json());
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

// 获取商品ID及总数
export const getGoodsKey = (count:number,start_time:number,end_time:number,state:number) => {
    const msg = {
        type:'select_goods_keys',
        param:{
            id:0,
            count,
            start_time,
            end_time,
            state
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
    
            return [parseGoodsList(deepCopy(data)), analyzeGoods(deepCopy(data))];
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
    
        return [parseGoodsList(deepCopy(data)), analyzeGoods(deepCopy(data))];
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
export const setReturnStatus = (uid:number,id:number,state:number,reason:string) => {
    const msg = {
        type:'set_return_goods',
        param:{
            uid,
            id,
            state,
            reason
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
export const quitOrder = (orderId:number,reason:string) => {
    const msg = {
        type:'console_cancel_order',
        param:{
            id:orderId,
            reason
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
export const changeMoney = (type:number,uid:number,money:number,note:string) => {
    const msg = {
        type:'console_alter_balance',
        param:{
            type,
            uid,
            money,
            note
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
                arr[index].splice(0,1);
                arr[index].unshift(...item);
                arr[index][6] = `￥${priceFormat(arr[index][6])}`;
                arr[index][8] = arr[index][8] === 0 ? '暂无' :timestampFormat(arr[index][8]);
                if (arr[index][7].length) {
                    arr[index][7] = `${timestampFormat(arr[index][7][0]).split(' ')[0]}~${timestampFormat(arr[index][7][1]).split(' ')[0]}`;
                } else {
                    arr[index][7] = '无';
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
    if (/^[1,3]?011\d*$/.test(keyValue)) {
        product_id = parseInt(keyValue);  // 供应商ID
        
    } else {
        sku = keyValue;
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
                arr[index].splice(0,1);
                arr[index].unshift(...item);
                arr[index][6] = `￥${priceFormat(arr[index][6])}`;
                arr[index][8] = arr[index][8] === 0 ? '暂无' :timestampFormat(arr[index][8]);
                if (arr[index][7].length) {
                    arr[index][7] = `${timestampFormat(arr[index][7][0]).split(' ')[0]}~${timestampFormat(arr[index][7][1]).split(' ')[0]}`;
                } else {
                    arr[index][7] = '无';
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
            
            return [data,...supplierProcessing(data)];
        }
    }).catch(e => {
        
        return [[],[]];
    });
};

// 添加分组信息
export const addGroup = (name:string,images:[string,number,number][],children:number[],group_type:string) => {
    const msg = {
        type:'console_add_group',
        param:{
            name,
            group_type,   // 是否有子分组
            is_show:'true',
            images,  // 图片url 图片类型 图片样式1静态
            detail:'',
            children
        }
    };
   
    return requestAsync(msg);
};

// 更新分组信息
export const updateGroup = (id:number,name:string,images:[string,number,number][],children:number[],group_type:string) => {
    const msg = {
        type:'console_update_group',
        param:{
            id,
            name,
            group_type,   // 是否有子分组
            is_show:'true',
            images,  // 图片url 图片类型 图片样式1静态
            detail:'',
            children
        }
    };
   
    return requestAsync(msg);
};

// 删除分组信息
export const delGroup = (id:number) => {
    const msg = {
        type:'console_delete_group',
        param:{
            id
        }
    };
   
    return requestAsync(msg);
};

/**
 * 根据位置获取分组信息
 */
export const getGroupsByLocation = () => {

    return fetch(`http://${sourceIp}:${httpPort}/console/get_groups_tree`).then(res => {
        return res.json();
    });
};

/**
 * 绑定分组ID到location上
 * @param id location
 * @param groupId group
 */
export const updateLocation = (id:number,groupId:number[]) => {
    const msg = {
        type:'update_group_location',
        param:{
            id,
            group_id:groupId
        }
    };

    return requestAsync(msg);
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
export const addSupplier = (supplier_name:string,supplier_desc:string,supplier_image:any,supplier_phone:string) => {
    const msg = {
        type:'console_add_supplier',
        param:{
            supplier_name,
            supplier_desc,
            supplier_image,
            supplier_phone 
        }
    };

    return requestAsync(msg);
};

// 更改绑定关系
export const changeBindding = (uid:number,code:string) => {
    const msg = {
        type:'mall_mgr/members@change_user_bind',
        param:{
            uid,
            code
        }
    };
   
    return requestAsync(msg);
};

// v2导入运费
export const getFreight = (supplier:number,goods_type:number,input:any) => {
    const msg = {
        type:'set_freight_price',
        param:{
            supplier,
            goods_type,
            input
        }
    };

    return requestAsync(msg);
};

// 获取所有品牌
export const getAllBrand = (ids?:any) => {
    let url = `http://${sourceIp}:${httpPort}/console/console_get_brand`;

    if (ids) {
        url = `http://${sourceIp}:${httpPort}/console/console_get_brand?ids=${ids}`;
    } 
    
    return fetch(url).then(res => {
        return res.json().then(r => {
            if (r.result === 1) {
                const data = r.brandInfo;
                
                return [data, ...brandProcessing(data)];
            }
        }).catch(e => {
            return [[],[],[]];
        });
    });
    // const msg = { 
    //     type: 'console_get_brand',
    //     param: { 
    //     } 
    // };
    // if (ids) {
    //     msg.param = { ids:ids };
    // }

    // return requestAsync(msg).then(r => {
    //     if (r.result === 1) {
    //         const data = r.brandInfo;

    //         return [data, ...brandProcessing(data)];
    //     }
    // }).catch(e => {
        
    //     return [[],[],[]];
    // });
};

// 上传图片
export const upLoadImg = (param:any) => {
 
    return fetch(`http://${sourceIp}/upload_goods_img`,{
        body:param,
        method:'POST',
        mode: 'cors'
    }).then(res => res.json());
};

// 获取当前供应商的运费
export const getFreightInfo = (supplier:number,goods_type:number) => {
    const msg = {
        type:'get_freight_config',
        param:{
            supplier,
            goods_type
        }
    };

    return requestAsync(msg).then(r => {

        return processingPostage(r.freight);
    });
};

// 新增商品
export const addShop = (input:any) => {
    const msg = {
        type:'console_add_goods',
        param:{
            input
        }
    };

    return requestAsync(msg);
};

// 上架商品获取一级分类二级分类
export const getClassType = (typeStatus:number) => {
    const msg = {
        type:'console_get_group',
        param:{
            type:typeStatus
        }
    };
   
    return requestAsync(msg).then(r => {
        const res = r.groupInfo;
     
        return processingGroupingType(res);
    }).catch(e => {
        console.log(e);
    });
};

// 修改商品
export const changeShop = (input:any) => {
    const msg = {
        type:'console_update_goods',
        param:{
            input
        }
    };

    return requestAsync(msg);
};

// 获取商品销售量
export const getShopSale = (goods_id:number,start:number,end:number) => {
    const msg = {
        type:'console_get_daily_sold',
        param:{
            goods_id,
            start,
            end
        }
    };

    return requestAsync(msg);
};

// 编辑供应商
export const changeSupplier = (supplier:number,supplier_name:string,supplier_desc:string,supplier_image:any,supplier_phone:string) => {
    const msg = {
        type:'console_update_supplier',
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

// 新增品牌
export const addBrand = (brand_name:string,brand_image:any, brand_desc:string) => {
    const msg = {
        type:'console_add_brand',
        param:{
            brand_name,
            brand_image,
            brand_desc
        }
    };

    return requestAsync(msg);
};

// 编辑品牌
export const changeBrand = (brand_id:number,brand_name:string,brand_image:any,brand_desc:string,brand_goods:any) => {
    const msg = {
        type:'console_edit_brand',
        param:{
            brand_id,
            brand_name,
            brand_image,
            brand_desc,
            brand_goods
        }
    };

    return requestAsync(msg);
};

// 删除品牌
export const removeBrand = (brand_id:number) => {
    const msg = {
        type:'console_delete_brand',
        param:{
            brand_id
        }
    };

    return requestAsync(msg);
};

// 获取操作日志
export const getOperationLog = (start_time:number,end_time:number) => {
    const msg = {
        type:'mall_mgr/manager@get_log',
        param:{
            start_time,
            end_time
        }
    };
    
    return requestAsync(msg).then(r => {

        return processingLogs(r.log);
    }).catch(e => {
        return [];
    });
};

// 获取所有用户
export const getAllUser = () => {
    const msg = {
        type:'mgr_show_user_list',
        param:{}
    };

    return requestAsync(msg).then(r => {

        return processingUser(r.value);
    }).catch(e => {
        
        return [];
    });
};

// 获取所有账号类型
export const getAllUserType = () => {
    const msg = {
        type:'mgr_get_group_info',
        param:{}
    };

    return requestAsync(msg).then(r => {

        return processingUserType(r.value);
    }).catch(e => {
        
        return [];
    });
};

// 添加账号
export const addAccount = (user:string,password:string,cuid:number) => {
    const msg = {
        type:'mgr_create_user',
        param:{
            user,
            password,
            cuid
        }
    };

    return requestAsync(msg);
};

// 添加用户到权限组
export const addUserToUserType = (user:string,name:string) => {
    const msg = {
        type:'mgr_add_user_group_auth',
        param:{
            user,
            name
        }
    };

    return requestAsync(msg);
};

// 修改账号
export const changeUser = (user:string,password:string) => {
    const msg = {
        type:'mgr_modify_user',
        param:{
            user,
            password
        }
    };

    return requestAsync(msg);
};

// 删除账户
export const removeUser = (user:string) => {
    const msg = {
        type:'mgr_del_user',
        param:{
            user
        }
    };

    return requestAsync(msg);
};

// 获取大转盘信息
export const getBigTurntable = () => {
    const msg = {
        type:'mall_mgr/members@get_lottery_config',
        param:{}
    };

    return requestAsync(msg).then(r => {

        return r;
    });
};

// 设置大转盘信息
export const settingTruntable = (types:number,cfg:any) => {
    const msg = {
        type:'mall_mgr/members@update_lottery_config',
        param:{
            type:types,
            cfg
        }
    };

    return requestAsync(msg);
};

// 获取收益设置
export const getIncome = () => {
    const msg = {
        type:'mall_mgr/members@get_award_config',
        param:{}
    };

    return requestAsync(msg);
};

// 设置海王海宝设置购物收益
export const haiWangSetting = (types:string,cfg:any) => {
    const msg = {
        type:'mall_mgr/members@update_award_config',
        param:{
            type:types,
            cfg
        }
    };

    return requestAsync(msg);
};

// 查看礼包配置
export const getGiftSetting = () => {
    const msg = {
        type:'mall_mgr/members@get_gift_config',
        param:{}
    };

    return requestAsync(msg).then(r => {
        if (r.result === 1) {
            const goodsConfig = processingShopSetting(r.goods_config);
            const r1 = processingShopSetting(r.goods_limit_config[0][1]);
            const r2 = processingShopSetting(r.goods_limit_config[1][1]);
            const r3 = processingShopSetting(r.goods_limit_config[2][1]);

            return [goodsConfig,r1,r2,r3];
        } else {
            return [[],[]];
        }
    });
};

// 更改礼包商品配置
export const changeGiftSetting = (types:string,cfg:any) => {
    const msg = {
        type:'mall_mgr/members@update_gift_config',
        param:{
            type:types,
            cfg
        }
    };

    return requestAsync(msg);
};

// 更改礼包商品配置level
export const changeLevelGift = (types:string,level:number,cfg:any) => {
    const msg = {
        type:'mall_mgr/members@update_gift_config',
        param:{
            type:types,
            level,
            cfg
        }
    };

    return requestAsync(msg);
};

// 获取会员流水信息
export const getVipTurnover = () => {
    const msg = {
        type:'mall_mgr/members@members_data_info',
        param:{

        }
    };

    return requestAsync(msg).then(r => {
        if (r.result === 1) {
            const invite_top10 = processingVip(r.invite_top10);
            const share_top10 = processingShare(r.share_top10);
            const member_total = r.member_total;
            
            return [invite_top10,share_top10,member_total];
        } else {

            return [];
        }
    });
};

// 获取余额流水
export const getAmountDetail = (uid:number,types:number) => {
    const msg = {
        type:'mall_mgr/members@balance_log',
        param:{
            uid,
            type:types
        }
    };

    return requestAsync(msg).then(r => {
        if (r.result === 1) {
            return processingBalanceLog(r.value,types);
        } else {
            return [];
        }
        
    });
};

// 获取商品销售排名TOP10
export const getShopSaleTop = (count:number,start:number,end:number) => {
    const msg = {
        type:'get_sold_top_goods',
        param:{
            count,
            start,
            end
        }
    };

    return requestAsync(msg).then(r => {
        if (r.result === 1) {
            return processingShoppingTop10(r.goods_list);
        } else {
            return [];
        }
    });
};

// 获取商品销售详细信息
export const getAllShopSaleInfo = () => {
    const msg = {
        type:'get_goods_statistics_info',
        param:{}
    };

    return requestAsync(msg).then(r => {
        
        if (r.result === 1) {
            const data = [];
            const arr = [];
            const title = ['试用装','课程',''];
            r.gift_sold.forEach((v,i) => {
                arr.push([title[i],v[0],v[0] - v[1] === 0 ? 0 : (v[0] - v[1] > 0 ? 1 :2)]);
            });
            data.push(arr,arr.splice(2,1));
            data.push([['上架商品',r.on_sale,0],['下架商品',r.off_sale,0]]);
            data.push([['一级分类',r.group1,0],['二级分类',r.group2,0]]);
            data.push([['',r.order_count,0]],[['',priceFormat(r.order_price),0]]);
         
            return data;
        }
    });
};

// 获取用户等级变动详细
export const getUserLevelChange = (uid:number) => {
    const msg = {
        type:'get_level_detail',
        param:{
            uid
        }
    };

    return requestAsync(msg).then(r => {
        if (r.result === 1) {

            return processingUserLevelChange(r.detail);
        } else {
            return [];
        }
    });
};

// 用户等级调整
export const userLevelChange = (uid:number,level:number,label:any) => {
    const msg = {
        type:'mall_mgr/members@set_level',
        param:{
            uid,
            level,
            label
        }
    };

    return requestAsync(msg);
};

// 获取提现配置
export const getWithDrawalSetting = () => {
    const msg = {
        type:'mall_mgr/members@get_withdraw_config',
        param:{
            
        }
    };

    return requestAsync(msg).then(r => {
        const data = r.withdraw_config;
        data[0] = priceFormat(data[0]);
        data[5] = priceFormat(data[5]);
        
        return data;
    });
};

// 设置提现配置
export const setWithDrawal = (withdraw_config:any) => {
    const msg = {
        type:'mall_mgr/members@update_withdraw_config',
        param:{
            withdraw_config
        }
    };

    return requestAsync(msg);
};

// 查看提现是否开启
export const getWithdrawalStatus = () => {
    const msg = {
        type:'mall_mgr/members@console_get_withdraw_switch',
        param:{}
    };

    return requestAsync(msg);
};

// 设置提现开关
export const setWithdrawalStatus = (state:number) => {
    const msg = {
        type:'mall_mgr/members@console_update_withdraw_switch',
        param:{
            state
        }
    };

    return requestAsync(msg);
};

// 获取所有399商品列表
export const getHbaoGoodsList = () => {
    const msg = {
        type:'show_bind_goods_special',
        param:{}
    };

    return requestAsync(msg).then(r => {
        setStore('hBaoGoods',r.value);        

        return r.value;
    });
};

// 399商品绑定商户
export const bindVipUser = (goods_id:number,code:string) => {
    const msg = {
        type:'bind_goods_special',
        param:{
            goods_id,
            code
        }
    };

    return requestAsync(msg);
};

// 添加一个权限
export const addRightsGroups = (auth_list:any,name:string) => {
    const msg = {
        type:'mgr_add_group_auth',
        param:{
            auth_list,
            name
        }
    };

    return requestAsync(msg);
};

// 修改一个权限
export const changeRightsGroups = (auth_list:any,name:string) => {
    const msg = {
        type:'mgr_modify_group_auth',
        param:{
            auth_list,
            name
        }
    };

    return requestAsync(msg);
};

// 删除一个权限
export const removeRightsGroup = (name:string) => {
    const msg = {
        type:'mgr_del_group_auth',
        param:{
            name
        }
    };

    return requestAsync(msg);
};

/**
 * 获取所有退款订单
 */
export const getAllRefundOrder = (id:number,count:number,start:number,tail:number,state:number) => {
    const msg = {
        type:'select_all_return_refund',
        param:{
            id,
            count,
            start,
            tail,
            state
        }
    };

    return requestAsync(msg);
};

/**
 * 查询指定退款订单
 * @param id id
 */
export const getRefundOrder = (id:number) => {
    const msg = {
        type:'select_return_refund',
        param:{
            id
        }
    };

    return requestAsync(msg);
};

/**
 * 同意退款
 */
export const setRefundStatus = (id:number) => {
    const msg = {
        type:'set_return_refund',
        param:{
            id
        }
    };

    return requestAsync(msg);
};

/**
 * 获取签到记录
 */
export const getCheckInLog = (stTime:number,edTime:number) => {
    
    return fetch(`http://${sourceIp}:${httpPort}/console/get_check_in_log?start=${stTime}&end=${edTime}`).then(r => r.json());
};

// 获取订单拒绝理由
export const getOrderReason = (oids:any) => {
    const msg = {
        type:'mall_mgr/manager@get_order_cancel_reason',
        param:{
            oids
        }
    };

    return requestAsync(msg).then(r => {
        return unicode2Str(r.value[0]);
    });

};