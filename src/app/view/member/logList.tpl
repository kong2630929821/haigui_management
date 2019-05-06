<div class="new-page" w-class="page">
    <div w-class="title">
        <div w-class="amount">12</div>
        <div w-class="total">我的海宝总数</div>
    </div>

    {{for i,v of it.list}}
        <div w-class="item" on-tap="goDetail({{i}})">
            <div w-class="left">
                <div w-class="name">{{v.name}}</div>
                <div w-class="desc">{{v.desc}}</div>
            </div>
            <div w-class="middle">{{v.tel}}</div>
            <img src="../../res/image/arrowRight.png" w-class="right"/>
        </div>
    {{end}}
</div>