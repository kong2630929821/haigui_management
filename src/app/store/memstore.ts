import { HandlerMap } from '../../pi/util/event';

/**
 * 判断是否是对象
 */
const isObject = (value: any) => {
    const vtype = typeof value;

    return value !== null && (vtype === 'object' || vtype === 'function');
};

/**
 * 数据深拷贝
 */
export const deepCopy = (v: any): any => {
    if (!v || v instanceof Promise || !isObject(v)) return v;
    if (v instanceof Map) {
        return v;  // TODO 暂不对map做处理

        // return new Map(JSON.parse(JSON.stringify(v)));
    }

    const newobj = v.constructor === Array ? [] : {};
    for (const i in v) {
        newobj[i] = isObject(v[i]) ? deepCopy(v[i]) : v[i];
    }

    return newobj;
};

/**
 * 根据路径获取数据
 */
export const getStore = (path: string, defaultValue = undefined) => {
    let ret = store;
    for (const key of path.split('/')) {
        if (key in ret) {
            ret = ret[key];
        } else {
            // 路径中有和store内部不同的键，肯定是bug
            // tslint:disable-next-line:prefer-template
            throw new Error('getStore Failed, path = ' + path);
        }
    }
    const deepRet = deepCopy(ret);

    return (typeof deepRet === 'boolean' || typeof deepRet === 'number') ? deepRet : (deepRet || defaultValue);
};

/**
 * 更新store并通知
 */
export const setStore = (path: string, data: any, notified = true) => {
    const keyArr = path.split('/');

    const notifyPath = [];
    for (let i = 0; i < keyArr.length; i++) {
        // tslint:disable-next-line:prefer-template
        const path = i === 0 ? keyArr[i] : notifyPath[i - 1] + '/' + keyArr[i];
        notifyPath.push(path);
    }
    // console.log(notifyPath);
    // 原有的最后一个键
    const lastKey = keyArr.pop();

    let parent = store;
    for (const key of keyArr) {
        if (key in parent) {
            parent = parent[key];
        } else {
            // 路径中有和store内部不同的键，肯定是bug
            // tslint:disable-next-line:prefer-template
            throw new Error('setStore Failed, path = ' + path);
        }
    }
    parent[lastKey] = deepCopy(data);

    if (notified) {
        for (let i = notifyPath.length - 1; i >= 0; i--) {
            handlerMap.notify(notifyPath[i], getStore(notifyPath[i]));
        }
    }
};

/**
 * 注册消息处理器
 */
export const register = (keyName: string, cb: Function): void => {
    handlerMap.add(keyName, <any>cb);
};

/**
 * 取消注册消息处理器
 */
export const unregister = (keyName: string, cb: Function): void => {
    handlerMap.remove(keyName, <any>cb);
};

/**
 * 消息处理列表
 */
const handlerMap: HandlerMap = new HandlerMap();

// 会员统计信息
export interface VipTotal {
    hBaoNum:number; // 海宝数量
    hWangNum:number;// 海王数量
    baikNum:number;// 白客数量
    hBaoDatas:VipListInfo[]; // 海宝列表数据
    hWangDatas:VipListInfo[]; // 海王列表数据
    baikDatas:VipListInfo[]; // 白客列表数据
}

// 会员列表信息
// uid 微信名 手机号 地址信息 ta的总收益 标签
type VipListInfo = [number,string,string,string,string,string];

// 图片类型枚举
export enum ImageType {
    THUMBNAIL = 1,   // 缩略图
    MAIN = 2,       // 主图
    DETAIL = 3,      // 详情图
    ICON = 4          // 小图 图标
}

// 分组详细信息
export interface GroupInfo {
    id: number;
    name: string;
    groupType: boolean;    // 是否有子分组
    isShow: boolean;       // 是否展示分组
    imgs: [string,number,number][];
    detail: string;
    children: any[];    // 二级分组  商品ID
    time: string;   // 最后更新时间
    localId:number;    
}

// 位置
export interface Locate {
    location:number;    // location
    children:number[];   // 一级分组
}

// 商品详情
export interface GoodsDetail {
    id:number;  // 商品ID
    name:string;  // 名称
    shopType:string;  // 商品类型
    brand:number;  // 品牌ID
    typeName:string;  // 分组
    img:[string,number,number][];  // 图片
    discount:string;  // 折扣
    tax:string;  // 税费
    state:number;  // 上下架状态 1上架 0下架
    skus:any[];  // SKU列表
    area:number;  // 地区ID
    onSaleTime:string;// 上架时间
}
/******************************store初始化**********************************/
// 海龟一号store
interface Store {
    locations:Locate[];
    vipTotal:VipTotal;
    skuTotal:SkuInfo;
    groupList:GroupInfo[];
    hBaoGoods:[number,string][];   // 399商品列表 【商品ID，用户邀请码】
    hBaoGoodsDetail:{user:string; goods:GoodsDetail}[];   // 399商品列表详情
    flags:any;
}
// 全局内存数据库
const store:Store = {
    locations:[],
    vipTotal:{
        hBaoNum:0, // 海宝数量
        hWangNum:0,// 海王数量
        baikNum:0,// 白客数量
        hBaoDatas:[], // 海宝列表数据
        hWangDatas:[], // 海王列表数据
        baikDatas:[] // 白客列表数据
    },
    skuTotal:{
        skuNum:0,// 数量
        skuData:[]// 列表
    },
    groupList:[],
    hBaoGoods:[],   // 399商品列表
    hBaoGoodsDetail:[],
    flags:{}
};

// SKU
export interface SkuInfo {
    skuNum:number; // sku数量
    skuData:SkuListInfo[]; // sku列表数据
}
// SKU列表信息
// '供应商id','SKU','sku名','已下单未支付数量','总销量','库存','供货价','保质期','修改时间','供应商sku','供应商商品ID','收货地址','收件人','联系电话'
type SkuListInfo = [number,string,string,number,number,number,string,string,number,number,string,string,string];