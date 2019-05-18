import { popNew } from '../../pi/ui/root';

/**
 * 本地方法
 */
declare var wx;
/**
 * 选择图片
 * @param num 最多数量
 */
export const selectImg = (num:number,cb:Function) => {
    wx.chooseImage({
        count: num || 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res:any) {
            const src = res.tempFilePaths;  
            cb(src);  // 返回图片路径数组
        }
    });
};

/**
 * 上传图片
 * @param img 需要上传的图片的本地ID，由chooseImage接口获得
 */
export const updateImg = (img,cb) => {
    wx.uploadImage({
        localId: img, 
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: (res) => {
            const serverId = res.serverId; // 返回图片的服务器端ID
            // TODO 上传到本地服务器
        }
    });
};

/**
 * 分享给微信或QQ好友
 * @param title 标题
 * @param desc 描述
 * @param link 链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
 * @param imgUrl 图标
 */
export const shareToFriend = (title,desc,link,imgUrl,cb?) => {
    wx.ready(() => {   // 需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({ 
            title: title, 
            desc: desc, 
            link: link, 
            imgUrl: imgUrl, 
            success: () => {
                cb && cb();
            }
        });
    });
};

/**
 * 分享到朋友圈或QQ空间
 * @param title 标题
 * @param link 链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
 * @param imgUrl 图标
 */
export const shareToGround = (title,link,imgUrl,cb?) => {
    wx.ready(() => {      // 需在用户可能点击分享按钮前就先调用
        wx.updateTimelineShareData({ 
            title: title,
            link: link, 
            imgUrl: imgUrl, 
            success: () => {
                cb && cb();
            }
        });
    });
};

/**
 * 弹窗提示
 * @param content mess
 * @param itype success | warn | error | notice
 */
export const popNewMessage = (content:string, itype:string = 'success') => {
    popNew('pi-components-message-message', { type: itype, content: content, center: true });
};

/**
 * 时间控件的本地方法
 */
// 从某一天往前或往后加几天
// day可以为负数
const oneDay = 86400000; // 一天有多少毫秒
export const parseDate = (time:string,day:number,fg?:number) => {
    const timestamp = Date.parse(time) + day * oneDay;
    
    return dateToString(timestamp,fg);
};
// 将时间戳转换为字符串时间 
// fg为0或不传 返回日期'2019-01-01'
// fg为1 返回完整的时间'2019-01-01 10:00:00' 
// fg为2 不返回秒
export const dateToString = (timestamp:number,fg?:number) => {
    const virtualDate = new Date(timestamp);
    const year = virtualDate.getFullYear();
    const month = virtualDate.getMonth() + 1;
    const date = virtualDate.getDate();
    const hour = virtualDate.getHours();
    const minute = virtualDate.getMinutes();
    const second = virtualDate.getSeconds();

    const showYear = year >= 10 ? year :`0${year}` ;
    const showMonth = month >= 10 ? month :`0${month}`;
    const showDate = date >= 10 ? date :`0${date}`; 
    const showHour = hour >= 10 ? hour :`0${hour}`;
    const showminute = minute >= 10 ? minute :`0${minute}`;
    const showsecond = second >= 10 ? second :`0${second}`;
    if (fg === 1) {
        return `${showYear}-${showMonth}-${showDate} ${showHour}:${showminute}:${showsecond}`;
    } else if (fg === 2) {
        return `${showYear}-${showMonth}-${showDate} ${showHour}:${showminute}`;
    }
    
    return `${showYear}-${showMonth}-${showDate}`;
};
// 两个日期之间相差多少天
export const subtractDate = (time1:string,time2:string) => {
    return Math.abs(Date.parse(time2) - Date.parse(time1)) / oneDay;
};

// 判断两个日期的大小
export const compareDate = (time1:string,time2:string) => {
    return Date.parse(time1) > Date.parse(time2);
};
