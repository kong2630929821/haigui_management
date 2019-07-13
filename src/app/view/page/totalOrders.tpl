<div w-class="page" ev-detail-back="detailBack" on-tap="closeClick">
    {{if it.showDetail > -1}}
        <widget w-tag="app-view-page-orderDetail">{dataList:{{it.contentList[it.showDetail]}} }</widget>
    {{else}}
        <div w-class="searchBox">
            <div w-class="tableTitle">筛选查询</div>
            <div w-class="btnBox">
                <div w-class="item">
                    <div w-class="input" ev-input-change='inputValue'>
                        <widget w-tag="app-components-input">{placeHolder:"订单编号"}</widget>
                    </div>
                    <div w-class="searchleft" on-tap="searchById">查询</div>
                </div>
                <div w-class="item">
                    <div style="display:inline-block;height: 50px;" ev-selected="filterTimeType">
                        <widget w-tag="app-components-simpleFilter1">{options:{{it.timeType}},activeIndex:{{it.timeTypeActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
                    </div>
                    <div w-class="dataBox" ev-period-change="changeTime" ev-dateBox-change="changeDateBox">
                        <widget  w-tag="app-components-periodTimePicker">{startDate:{{it.startTime}},endDate:{{it.endTime}},showDateBox:{{it.showDateBox }} }</widget>
                    </div>
                </div>
                <div w-class="select" >
                    <div style="display:inline-block;" ev-selected="filterSupplierId">
                        <widget w-tag="app-components-simpleFilter">{options:{{it.supplierList}},active:{{it.supplierActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
                    </div>
                </div>
                <div w-class="select">
                    <div style="display:inline-block;" ev-selected="filterOrderType">
                        <widget w-tag="app-components-simpleFilter1">{options:{{it.orderType}},activeIndex:{{it.orderTypeActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
                    </div>
                </div>
                <div w-class="select">
                    <div style="display:inline-block;" ev-selected="filterExportType">
                        <widget w-tag="app-components-simpleFilter1">{options:{{it.orderState}},activeIndex:{{it.orderStateActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
                    </div>
                </div>   
            </div>
        </div>
        <div w-class="order-table-box" ev-select-click="selectClick" ev-export-order="exportOrder" ev-import-order="importTransport" ev-import-allOrder='exportAllOrder' ev-table-quitOrder="quitOrder" on-tap="importTable" ev-table-detail="goDetail">
            <widget w-tag="app-components-orderTable">{datas: {{it.contentList}},showDatas:{{it.contentShowList}},title:{{it.showTitleList}},needCheckBox:true }</widget>
        </div>
        {{:totalPage = Math.ceil(it.totalCount/ it.orderMaxCount)}}
        {{if totalPage>0}}
        <div  w-class="pagination-box" ev-changeCurrent="pageChange">
            <widget w-tag="app-components-pagination">{pages:{{totalPage}},forceUpdate:{{it.forceUpdate}} }</widget>
        </div>
        {{end}}
    {{end}}
</div>