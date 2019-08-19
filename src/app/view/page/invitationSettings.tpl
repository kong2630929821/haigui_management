<div w-class="page" ev-detail-back="detailBack" on-tap="close">
    <div w-class="searchBox">
        <div w-class="tableTitle">类别</div>
        <div w-class="filterBox">
            <div w-class="tabRow" style="margin:20px 20px;">
                {{if 1==2}}
                <div w-class="tabBar {{it.activeTab==0?'activeTab':''}}" on-tap="changeTab(0)" on-down="onShow">特殊商品</div>
                {{end}}
                <div w-class="tabBar {{it.activeTab==1?'activeTab':''}}" on-tap="changeTab(1)" on-down="onShow">海王每周权益</div>
                <div w-class="tabBar {{it.activeTab==2?'activeTab':''}}" on-tap="changeTab(2)" on-down="onShow">海宝每周权益</div>
                {{if 1==2}}
                <div w-class="tabBar {{it.activeTab==3?'activeTab':''}}" on-tap="changeTab(3)" on-down="onShow">普通用户</div>
                {{end}}
            </div>
        </div>
    </div>
    <div w-class="shopSum">共{{it.realSum}}条记录</div> 
    <div ev-table-detail="goDetail({{it.activeTab}},e)">
        <div w-class="tableTitle">特殊商品列表</div>
        <widget w-tag="app-components-table">{datas: {{it.goodsConfig}},title:{{it.showTitleList}},needCheckBox:false,auto:true,inlineBtn1:"编辑"}</widget>
    </div>
    <div w-class="ctroller">
            {{%<!-- <div w-class="searchleft" on-tap="addGradientOut">添加</div> -->}}
        <div w-class="searchleft" on-tap="application" on-down="onShow">应用</div>
    </div>
</div>