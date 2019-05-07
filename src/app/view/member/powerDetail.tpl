<div class="new-page" w-class="page">
    <widget w-tag="app-view-member-home-powerCard">{name:"{{it.showType}}升级",money:{{it.showType=="海宝"?399:10000}} }</widget>
    <div w-class="title">
        <img src="../../res/image/iconArrow.png"/>
        <span style="margin-left:20px;">权益介绍</span>
    </div>

    {{for i,v of it.list}}
    <div w-class="row">
        <div w-class="num">{{i+1}}</div>
        <div>{{v}}</div>
    </div>
    {{end}}

    <div w-class="content">
        {{for i,v of it.powerList}}
        <div w-class="item" on-tap="itemClick({{i}})">
            <img src="{{v.img}}" w-class="image"/>
            <span w-class="text">{{v.name}}</span>
        </div>
        {{end}}
    </div>

    <div w-class="title">
        <img src="../../res/image/iconArrow.png"/>
        <span style="margin-left:20px;">仅{{it.showType}}会员享受此权益</span>
    </div>

    <div w-class="btn">立即开通</div>
</div>