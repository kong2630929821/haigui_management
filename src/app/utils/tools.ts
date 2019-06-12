import { Order, OrderShow, OrderStatus, OrderStatusShow } from '../view/page/totalOrders';
import { priceFormat, unicode2Str } from './logic';

/**
 * 常用工具
 */
declare var XLSX;
export const importRead = (f,ok) => { // 导入将excel读成json格式
    let wb;// 读取完成的数据
    const rABS = false; // 是否将文件读取为ArrayBuffer
    const reader = new FileReader();
    reader.onload = (e) =>  {// onload在读取完成时触发
        const data = (<any>e.target).result;// 取到读取的内容或是二进制或是arraybuffer
        if (rABS) {// 拿到excel中内容
            wb = XLSX.read(btoa(fixdata(data)), {// 手动转化
                type: 'base64'
            });
        } else {
            wb = XLSX.read(data, {
                type: 'binary'
            });
        }
        // wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        // wb.Sheets[Sheet名]获取第一个Sheet的数据
        
        // 将所有数据类型改为字符串
        const sheetData = wb.Sheets[wb.SheetNames[0]];
        // 取表格的字段名
        const title = [];
        for (const k in sheetData) {
            if (k.endsWith('1') && k.length === 2) {
                title.push(sheetData[k].v);
            }
            if (typeof sheetData[k] === 'object') {
                sheetData[k].t = 's';
                sheetData[k].v = `${sheetData[k].v}`;
            }
        }
        const tableData = [];
        const tableContent = XLSX.utils.sheet_to_json(sheetData);
        tableData.push(title);
        tableData.push(tableContent);
        ok && ok(tableData);
    };
    if (rABS) {
        reader.readAsArrayBuffer(f);// 开始读取文件，将文件内容读成arraybuffer保存在result中
    } else {
        reader.readAsBinaryString(f);// 开始读取文件，将文件内容读成二进制保存在result中
    }
};

// 文件流转BinaryString
const fixdata = (data) => { 
    let o = '',
        l = 0;
    const w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));

    return o;
};

const openDownloadDialog = (url, saveName) => {
    if (typeof url === 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
    }
    const aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    let event;
    if ((<any>window).MouseEvent) event = new MouseEvent('click');
    else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
};

// 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
const  sheet2blob = (sheet, sheetName?) => {
    sheetName = sheetName || 'sheet1';
    const workbook = {
        SheetNames: [sheetName],
        Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet;
    // 生成excel的配置项
    const wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    };
    const wbout = XLSX.write(workbook, wopts);
    
    // 字符串转ArrayBuffer
    const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;

        return buf;
    };
    // tslint:disable-next-line:no-unnecessary-local-variable
    const blob = new Blob([s2ab(wbout)], { type:'application/octet-stream' });
    
    return blob;
};

/**
 * 导出excel格式
 * @param aoa 导出的数据  二维数组格式 例：[["姓名","年龄","职业"],["张三",18,"程序员"]]
 * @param excelName 导出的excel文件名
 */
export const exportExcel = (aoa:any[][],excelName:string) => {
    const sheet = XLSX.utils.aoa_to_sheet(aoa);
            
    openDownloadDialog(sheet2blob(sheet),excelName);
};

// 解析订单
export const parseOrderShow = (infos:Order[],status:OrderStatus) => {
    let localStatus = status;
    const ordersShow:OrderShow[] = [];
    for (const info of infos) {
        if (status === OrderStatus.ALL) {   // 全部订单  自己解析订单状态
            localStatus = parseOrderStatus(info[12],info[13],info[14],info[15],info[16],info[17]);
        }
        for (const v of info[3]) { 
            const timestamp = localStatus === OrderStatus.PENDINGPAYMENT ? info[12] : info[13];
            let goodsType = '';
            if (v[6]) {
                goodsType = '保税商品';
            } else {
                goodsType = '普通商品';
            }
            const orderShow:OrderShow = [info[1],v[0],v[1],v[3],v[4],v[5],goodsType,info[0],timestampFormat(timestamp),info[2],info[8],info[9],addressFormat(info[11]),OrderStatusShow[localStatus]];
            ordersShow.push(orderShow);
        }
    }

    return ordersShow;
};

