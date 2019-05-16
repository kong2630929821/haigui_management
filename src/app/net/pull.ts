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
    requestAsync(msg).then(r => {
        console.log(r);
    }).catch((e) => {
        console.log(e);
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
        console.log(r);
    }).catch((e) => {
        console.log(e);
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
        const supCost = Number(res[i].供货价) * 100;
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
        const tmp = [id,name,brandId,areaId,supplierId,pay_type,supCost,origin,vip_price,has_tax,tax,discount,labels,images,intro,spec,detail];
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
    requestAsync(msg).then(r => {
        console.log(r);
    }).catch((e) => {
        console.log(e);
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
    requestAsync(msg).then(r => {
        console.log(r);
    }).catch((e) => {
        console.log(e);
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
    requestAsync(msg).then(r => {
        console.log(r);
    }).catch((e) => {
        console.log(e);
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
    requestAsync(msg).then(r => {
        console.log(r);
    }).catch((e) => {
        console.log(e);
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
    requestAsync(msg).then(r => {
        console.log(r);
    }).catch((e) => {
        console.log(e);
    });
};
 // 解析并导入运单信息
export const importTransport = (res) => {
    const arr = [];
    for (let i = 0;i < res.length;i++) {
        const supplierId = Number(res[i].供货商ID);
        const uid = Number(res[i].订单用户ID);
        const oid = Number(res[i].订单编号);
        const sid = res[i].物流单号 ? res[i].物流单号 : '';
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
        console.log(r);
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
// 获取指定供应商指定类型的订单
export const getOrder  = (supplier,Ordertype) => {
    const msg = { 
        type: 'select_supplier_order',
        param: { 
            id:supplier,
            type:Ordertype
        } 
    };

    requestAsync(msg).then(r => {
        console.log('r=',r);

        return r;
    }).catch((e) => {
        console.log(e);
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
// 获取所有的商品信息，支付分页
export const getAllGoods = () => {
    const msg = { 
        type: 'select_all_goods',
        param: { 
            id:10010003,
            count:3
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
 * 获取海王申请列表
 */
export const getHWangApply = () => {
    const msg = {
        type:'mall_mgr/members@get_haiwang_application',
        param:{
            start_time:0,
            end_time:Date.now()
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
 * 获取提现申请列表
 */
export const getWithdrawApply = () => {
    const msg = {
        type:'mall_mgr/members@get_withdraw_info',
        param:{
            start_time:0,
            end_time:Date.now()
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