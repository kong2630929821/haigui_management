/**
 * 钱包登录模块
 */

import { open, request, setReloginCallback, setUrl } from '../../pi/net/ui/con_mgr';
import { wsUrl } from '../config';
// tslint:disable-next-line:max-line-length

/**
 * 通用的异步通信
 */
export const requestAsync = (msg: any):Promise<any> => {
    return new Promise((resolve, reject) => {
        request(msg, (resp: any) => {
            if (resp.type) {
                console.log(`错误信息为${resp.type}`);
                reject(resp);
            } else if (resp.result !== 1) {
                reject(resp);
            } else {
                resolve(resp);
            }
        });
    });
};

 // 设置重登录回调
setReloginCallback((res) => {
    const rtype = res.type;
    console.log('relogin ',rtype);
    if (rtype === 'logerror') {  //  重登录失败，登录流程重走一遍
        openConnect();
    } else {
       // 
    }
});

/**
 * 开启连接
 */
export const openConnect = () => {
    setUrl(wsUrl);
    open(conSuccess,conError,conClose,conReOpen);
};

/**
 * 连接成功回调
 */
const conSuccess = () => {
    console.timeEnd('con Success');
};

/**
 * 连接出错回调
 */
const conError = (err) => {
    console.log('con error');
};

/**
 * 连接关闭回调
 */
const conClose = () => {
    console.log('con close');
};

/**
 * 重新连接回调
 */
const conReOpen = () => {
    console.log('con reopen');
};