/**
 * 解析订单类型
 * @param orderTime 下单时间
 * @param payTime 支付时间
 * @param shipTime 发货时间
 * @param receiptTime 收货时间
 * @param finishTime 完成时间
 * @param shipId 物流单号
 */
const parseOrderStatus = (orderTime:number,payTime:number,shipTime:number,receiptTime:number,finishTime:number,shipId:string):OrderStatus => {
    let status:OrderStatus;
    if (orderTime === 0) {
        status = OrderStatus.FAILED;            // 失败
    } else if (payTime === 0) {
        status = OrderStatus.PENDINGPAYMENT;     // 待付款
    } else if (shipTime === 0 || !shipId) {
        status = OrderStatus.PENDINGDELIVERED;   // 待发货
    } else if (receiptTime === 0) {
        status = OrderStatus.PENDINGRECEIPT;   // 待收货
    } else if (finishTime === 0) {
        status = OrderStatus.PENDINGFINISH;   // 待完成
    } else {
        status = OrderStatus.FINISHED;      // 已完成
    }

    return status;
};

// 时间戳格式化 毫秒为单位
export const timestampFormat = (timestamp: number) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : `0${date.getMonth() + 1}`;
    const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
    const hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
    const minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
    const seconds = date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`;

    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
};

/**
 * 地址格式化
 */
export const addressFormat = (addrStr:string) => {
    const address = JSON.parse(addrStr);

    return `${address[0].join('')}${address[1]}`;
};
/**
 * 解析运费信息
 */
export const analysisFreightData = (res) => {
    const title = res[0];
    const content = res[1];
    // 表不为空验证
    if (!content.length) {
        popNewMessage('导入了空表');

        return;
    } 
    // 表类型验证（导入的是运费表，不是其他表）
    if (title[1] !== 'area') {
        popNewMessage('导入的不是运费表');
        
        return;
    }
    // 必填字段不为空验证（必填字段不为空（注意为0的情况），id转化之后是number），错误要提示
    const arr = [];
    for (let i = 0;i < content.length;i++) {
        const id = Number(content[i].id);
        const price_type = Number(content[i].price_type);
        const price = Number(content[i].price) * 100;
        if (id !== 0 && !id) {
            popNewMessage(`第${i + 2}行id为空或类型不正确`);

            return; 
        }
        if (price_type !== 0 && !price_type) {
            popNewMessage(`第${i + 2}行price_type为空或类型不正确`);

            return; 
        }
        if (price !== 0 && !price) {
            popNewMessage(`第${i + 2}行price为空或类型不正确`);

            return; 
        }
        const tmp = [id,content[i].area,price_type,price];
        arr[i] = tmp;
    }

    return arr;
};
/**
 * 解析商品分类
 */
export const analysisGoodsCatetData = (res) => {
    const title = res[0];// 0:"分组id", 1:"一级分组名", 2:"二级分组名", 3:"是否可见", 4:"子商品", 5:"缩略图", 6:"主图", 7:"分组详细描述", 8:"位置", 9:"根id"
    const titleGroupId = title[0];// "分组id"
    const titleOneGroupName = title[1];// "一级分组名"
    const titleVisible = title[3];// "是否可见"
    const titlePosition = title[8];// "位置"
    const titleRootId = title[9];// "根id"
    const content = res[1];
    // 表不为空验证 
    if (!content.length) {
        popNewMessage('导入了空表');

        return;
    } 
    // 表类型验证（导入的是运费表，不是其他表）
    if (titleGroupId !== '分组id' || titleOneGroupName !== '一级分组名') {
        popNewMessage('导入的不是商品分类表');
        
        return;
    }
    const data = {};
    const goodsCates = [];// 存放分组
    let goodsCate = [];// 存放同一个分组
    // 将表中分类分组存放
    let id1 = content[0][titleGroupId];
    let id2 = '';
    for (let i = 0;i < content.length;i++) {
        // 必填字段不为空验证（必填字段不为空（注意为0的情况），id转化之后是number），错误要提示
        if (content[i][titleGroupId] === undefined) {
            popNewMessage(`第${i + 2}行id为空`);

            return;
        } 
        if (content[i][titleOneGroupName]) {
            if (content[i][titlePosition] === undefined || content[i][titleRootId] === undefined) {
                if (content[i][titleVisible] !== 'NO') { 
                    popNewMessage(`第${i + 2}行位置或根id为空(没有空行的情况下是第${i + 1}行)`);

                    return;
                }
            } 
            id2 = content[i][titleGroupId];
        }
        if (id1 !== id2) {
            goodsCates.push(goodsCate);
            goodsCate = [];
        }
        if (content[i][titleGroupId].startsWith(id2)) {
            goodsCate.push(content[i]);
        } 
        id1 = id2;
    } 
    goodsCates.push(goodsCate);
    
    for (let i = 0;i < goodsCates.length;i++) {
        const group = dealGroup(goodsCates[i]);
        if (!group) return;
        if (!data[group.root]) {
            data[group.root] = [];
        }
        data[group.root].push({ input:group.input,id:goodsCates[i][0][titleGroupId] });
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

    return reqArray;
};
/**
 * 解析商品分类中的一个分类
 */
export const dealGroup = (goodsCate) => {
    const title = ['分组id', '一级分组名', '二级分组名', '是否可见', '子商品', '缩略图', '主图', '分组详细描述', '位置', '根id'];
    const arr = [];
    for (let i = 0;i < goodsCate.length;i++) {
        const id = Number(goodsCate[i][title[0]]);
        const name = goodsCate[i][title[1]] || goodsCate[i][title[2]];
        const goodsType = (goodsCate[i][title[4]] === undefined) ? true : false;// 组类型，分为子组和叶组，子组可以包含任意的其它子组或叶组，叶组只允许包含商品
        const is_show = (goodsCate[i][title[3]] === 'YES') ? true : false;
        if (id !== 0 && !id) {
            popNewMessage(`id必须为数字类型`);

            return; 
        }
        const images = []; 
        if (goodsCate[i][title[5]]) images.push([goodsCate[i][title[5]],1,1]);
        if (goodsCate[i][title[6]]) images.push([goodsCate[i][title[6]],2,1]);
        const detail = goodsCate[i][title[7]];
        const childs = [];
        if (goodsCate[i][title[1]]) {
            for (let j = 1;j < goodsCate.length;j++) {
                childs.push(parseInt(goodsCate[j][title[0]],10));
            }
        } 
        if (goodsCate[i][title[2]]) {
            if (goodsCate[i][title[4]]) {
                goodsCate[i][title[4]].split('/').forEach(e => {
                    childs.push(parseInt(e,10));
                });
            }
        } 
        const inputL = [id,name,goodsType,is_show,images,detail,childs];
        arr[i] = inputL;
    }
    const is_show = goodsCate[0][title[3]];
    const paramLoc = Number(goodsCate[0][title[8]]);
    const paramRoot = Number(goodsCate[0][title[9]]);
    if (paramLoc !== 0 && !paramLoc) {
        if (is_show !== 'NO') {
            popNewMessage(`位置必须为数字类型`);

            return;
        }
    }
    if (paramRoot !== 0 && !paramRoot) {
        if (is_show !== 'NO') {
            popNewMessage(`根id必须为数字类型`);

            return; 
        }
    }

    return { 
        location:paramLoc,
        root:paramRoot,
        input:arr
    }; 
};
/**
 * 解析供应商信息
 */
const maxNum = 30;   // 每次导入最大条数
export const analysisSupliertData = (res) => {
    const title = res[0];// "供应商id" "供应商名称" "供应商详细描述"
    const content = res[1];
    // 表不为空验证
    if (!content.length) {
        popNewMessage('导入了空表');

        return;
    } 
    // 表类型验证（导入的是供应商表，不是其他表）
    if (title[0] !== '供应商id' || title[1] !== '供应商名称') {
        popNewMessage('导入的不是供应商表');
        
        return;
    }
    const supplierId = title[0];
    const supplierName = title[1];
    const supplierDetail = title[2];
    const arr = []; 
    for (let i = 0;i < content.length;i++) {
        const id = Number(content[i][supplierId]);
        if (id !== 0 && !id) {
            popNewMessage(`第${i + 2}行id为空或类型不正确`);

            return;
        }
        const name = content[i][supplierName];
        const detail = content[i][supplierDetail];
        const images = [];
        const tmp = [id,name,detail,images];
        arr[i] = tmp;
    } 
    const len = Math.ceil(arr.length / maxNum);
    const groups = [];// 用来存放每30条数据（或更少）构成的数组
    for (let index = 0;index < len;index++) {
        groups.push(arr.slice(index * maxNum,(index + 1) * maxNum));
    }

    return groups;
};
/**
 * 解析地区信息
 */
export const analysisAreatData = (res) => {
    const title = res[0];// "id" "地区名" "国旗小图"
    const content = res[1];
    // 表不为空验证
    if (!content.length) {
        popNewMessage('导入了空表');

        return;
    } 
    // 表类型验证（导入的是运费表，不是其他表）
    if (title[1] !== '地区名') {
        popNewMessage('导入的不是地区表');
        
        return;
    }
    const areaName = title[1];
    const countryFlag = title[2];
    const arr = []; 
    for (let i = 0;i < content.length;i++) {
        const id = Number(content[i].id);
        const name = content[i][areaName];
        const detail = '';
        const images = [];
        if (id !== 0 && !id) {
            popNewMessage(`第${i + 2}行id为空或类型不正确`);

            return;
        }
        images.push([content[i][countryFlag],4,1]);
        const tmp = [id,name,detail,images];
        arr[i] = tmp;
    } 

    return arr;
};
/**
 * 解析品牌信息
 */
export const analysisGrandData = (res) => {
    const title = res[0];// "品牌id" "品牌名" "小图" "缩略图" "主图" "品牌详细信息"
    const content = res[1];
    const titleBrandId = title[0];
    const titleBrandName = title[1];
    const titleSmallPic = title[2];
    const titleSuoLuePic = title[3];
    const titleMainPic = title[4];
    const titleDetail = title[5];
    // 表不为空验证
    if (!content.length) {
        popNewMessage('导入了空表');

        return;
    } 
    // 表类型验证（导入的是品牌表，不是其他表）
    if (title[0] !== '品牌id') {
        popNewMessage('导入的不是品牌表');
        
        return;
    }
    const arr = []; 
    for (let i = 0;i < content.length;i++) {
        const id = Number(content[i][titleBrandId]);
        const name = content[i][titleBrandName];
        const detail = content[i][titleDetail];
        const images = [];
        if (id !== 0 && !id) {
            popNewMessage(`第${i + 2}行id为空或类型不正确`);

            return;
        }
        images.push([content[i][titleSmallPic],4,1]);
        images.push([content[i][titleSuoLuePic],1,1]);
        images.push([content[i][titleMainPic],2,1]);
        const tmp = [id,name,detail,images];
        arr[i] = tmp;
    }
    const len = Math.ceil(arr.length / maxNum);
    const groups = [];// 用来存放每30条数据（或更少）构成的数组
    for (let index = 0;index < len;index++) {
        groups.push(arr.slice(index * maxNum,(index + 1) * maxNum));
    }

    return groups;
};
/**
 * 解析库存信息
 */
export const analysisInventoryData = (res) => {
    const title = res[0];// "供应商id" "sku" "库存" "供货价" "标签1" "标签2" "标签3" "标签4" "标签5" "标签6" "标签7" "标签8" "标签9" "标签10"
    const content = res[1];
    const titleSupplierId = title[0];
    const titleSKU = title[1];
    const titleInventory = title[2];
    const titleSupplierPrice = title[3];
    const titleLable1 = title[4];
    // 表不为空验证
    if (!content.length) {
        popNewMessage('导入了空表');

        return;
    } 
    // 表类型验证（导入的是库存表，不是其他表）
    if (title[0] !== '供应商id' || title[1] !== 'sku') {
        popNewMessage('导入的不是库存表');
        
        return;
    }
    const arr = []; 
    for (let i = 0;i < content.length;i++) {
        const id = Number(content[i][titleSupplierId]);
        const sku = content[i][titleSKU];
        let lable = '';
        for (let j = 1;j <= 10;j++) {
            const str = `标签${j}`;
            lable += content[i][str] === undefined ? '' : content[i][str];
        }
        const amount = Number(content[i][titleInventory]);
        const supplierPrice = Number(content[i][titleSupplierPrice]) * 100;
        const Lable1 = content[i][titleLable1];
        if (id !== 0 && !id) {
            popNewMessage(`第${i + 2}行id为空或类型不正确`);

            return;
        }
        if (amount !== 0 && !amount) {
            popNewMessage(`第${i + 2}行库存为空或类型不正确`);

            return;
        }
        if (supplierPrice !== 0 && !supplierPrice) {
            popNewMessage(`第${i + 2}行供货价为空或类型不正确`);

            return;
        }
        if (!Lable1) {
            popNewMessage(`每行至少填一个标签`);

            return;
        }
        const tmp = [id,sku,lable,amount,supplierPrice];
        arr[i] = tmp;
    } 
    const len = Math.ceil(arr.length / maxNum);
    const groups = [];// 用来存放每30条数据（或更少）构成的数组
    for (let index = 0;index < len;index++) {
        groups.push(arr.slice(index * maxNum,(index + 1) * maxNum));
    }

    return groups;
};
/**
 * 解析商品信息
 */
export const analysisGoodsData = (res) => {
    const title = res[0];// "商品id""商品名称""品牌id""地区id""供应商id" "支付类型" "成本价" "普通售价" "会员价" "折后价" "是否保税区的产品" "税费" "标签" "缩略图" "主图" "详情图" 
    const content = res[1];
    if (!content.length) {
        popNewMessage('导入了空表');

        return;
    } 
    if (title[0] !== '商品id' || title[1] !== '商品名称') {
        popNewMessage('导入的不是商品表');
        
        return;
    }
    const arr = []; 
    for (let i = 0;i < content.length;i++) {
        const id = Number(content[i][title[0]]);
        const name = content[i][title[1]];
        const brandId = Number(content[i][title[2]]);
        const areaId = Number(content[i][title[3]]);
        const supplierId = Number(content[i][title[4]]);
        const pay_type = Number(content[i][title[5]]);
        const cost = Number(content[i][title[6]]) * 100;
        const origin = Number(content[i][title[7]]) * 100;
        const vip_price = Number(content[i][title[8]]) * 100;
        const has_tax = content[i][title[10]] === 'YES' ? true : false;
        const tax = Number(content[i][title[11]]) * 100;
        const discount = content[i][title[9]] === undefined ? origin : Number(content[i][title[9]]) * 100;
        const labels = [];
        content[i][title[12]].split(',').forEach(e => {
            e = e.replace(/\n/,'');
            labels.push([e.split(':')[0],Number(e.split(':')[1]) * 100]);
        });
        const images = []; 
        if (content[i][title[13]]) images.push([content[i][title[13]],1,1]);
        if (content[i][title[14]]) {
            content[i][title[14]].split(',').forEach(e => {
                e = e.replace(/\n/,'');
                images.push([e,2,1]);
            });
        }
        const intro = '';
        const spec = [];
        const detail = [];
        if (content[i][title[15]]) {
            content[i][title[15]].split(',').forEach(e => {
                e = e.replace(/\n/,'');
                detail.push(['','',[e,3,1]]);
            });
        }
        const temparr = [id,areaId,supplierId,pay_type,cost,origin,vip_price,tax,discount];
        if (!Tip(temparr,i)) return;
        const tmp = [id,name,brandId,areaId,supplierId,pay_type,cost,origin,vip_price,has_tax,tax,discount,labels,images,intro,spec,detail];
        arr[i] = tmp;
    }
    const len = Math.ceil(arr.length / maxNum);
    const groups = [];// 用来存放每30条数据（或更少）构成的数组
    for (let index = 0;index < len;index++) {
        groups.push(arr.slice(index * maxNum,(index + 1) * maxNum));
    }

    return groups;
};
const Tip = (temparr,row) => {
    for (let i = 0;i < temparr.length;i++) {
        if (temparr[i] !== 0 && !temparr[i]) {
            switch (i) {
                case 0:popNewMessage(`第${row + 2}行商品id存在错误数据`);break;
                case 1:popNewMessage(`第${row + 2}行地区id存在错误数据`);break;
                case 2:popNewMessage(`第${row + 2}行供应商id存在错误数据`);break;
                case 3:popNewMessage(`第${row + 2}行支付类型存在错误数据`);break;
                case 4:popNewMessage(`第${row + 2}行成本价存在错误数据`);break;
                case 5:popNewMessage(`第${row + 2}行普通售价存在错误数据`);break;
                case 6:popNewMessage(`第${row + 2}行会员价存在错误数据`);break;
                case 7:popNewMessage(`第${row + 2}行税费存在错误数据`);break;
                case 8:popNewMessage(`第${row + 2}行折后价存在错误数据`);break;
                default:
            }
            
            return false;
        }
    }

    return true;
};