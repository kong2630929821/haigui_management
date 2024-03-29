<div w-class="page" ev-detail-back="detailBack" on-tap="pageClick" style="height:100%;">
    {{if !it.showDetail}}
    <div w-class="tabRow">
        <div w-class="tab">
            <img src="../../res/images/money.png" w-class="tabImg"/>
            <div>
                <div w-class="tabTitle">海王总数</div>
                <div w-class="amount">{{it.hWangNum}}</div>
            </div>
        </div>
        <div w-class="tab">
            <img src="../../res/images/calendar.png" w-class="tabImg"/>
            <div>
                <div w-class="tabTitle">海宝总数</div>
                <div w-class="amount">{{it.hBaoNum}}</div>
            </div>
        </div>
        <div w-class="tab">
            <img src="../../res/images/calendar.png" w-class="tabImg"/>
            <div>
                <div w-class="tabTitle">白客总数</div>
                <div w-class="amount">{{it.baikNum}}</div>
            </div>
        </div>
    </div>

    <div w-class="searchBox">
        <div w-class="tableTitle">筛选查询</div>
        <div style="display:flex; align-items: center;">
            <div w-class="input" ev-input-change="uidChange">
                <widget w-tag="app-components-input">{placeHolder:"查询用户ID"}</widget>
            </div>
            <div w-class="search" on-tap="search" on-down="onShow">查询</div>
    
            <div style="display:inline-block;margin-left: 25px;" ev-selected="filterUser" ev-expand="changeFilterBox">
                <widget w-tag="app-components-simpleFilter">{options:{{it.optionsList}},active:{{it.active}},expand:{{it.showFilterBox}} }</widget>
            </div>
        </div>
    </div>

        {{if it.showDataList}}
        <div ev-table-detail="goDetail">
            <div w-class="tableTitle">数据列表</div>
            <widget w-tag="app-components-tableDeal">{datas: {{it.curShowDataList}},title:{{it.showTitleList}},needCheckBox:false,inlineBtn2:"查看详情" }</widget>
        </div>
        {{end}}

    <div w-class="ctroller">
        <div w-class="searchleft" on-tap="exportAllInfo" on-down="onShow">导出全部信息</div>
        <div ev-changeCurrent="changePage" w-class="pagination" ev-perPage="perPage" ev-expand="expand">
            <widget w-tag="app-components-pagination">{pages:{{Math.ceil(it.showDataList.length/it.perPage)}},filterShow:true, currentIndex:{{it.curPage}},expand:{{it.expandIndex}},numberCheckActiveIndex:{{it.perPageIndex}} }</widget>
        </div>
    </div>

    {{else}}
    <div ev-change-userType="getDatas(true)">
        <widget w-tag="app-view-page-vipDetail">{uid:{{it.uid}},userLabel:{{it.userLabel}} }</widget>
    </div>
    {{end}}
</div>