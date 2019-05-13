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