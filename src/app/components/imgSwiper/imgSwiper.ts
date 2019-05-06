import { getRealNode } from '../../../pi/widget/painter';
import { Widget } from '../../../pi/widget/widget';
import { Swiper } from '../../res/js/swiper.min';
import { Level1Groups, MallImages } from '../../store/memstore';

interface Props {
    list:Level1Groups[] | MallImages[];   // Level1Groups,只展示location为特定的位置的分组 | image path列表
    clickAble:boolean;    // 首页面特殊分组可点击，跳转到分类页，详情页无法点击
}
/**
 * 轮播图组件
 */
export class ImgSwiper extends Widget {
    public swiper:any;
    public setProps(props:Props,oldProps:Props) {
        this.props = {
            ...props,
            activeIndex:1
        };
        super.setProps(this.props,oldProps);
        console.log('----------------------------',props);
    }
    public afterUpdate() {
        super.afterUpdate();
        if (this.swiper) return;
        setTimeout(() => {
            const $root = getRealNode((<any>this.tree).children[0]);
            this.swiper = new Swiper ($root, {
                loop: true, // 循环模式选项
                observer:true,// 修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,// 修改swiper的父元素时，自动初始化swiper
                autoplay: {
                    delay: 2000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false
                },
                on:{
                    slideChangeTransitionStart: (r) => {
                        this.props.activeIndex = this.swiper ? (this.swiper.activeIndex > this.props.list.length ? 1 : this.swiper.activeIndex) : 1; // 切换结束时，告诉我现在是第几个slide
                        this.paint();
                    }
                }
            });   
        },100);
    }
}