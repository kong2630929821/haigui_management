<div style="height:100%;width:100%;position: relative;">
    <div class="swiper-container" style="height:100%;width:100%;">
        <div class="swiper-wrapper">
            {{for i,v of it.list}}
            <div class="swiper-slide"><img src="../../res/image/{{it.clickAble ? v.images[0].path : v.path}}" style="width:100%;height:100%;"/></div>
            {{end}}
        </div>
    </div>
    <div w-class="navigation">{{it.activeIndex}}/{{it.list.length}}</div>
</div>