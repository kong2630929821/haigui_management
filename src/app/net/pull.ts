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
        const price = parseFloat(res[i].price);
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
        if (arr2[i].缩略图 !== 'NULL') images.push([arr2[i].缩略图,1,1]);
        if (arr2[i].主图 !== 'NULL') images.push([arr2[i].主图,3,3]);
        const detail = arr2[i].分组详细描述;
        const childs = [];
        if (!arr2[i].子商品) {
            for (let j = 1;j < arr2.length;j++) {
                childs.push(parseInt(arr2[j].分组id,10));
            }
        } else {
            arr2[i].子商品.split('/').forEach(e => {
                childs.push(parseInt(e,10));
            });
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
        const cost = parseFloat(res[i].成本价);
        const supCost = parseFloat(res[i].供货价);
        const origin = parseFloat(res[i].普通售价);
        const vip_price = parseFloat(res[i].会员价);
        const has_tax = res[i].是否保税区的产品 === 'YES' ? true : false;
        const tax = parseFloat(res[i].税费);
        const discount = parseFloat(res[i].折后价);
        const labels = [];
        res[i].标签.split(',').forEach(e => {
            e = e.replace(/\n/,'');
            labels.push([e.split(':')[0],parseFloat(e.split(':')[1])]);
        });
        const images = []; 
        if (res[i].缩略图 !== 'NULL') images.push([res[i].缩略图,1,1]);
        if (res[i].主图 !== 'NULL') {
            res[i].主图.split(',').forEach(e => {
                e = e.replace(/\n/,'');
                images.push([e,3,3]);
            });
        }
        if (res[i].详情图 !== 'NULL') {
            res[i].详情图.split(',').forEach(e => {
                e = e.replace(/\n/,'');
                images.push([e,3,3]);
            });
        }
        const intro = '商品介绍';
        const spec = [['色调','棕色'],['重量','300g']];
        const detail = [];
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
        images.push([res[i].国旗小图,1,1]);
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
        images.push([res[i].小图,1,1]);
        images.push([res[i].缩略图,2,1]);
        images.push([res[i].主图,3,1]);
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
        const tmp = [id,sku,lable,amount];
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
// 获取所有有未发货订单的供应商
export const selSupplier = () => {
    const msg = { 
        type: 'select_supplier',
        param: { 
        } 
    };
    requestAsync(msg).then(r => {
        console.log('r=',r);
        console.log('所有有未发货订单的供应商:',r.value);

        return r;
        // getOrder(1011001,2);
    }).catch((e) => {
        console.log(e);
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
    }).catch((e) => {
        console.log(e);
    });
};