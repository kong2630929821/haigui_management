import { popNew } from '../../pi/ui/root';
import { Order, OrderShow, OrderStatus, OrderStatusShow } from '../view/page/totalOrders';

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
        for (const k in sheetData) {
            if (typeof sheetData[k] === 'object') {
                sheetData[k].t = 's';
                sheetData[k].v = `${sheetData[k].v}`;
            }
        }
        const json = XLSX.utils.sheet_to_json(sheetData);
        ok && ok(json);
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
    const ordersShow:OrderShow[] = [];
    for (const info of infos) {
        for (const v of info[3]) { 
            const timestamp = status === OrderStatus.PENDINGPAYMENT ? info[12] : info[13];
            const orderShow:OrderShow = [info[1],v[0],v[1],v[3],v[4],v[5],info[0],timestampFormat(timestamp),info[2],info[8],info[9],info[11],OrderStatusShow[status]];
            ordersShow.push(orderShow);
        }
    }

    return ordersShow;
};

// 解析订单1
export const parseOrderShow1 = (infos:any[]) => {
    const ordersShow:OrderShow[] = [];
    for (const info of infos) {
        let status;
        if (info[7] === 0) {
            status = OrderStatus.FAILED;
        } else if (info[8] === 0) {
            status = OrderStatus.PENDINGPAYMENT;
        } else if (info[9] === 0) {
            status = OrderStatus.PENDINGDELIVERED;
        } else if (info[10] === 0) {
            status = OrderStatus.PENDINGRECEIPT;
        } else if (info[10]) {
            status = OrderStatus.PENDINGFINISH;
        }
        const timestamp = status === OrderStatus.PENDINGPAYMENT ? info[7] : info[8];
        // ['订单编号','商品ID','商品名称','商品数量','商品SKU','商品规格','供货商ID','下单时间','用户ID','姓名','手机号','地址信息','订单状态']
        const orderShow:OrderShow = [info[0],info[12],info[15],info[14],info[16],info[17],info[18],timestampFormat(timestamp),info[1],info[2],info[3],info[5],OrderStatusShow[status]];
        ordersShow.push(orderShow);
    }

    return ordersShow;
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
