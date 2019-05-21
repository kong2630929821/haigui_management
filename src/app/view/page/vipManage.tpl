<div w-class="page" ev-detail-back="detailBack">
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

        <div style="display:inline-block" ev-selected="filterUser">
            <widget w-tag="app-components-simpleFilter">{options:{{it.optionsList}},active:{{it.active}} }</widget>
        </div>
    </div>

        {{if it.showDataList}}
        <div ev-table-detail="goDetail">
            <div w-class="tableTitle">数据列表</div>
            <widget w-tag="app-components-tableDeal">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false,inlineBtn2:"查看详情" }</widget>
        </div>
        {{end}}

    {{else}}
    <widget w-tag="app-view-page-vipDetail">{uid:{{it.uid}},userLabel:{{it.userLabel}} }</widget>
    {{end}}
</div>