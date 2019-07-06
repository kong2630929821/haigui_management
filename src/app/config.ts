/**
 * 配置文件
 */

export const sourceIp = window.location.host;

// 资源服务器port 有些手机浏览器显示端口号无法识别  全部使用默认端口
export const sourcePort = window.location.port || '80';

// HTTP请求端口号
export const httpPort = '8092';

// erlang逻辑服务器ip
// app.herominer.net
export const erlangLogicIp = sourceIp; 

// erlang逻辑服务器port
export const erlangLogicPort = '2090';

// websock连接url
export const wsUrl = `ws://${erlangLogicIp}:${erlangLogicPort}`;

// 分组位置定义
export enum GroupsLocation {
    FIRST = 1,    // 位置1 （顶部轮播图）
    SECOND = 2,  //  位置2 （轮播图下方分组）
    THIRD = 3   //   位置3  （剩下分组）
}

// 一次性最多获取多少订单
export const orderMaxCount = 20;

// 图片路径
export const mallImagPre = `http://cshop.baomtx.com/dst/imgs/`;