<div w-class="page" ev-detail-back="detailBack" on-tap="close">
    <div w-class="searchBox">
        <div w-class="tableTitle">操作日志</div>
        <div w-class="filterBox">
            <div w-class="filterTitle">
                <span on-tap="open">操作时间</span>      
            </div>
            <div style="margin: 28px 0 28px 25px;" ev-dateBox-change="changeDateBox" ev-period-change="changeDate">
                <widget w-tag="app-components-periodTimePicker">{showDateBox:{{it.showDateBox}},startDate:{{it.startTime}},endDate:{{it.endTime}} }</widget>
            </div>
        </div>
    </div>
    <div w-class="shopSum">共{{it.sum}}条记录</div> 
    <div ev-table-detail="goDetail">
        <div w-class="tableTitle">日志列表</div>
        <widget w-tag="app-components-table">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false,auto:true}</widget>
    </div>
    <div w-class="ctroller">
        <div w-class="searchleft" on-tap="exportShop">导出全部信息</div>
        <div ev-changeCurrent="pageChange" w-class="pagination" ev-perPage="perPage">
            <widget w-tag="app-components-pagination">{pages:{{Math.ceil(it.sum/ it.perPage)}},currentIndex:{{it.currentIndex}},filterShow:true }</widget>
        </div>
    </div>
</div>