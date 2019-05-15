<div w-class="page" ev-detail-back="detailBack">
    <div w-class="tabRow">
        <div w-class="search" on-tap="search">订单列表</div>
    </div>
    <div w-class="searchBox">
            <div w-class="tableTitle">筛选查询</div>
            <div w-class="input">
                <widget w-tag="app-components-input">{placeHolder:"订单编号"}</widget>
            </div>
            <div w-class="search" on-tap="search">查询</div>
        </div>
    <div ev-table-detail="goDetail">
        <div w-class="tableTitle">数据列表</div>
        <widget w-tag="app-components-table">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false,inputFile:"选择" }</widget>
    </div>
</div>