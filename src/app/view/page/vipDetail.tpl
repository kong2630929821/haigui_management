<div w-class="" on-tap="close" style="height:100%">
    {{if it.status}}
    <div w-class="back" on-tap="goBack" on-down="onShow">返回</div>
    <div w-class="table">
        {{for i,v of it.userData}}
        <div style="display:flex;flex:1 0 0;">
            <div w-class="th">{{v.th}}</div>
            <div w-class="td">
                <p>{{v.td}}</p>
                {{if i==6}}
                    <p w-class="changeMoney" on-tap="changeMoney" on-down="onShow">修改</p>
                {{end}}
            </div>
        </div>
        {{end}}
        <div style="display:flex;flex:1 0 0;">
            <div w-class="th">操作</div>
            <div w-class="td" style="justify-content:center;">
                {{if it.userLabel=="白客"}}
                    <div w-class="btn" on-tap="upUserType(e,1,2,'')" on-down="onShow">升为海宝</div>
                    <div w-class="btn" on-tap="upUserType(e,3,1,'')" on-down="onShow">升为海王</div>
                    <div w-class="btn" on-tap="upUserType(e,2,2,3)" on-down="onShow">升为海宝（体验）</div>
                    <div w-class="btn" on-tap="upUserType(e,6,1,3)" on-down="onShow">升为海王（体验）</div>
                {{elseif it.userLabel=="海宝"}}
                    <div w-class="btn" on-tap="upUserType(e,3,1,'')" on-down="onShow">升为海王</div>
                    <div w-class="btn" on-tap="dnUserType(e,2,2,3)" on-down="onShow">降为海宝（体验）</div>
                    <div w-class="btn" on-tap="upUserType(e,6,1,3)" on-down="onShow">升为海王（体验）</div>
                {{elseif it.userLabel=="海宝（体验）"}}
                    <div w-class="btn" on-tap="upUserType(e,1,2,'')" on-down="onShow">升为海宝</div>
                    <div w-class="btn" on-tap="upUserType(e,3,1,'')" on-down="onShow">升为海王</div>
                    <div w-class="btn" on-tap="upUserType(e,6,1,3)" on-down="onShow">升为海王（体验）</div>
                {{elseif it.userLabel=="海王"}}
                    <div w-class="btn" on-tap="dnUserType(e,6,1,3)" on-down="onShow">降为海王（体验）</div>
                    <div w-class="btn" on-tap="upUserType(e,4,1,1)" on-down="onShow">升为市代理</div>
                    <div w-class="btn" on-tap="upUserType(e,5,1,2)" on-down="onShow">升为省代理</div>
                {{elseif it.userLabel=="海王（体验）"}}
                    <div w-class="btn" on-tap="upUserType(e,3,1,'')" on-down="onShow">升为海王</div>
                    <div w-class="btn" on-tap="upUserType(e,4,1,1)" on-down="onShow">升为市代理</div>
                    <div w-class="btn" on-tap="upUserType(e,5,1,2)" on-down="onShow">升为省代理</div>
                {{elseif it.userLabel == "市代理"}}
                    <div w-class="btn" on-tap="dnUserType(e,6,1,3)" on-down="onShow">降为海王（体验）</div>
                    <div w-class="btn" on-tap="dnUserType(e,3,1,'')" on-down="onShow">降为海王</div>
                    <div w-class="btn" on-tap="upUserType(e,5,1,2)" on-down="onShow">升为省代理</div>
                {{elseif it.userLabel == "省代理"}}
                    <div w-class="btn" on-tap="dnUserType(e,6,1,3)" on-down="onShow">降为海王（体验）</div>
                    <div w-class="btn" on-tap="dnUserType(e,3,1,'')" on-down="onShow">降为海王</div>
                    <div w-class="btn" on-tap="dnUserType(e,4,1,1)" on-down="onShow">降为市代理</div>
                {{end}}
                <div w-class="btn" style="margin:0px;" on-tap="changeBinding" on-down="onShow">调整绑定人</div>
            </div>
        </div>
    </div>
    <div style="margin-top:30px;">
        <div w-class="tableTitle">身份变更信息</div>
        <widget w-tag="app-components-tableDeal">{datas: {{it.userShowDataList}},title:{{it.userTitleList}},needCheckBox:false }</widget>
    </div>

    <div w-class="tabRow" style="margin:20px 0 10px;">
        <div style="flex:1;display:flex;">
            <div w-class="tabBar {{it.activeTab==0?'activeTab':''}}" on-tap="changeTab(0)" on-down="onShow">ta的海王{{it.activeTab==0?'('+it.showDataList.length+')':''}}</div>
            <div w-class="tabBar {{it.activeTab==1?'activeTab':''}}" on-tap="changeTab(1)" on-down="onShow">ta的海宝{{it.activeTab==1?'('+it.showDataList.length+')':''}}</div>
            <div w-class="tabBar {{it.activeTab==2?'activeTab':''}}" on-tap="changeTab(2)" on-down="onShow">ta的白客{{it.activeTab==2?'('+it.showDataList.length+')':''}}</div>
            <div w-class="tabBar {{it.activeTab==3?'activeTab':''}}" on-tap="changeTab(3)" on-down="onShow">资金</div>
            <div w-class="tabBar {{it.activeTab==4?'activeTab':''}}" on-tap="changeTab(4)" on-down="onShow">海贝</div>
            <div w-class="tabBar {{it.activeTab==5?'activeTab':''}}" on-tap="changeTab(5)" on-down="onShow">积分</div>
        </div>
        <div style="flex:1;display:flex;justify-content: flex-end;align-items: center;">
            <div style="margin-right: 30px;">间推人数共{{it.indirectPeople}}人</div>
        </div>
    </div>

    <div ev-table-detail="goDetail">
        <div w-class="tableTitle">{{it.title[it.activeTab]}}列表</div>
        <widget w-tag="app-components-tableDeal">{datas: {{it.curShowDataList}},title:{{it.showTitleList}},needCheckBox:false,inlineBtn2:{{it.activeTab < 3 ? '详情':''}} }</widget>
    </div>
    {{if Math.ceil(it.showDataList.length/it.perPage) > 0}}
    <div w-class="ctroller">
        <div w-class="searchleft" on-tap="exportAllInfo" on-down="onShow">导出全部信息</div>
        <div ev-changeCurrent="changePage" w-class="pagination"  ev-perPage="perPage" ev-expand="expand">
            <widget w-tag="app-components-pagination">{pages:{{Math.ceil(it.showDataList.length/it.perPage)}},filterShow:true, currentIndex:{{it.curPage}},expand:{{it.expandIndex}},numberCheckActiveIndex:{{it.perPageIndex}} }</widget>
        </div>
    </div>  
    {{end}}
    {{else}}
        <div ev-userDetail-back="getDatas">
            <widget w-tag="app-view-page-subordinateFundDetails">{uid:{{it.currendUid}} }</widget>
        </div>
    {{end}}
</div>