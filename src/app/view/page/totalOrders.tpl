<div w-class="page" ev-detail-back="detailBack">
    <div w-class="tabRow">
        <div w-class="search" on-tap="search">订单列表</div>
    </div>
    <div w-class="searchBox">
            <div w-class="tableTitle">筛选查询</div>
            <div style="display:inline-block" ev-selected="filterUser">
                <widget w-tag="app-components-simpleFilter">{options:["海王","海宝"],active:{{it.active}} }</widget>
            </div>
            <div w-class="input">
                <widget w-tag="app-components-input">{placeHolder:"订单编号"}</widget>
            </div>
            <div w-class="search" on-tap="exportOrder">导出订单</div>
            <input type="file" on-change="importTransport"/>导入运单
        </div>
</div>