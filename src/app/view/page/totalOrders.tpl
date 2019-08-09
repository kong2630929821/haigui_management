<div w-class="page" ev-detail-back="detailBack" on-tap="closeClick">
    {{if it.showDetail > -1}}
        <widget w-tag="app-view-page-orderDetail">{dataList:{{it.contentList[it.showDetail]}} }</widget>
    {{else}}
        <div w-class="searchBox">
            <div w-class="tableTitle">筛选查询</div>
            <div w-class="btnBox">
                <div w-class="item">
                    <div w-class="input" ev-input-change='inputValue'>
                        <widget w-tag="app-components-input">{placeHolder:"订单编号,用户ID/手机号码",itype:"number"}</widget>
                    </div>
                    <div w-class="searchleft" on-tap="searchById" on-down="onShow">查询</div>
                </div>
                <div w-class="item">
                    <div style="display:inline-block;height: 50px;" ev-selected="filterTimeType" ev-expand="expand({{0}},e)">
                        <widget w-tag="app-components-simpleFilter1">{options:{{it.timeType}},activeIndex:{{it.timeTypeActiveIndex}},expand:{{it.expandIndex[0]}} }</widget>
                    </div>
                    <div w-class="dataBox" ev-period-change="changeTime" ev-dateBox-change="changeDateBox">
                        <widget  w-tag="app-components-periodTimePicker">{startDate:{{it.startTime}},endDate:{{it.endTime}},showDateBox:{{it.showDateBox }} }</widget>
                    </div>
                </div>
                <div w-class="select" >
                    <div style="display:inline-block;" ev-selected="filterSupplierId" ev-expand="expand({{1}},e)">
                        <widget w-tag="app-components-simpleFilter">{options:{{it.supplierList}},active:{{it.supplierActiveIndex}},expand:{{it.expandIndex[1]}} }</widget>
                    </div>
                </div>
                <div w-class="select">
                    <div style="display:inline-block;" ev-selected="filterOrderType" ev-expand="expand({{2}},e)">
                        <widget w-tag="app-components-simpleFilter1">{options:{{it.orderType}},activeIndex:{{it.orderTypeActiveIndex}},expand:{{it.expandIndex[2]}} }</widget>
                    </div>
                </div>
                <div w-class="select">
                    <div style="display:inline-block;" ev-selected="filterExportType" ev-expand="expand({{3}},e)">
                        <widget w-tag="app-components-simpleFilter1">{options:{{it.orderState}},activeIndex:{{it.orderStateActiveIndex}},expand:{{it.expandIndex[3]}} }</widget>
                    </div>
                </div>   
            </div>
        </div>
        <div w-class="order-table-box" ev-select-click="selectClick" ev-export-order="exportOrder" ev-import-order="importTransport" ev-import-allOrder='exportAllOrder' ev-table-quitOrder="quitOrder" on-tap="importTable" ev-table-detail="goDetail">
            <widget w-tag="app-components-orderTable">{datas: {{it.contentList}},showDatas:{{it.contentShowList}},title:{{it.showTitleList}},needCheckBox:true }</widget>
        </div>
        {{:totalPage = Math.ceil(it.totalCount/ it.perPage)}}
        {{if totalPage>0}}
        <div  w-class="pagination-box" ev-changeCurrent="pageChange" ev-perPage="perPage" ev-expand="expand({{4}},e)">
            <widget w-tag="app-components-pagination">{pages:{{totalPage}},forceUpdate:{{it.forceUpdate}},filterShow:true, currentIndex:{{it.currentPageIndex}},numberCheckActiveIndex:{{it.perPageIndex}},expand:{{it.expandIndex[4]}}  }</widget>
        </div>
        {{end}}
    {{end}}
</div>