<div w-class="">
    <div w-class="back" on-tap="goBack">返回</div>
    <div w-class="table">
        {{for i,v of it.userData}}
        <div w-class="th">{{v.th}}</div>
        <div w-class="td">{{v.td}}</div>
        {{end}}

        <div w-class="th">操作</div>
        <div w-class="td">
            {{if it.userLabel == "市代理"}}
            <div w-class="btn" on-tap="dnUserType(0)">降为海王</div>
            <div w-class="btn" on-tap="upUserType(2)">升为省代理</div>
            {{elseif it.userLabel == "海王"}}
            <div w-class="btn" on-tap="upUserType(1)">升为市代理</div>
            {{elseif it.userLabel == "省代理"}}
            <div w-class="btn" on-tap="dnUserType(1)">降为市代理</div>
            {{end}}
        </div>
    </div>

    <div w-class="tabRow" style="margin:20px 0 10px;">
        <div w-class="tabBar {{it.activeTab==0?'activeTab':''}}" on-tap="changeTab(0)">ta的海宝</div>
        <div w-class="tabBar {{it.activeTab==1?'activeTab':''}}" on-tap="changeTab(1)">ta的海王</div>
    </div>

    <div>
        <div w-class="tableTitle">海宝列表</div>
        <widget w-tag="app-components-table">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false }</widget>
    </div>
</div>