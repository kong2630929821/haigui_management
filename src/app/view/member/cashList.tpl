<div class="new-page" w-class="page">
    {{if it.hasTitle}}
        <div w-class="title">
            <div w-class="amount">12</div>
            <div w-class="total">我的海宝总数</div>
        </div>
    {{end}}

    {{for i,v of it.list}}
        <div w-class="item" on-tap="goDetail({{i}})">
            <div w-class="top">
                <div w-class="name">{{v.name}}</div>
                <div w-class="desc">{{v.cash}}</div>
            </div>
            <div w-class="time">{{v.time}}</div>
        </div>
    {{end}}
</div>