/**
 * 本地方法
 */
import { popNew } from '../../pi/ui/root';

/**
 * 弹窗提示
 * @param content mess
 * @param itype success | warn | error | notice
 */
export const popNewMessage = (content:string, itype:string = 'success') => {
    popNew('app-components-message', { itype, content, center: true });
};

/**
 * 时间戳格式化 毫秒为单位
 * timeType 1 返回时分， 2 返回月日， 3 返回月日时分， 4 返回月日时分 
 */ 
export const timestampFormat = (timestamp: number,timeType?: number) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : `0${date.getMonth() + 1}`;
    const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
    const hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
    const minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
    const seconds = date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`;

    if (timeType === 1) {
        return `${hour}:${minutes}`;
    }
    if (timeType === 2) {
        return `${month}月${day}日`;
    }
    if (timeType === 3) {
        return `${month}月${day}日 ${hour}:${minutes}`;
    }
    if (timeType === 4) {
        return `${month}-${day} ${hour}:${minutes}`;
    }

    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
};

/**
 * unicode转string
 */
export const unicode2Str = (infos:any) => {
    if (typeof infos !== 'object') return infos;
    let str = '';
    for (const v of infos) {
        str += String.fromCharCode(v);
    }

    return str;
};

// 价格格式化
export const priceFormat = (price:number) => {
    return (price / 100).toFixed(2);
};