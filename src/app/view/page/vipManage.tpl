<div w-class="page" ev-detail-back="detailBack">
    {{if !it.showDetail}}
    <div w-class="tabRow">
        <div w-class="tab">
            <img src="../../res/images/money.png" w-class="tabImg"/>
            <div>
                <div w-class="tabTitle">海王总数</div>
                <div w-class="amount">7</div>
            </div>
        </div>
        <div w-class="tab">
            <img src="../../res/images/calendar.png" w-class="tabImg"/>
            <div>
                <div w-class="tabTitle">海宝总数</div>
                <div w-class="amount">7</div>
            </div>
        </div>
    </div>

    <div w-class="searchBox">
        <div w-class="tableTitle">筛选查询</div>
        <div w-class="input">
            <widget w-tag="app-components-input">{placeHolder:"查询用户ID"}</widget>
        </div>
        <div w-class="search" on-tap="search">查询</div>
    </div>

    <div ev-table-detail="goDetail">
        <div w-class="tableTitle">数据列表</div>
        <widget w-tag="app-components-table">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false,inlineBtn1:"查看详情" }</widget>
    </div>
    {{else}}
    <widget w-tag="app-view-page-vipDetail"></widget>
    {{end}}
</div>