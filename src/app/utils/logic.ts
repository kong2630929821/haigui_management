/**
 * 本地方法
 */
declare var wx;
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