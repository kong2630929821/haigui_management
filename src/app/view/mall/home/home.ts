import { Widget } from '../../../../pi/widget/widget';

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
/**
 * 测试
 */
export class Home1 extends Widget {
    public ck() {
        console.log('hello');
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success(res:any) {
                const src = res.tempFilePaths;  
                console.log('world');
            }
        });
    }
}
