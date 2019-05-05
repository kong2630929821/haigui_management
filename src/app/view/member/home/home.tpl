<div>
    {{if it.userType == 0}}
        <widget w-tag="app-view-member-home-powerCard">{name:"海宝升级",money:399}</widget>
    {{else}}
        <div w-class="top">
            {{for i,v of it.tabList}}
            <div w-class="tab">
                <div w-class="amount">{{v.amount}}</div>
                <div>{{v.total}}</div>
            </div>
            {{end}}
        </div>

        <div w-class="title">我的权益</div>
        <div w-class="content">
            {{for i,v of it.powerList}}
            <div w-class="item" on-tap="itemClick({{i}})">
                <img src="{{v.img}}" w-class="image"/>
                <span w-class="text">{{v.name}}</span>
            </div>
            {{end}}
        </div>
    {{end}}

    {{if it.userType < 2}}
    <widget w-tag="app-view-member-home-powerCard" style="margin-top:60px;">{name:"海王升级",money:10000}</widget>
    {{end}}
    
</div>