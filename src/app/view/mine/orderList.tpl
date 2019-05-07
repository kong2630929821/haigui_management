<div class="new-page" w-class="page">
    <div w-class="orderType">
        {{for i,v of it.orderType}}
        <div w-class="item" on-tap="typeClick({{i}})">
            <img src="../../../res/image/{{v.img}}"/>
            <div w-class="name {{it.active==i?'active':''}}">{{v.name}}</div>
        </div>
        {{end}}
    </div>

    <div w-class="content">
        {{for i,v of it.list}}
        <div ev-btn-click="btnClick(e,{{i}})" ev-item-click="itemClick({{i}})">
            <widget w-tag="app-view-mine-orderItem"></widget>
        </div>
        {{end}}
    </div>

</div>