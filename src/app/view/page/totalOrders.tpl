<div w-class="page" ev-detail-back="detailBack" on-tap="closeClick">
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
            <div w-class="dataBox" ev-period-change="changeTime" ev-dateBox-change="changeDateBox">
                <widget  w-tag="app-components-periodPicker">{startDate:{{it.startTime}},endDate:{{it.endTime}},showDateBox:{{it.showDateBox }} }</widget>
            </div>
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
        <widget w-tag="app-components-orderTable">{datas: {{it.contentList}},title:{{it.showTitleList}},needCheckBox:false}</widget>
    </div>
    <div w-class="searchleft" on-tap="exportOrder">导出订单</div>
    
    <div ev-input-file="importTransport"><app-components-inputFileBtn>{text:"导入运单"}</app-components-inputFileBtn></div>
</div>