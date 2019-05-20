<div w-class="page" ev-detail-back="detailBack">
    <div w-class="searchBox">
        <div w-class="tableTitle">筛选查询</div>
        <div w-class="btnBox">
            <div w-class="input" ev-input-change='inputValue'>
                    <widget w-tag="app-components-input">{placeHolder:"订单编号"}</widget>
            </div>
            <div w-class="searchleft" on-tap="searchById">查询</div>
            <div style="display:inline-block;margin:25px;" ev-selected="filterTimeType">
                <widget w-tag="app-components-simpleFilter">{options:["下单时间","支付时间","收货时间","发货时间","完成时间"],active:{{it.active}} }</widget>
            </div>
            <input type="datetime-local" on-change="startTime"/>
            <input type="datetime-local" on-change="endTime"/>
            <div w-class="select">
                <div style="display:inline-block;" ev-selected="filterSupplierId">
                        <widget w-tag="app-components-simpleFilter">{options:{{it.supplierList}},active:{{it.active}} }</widget>
                </div>
            </div>
            <div w-class="select">
                <div style="display:inline-block;" ev-selected="filterOrderType">
                        <widget w-tag="app-components-simpleFilter">{options:{{it.orderType}},active:{{it.active}} }</widget>
                </div>
            </div>
            <div w-class="select">
                <div style="display:inline-block;" ev-selected="filterExportType">
                        <widget w-tag="app-components-simpleFilter">{options:{{it.exportType}},active:{{it.active}} }</widget>
                </div>
            </div>   
        </div>
    </div>
    <div>
        <div w-class="tableTitle">数据列表</div>
        <widget w-tag="app-components-table">{datas: {{it.contentList}},title:{{it.showTitleList}},needCheckBox:false}</widget>
    </div>
    <div w-class="searchleft" on-tap="exportOrder">导出订单</div>
    <input type="file" on-change="importTransport"/>导入运单
</div>