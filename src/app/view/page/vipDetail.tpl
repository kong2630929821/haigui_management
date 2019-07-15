<div w-class="">
    <div w-class="back" on-tap="goBack">返回</div>
    <div w-class="table">
        {{for i,v of it.userData}}
        <div style="display:flex;flex:1 0 0;">
            <div w-class="th">{{v.th}}</div>
            <div w-class="td">
                <p>{{v.td}}</p>
                {{if i==6}}
                    <p w-class="changeMoney" on-tap="changeMoney">修改</p>
                {{end}}
            </div>
        </div>
        {{end}}
        <div style="display:flex;flex:1 0 0;">
            <div w-class="th">操作</div>
            <div w-class="td" style="justify-content:center;">
                {{if it.userLabel == "市代理"}}
                <div w-class="btn" on-tap="dnUserType(e,0)">降为海王</div>
                <div w-class="btn" on-tap="upUserType(e,2)">升为省代理</div>
                {{elseif it.userLabel == "海王"}}
                <div w-class="btn" on-tap="upUserType(e,1)">升为市代理</div>
                {{elseif it.userLabel == "省代理"}}
                <div w-class="btn" on-tap="dnUserType(e,1)">降为市代理</div>
                {{end}}
                <div w-class="btn" style="margin:0px;" on-tap="changeBinding">调整绑定人</div>
            </div>
        </div>
    </div>

    <div style="margin-top:30px;">
        <div w-class="tableTitle">身份变更信息</div>
        <widget w-tag="app-components-tableDeal">{datas: {{it.userShowDataList}},title:{{it.userTitleList}},needCheckBox:false }</widget>
    </div>
    <div w-class="tabRow" style="margin:20px 0 10px;">
        <div w-class="tabBar {{it.activeTab==0?'activeTab':''}}" on-tap="changeTab(0)">ta的海王</div>
        <div w-class="tabBar {{it.activeTab==1?'activeTab':''}}" on-tap="changeTab(1)">ta的海宝</div>
        <div w-class="tabBar {{it.activeTab==2?'activeTab':''}}" on-tap="changeTab(2)">ta的白客</div>
        <div w-class="tabBar {{it.activeTab==3?'activeTab':''}}" on-tap="changeTab(3)">资金</div>
        <div w-class="tabBar {{it.activeTab==4?'activeTab':''}}" on-tap="changeTab(4)">海贝</div>
        <div w-class="tabBar {{it.activeTab==5?'activeTab':''}}" on-tap="changeTab(5)">积分</div>
    </div>

    <div>
        {{:typeList = ["海王","海宝","白客","资金明细","海贝明细","积分明细"]}}
        <div w-class="tableTitle">{{typeList[it.activeTab]}}列表</div>
        <widget w-tag="app-components-tableDeal">{datas: {{it.curShowDataList}},title:{{it.showTitleList}},needCheckBox:false }</widget>
    </div>
    {{if Math.ceil(it.showDataList.length/5) > 0}}
    <div ev-changeCurrent="changePage" w-class="pagination-box">
        <widget w-tag="app-components-pagination">{pages:{{Math.ceil(it.showDataList.length/5)}} }</widget>
    </div>
    {{end}}
</div>