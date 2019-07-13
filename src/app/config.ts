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
    CLASSIFICATION = 20001,    // 分类页
    FIRST = 10001,    //   首页位置1  轮播图
    SECOND = 10002,   //   首页位置2 
    THIRD = 10003,    //   首页位置3 
    FOUR = 10004,     //   首页位置4 
    FIVE = 10005,     //   首页位置5 
    SIX = 10006,      //   首页位置6 
    SEVEN = 10007,    //   首页位置7 
    EIGHT = 10008,    //   首页位置8 
    NINE = 10009,     //   首页位置9 
    TEN = 10010,      //   首页位置10 
    ELEVEN = 10011,   //   首页位置11 
    TWLEVE = 10012,   //   首页位置12 
    THIRTEEN = 10013, //   首页位置13 
    FOURTEEN = 10014, //   首页位置14 
    FIFTEEN = 10015,  //   首页位置15 
    SIXTEEN = 10016,  //   首页位置16 
    SEVENTEEN = 10017 //   首页位置17 
}

// 一次性最多获取多少订单
export const orderMaxCount = 20;

// 商城图片路径
// export const mallImagPre = `http://cshop.baomtx.com/dst/imgs/`;
export const mallImagPre = `http://${window.localStorage.severIp ? window.localStorage.severIp :sourceIp}/dst/imgs/`;

// 未支付订单15分钟后回到购物车中，库存也会回退
export const PendingPaymentDuration = 15 * 60 * 1000;

// 获取图片路径
export const serverFilePath = `http://${sourceIp}:${sourcePort}/service/get_file?sid=`;