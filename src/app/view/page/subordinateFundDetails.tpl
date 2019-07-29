<div style="" on-tap="close" style="height:100%">
    <div w-class="back" on-tap="goBack" on-down="onShow">返回</div>
    
    <div w-class="searchBox">
        <div w-class="tableTitle">下级详细明细</div>
        <div w-class="filterBox">
            <div w-class="tabRow" style="margin:20px 0 10px;">
                <div w-class="tabBar {{it.activeTab==0?'activeTab':''}}" on-tap="changeTab(0)" style="margin-left: 30px;" on-down="onShow">资金</div>
                <div w-class="tabBar {{it.activeTab==1?'activeTab':''}}" on-tap="changeTab(1)" on-down="onShow">海贝</div>
                <div w-class="tabBar {{it.activeTab==2?'activeTab':''}}" on-tap="changeTab(2)" on-down="onShow">积分</div>
            </div>
        </div>
    </div>

    <div ev-table-detail="goDetail">
        {{:typeList = ["资金明细","海贝明细","积分明细"]}}
        <div w-class="tableTitle">{{typeList[it.activeTab]}}列表</div>
        <widget w-tag="app-components-table">{datas: {{it.curShowDataList}},title:{{it.showTitleList}},needCheckBox:false,auto:true }</widget>
    </div>
    {{if Math.ceil(it.showDataList.length/it.perPage) > 0}}
    <div w-class="ctroller">
        <div ev-changeCurrent="changePage" w-class="pagination" ev-perPage="perPage" ev-expand="expand">
            <widget w-tag="app-components-pagination">{pages:{{Math.ceil(it.showDataList.length/it.perPage)}},filterShow:true, currentIndex:{{it.curPage}},expand:{{it.expandIndex}},numberCheckActiveIndex:{{it.perPageIndex}} }</widget>
        </div>
    </div>
    {{end}}
</div>