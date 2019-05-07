<div style="height:100%;width:100%;position: relative;">
    <div class="swiper-container" style="height:100%;width:100%;">
        <div class="swiper-wrapper" on-tap="clickSlide">
            {{for i,v of it.list}}
            <div class="swiper-slide bg-img" style="background-image:url(../../res/image/{{v.images[0].path}});"></div>
            {{end}}
        </div>
    </div>
    <div w-class="navigation">{{it.activeIndex}}/{{it.list.length}}</div>
</div>