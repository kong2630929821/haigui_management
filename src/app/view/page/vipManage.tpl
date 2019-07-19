<div w-class="page" ev-detail-back="detailBack" on-tap="pageClick">
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
        <div w-class="input" ev-input-change="uidChange">
            <widget w-tag="app-components-input">{placeHolder:"查询用户ID"}</widget>
        </div>
        <div w-class="search" on-tap="search">查询</div>

        <div style="display:inline-block" ev-selected="filterUser" ev-expand="changeFilterBox">
            <widget w-tag="app-components-simpleFilter">{options:{{it.optionsList}},active:{{it.active}},expand:{{it.showFilterBox}} }</widget>
        </div>
    </div>

        {{if it.showDataList}}
        <div ev-table-detail="goDetail">
            <div w-class="tableTitle">数据列表</div>
            <widget w-tag="app-components-tableDeal">{datas: {{it.curShowDataList}},title:{{it.showTitleList}},needCheckBox:false,inlineBtn2:"查看详情" }</widget>
        </div>
        {{end}}
    {{if Math.ceil(it.showDataList.length/it.perPage)}}
    <div ev-changeCurrent="changePage" w-class="pagination-box" ev-perPage="perPage">
        <widget w-tag="app-components-pagination">{pages:{{Math.ceil(it.showDataList.length/it.perPage)}},filterShow:true, currentIndex:{{it.curPage}} }</widget>
    </div>
    {{end}}
    {{else}}
    <div ev-change-userType="getDatas(true)">
        <widget w-tag="app-view-page-vipDetail">{uid:{{it.uid}},userLabel:{{it.userLabel}} }</widget>
    </div>
    {{end}}
</div>