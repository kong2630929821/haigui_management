<div w-class="page" ev-detail-back="detailBack" on-tap="close" style="height:100%">
    <div w-class="searchBox">
        <div w-class="tableTitle">筛选查询</div>
        <div style="display:flex;align-items: center;margin-top: 20px;">
            <div w-class="title" style="margin-left: 40px;">截止日期：</div>
            <div style="display:inline-block;margin-left: 25px;" ev-dateBox-change="changeDateBox" ev-period-change="changeDate">
                <widget w-tag="app-components-periodTimePicker">{showDateBox:{{it.expandIndex[0]}},startDate:{{it.startTime}},endDate:{{it.endTime}} }</widget>
            </div>
        </div>
    </div>

    <div w-class="shopSum">共{{it.sum}}条记录</div> 
    <div ev-table-detail="goDetail">
        <div w-class="tableTitle">签到记录</div>
        <widget w-tag="app-components-table">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false,auto:true}</widget>
    </div>
    <div w-class="ctroller">
        <div w-class="searchleft" on-tap="exportLog" on-down="onShow">导出全部信息</div>
        <div ev-changeCurrent="pageChange" w-class="pagination" ev-perPage="perPage" ev-expand="expand">
            <widget w-tag="app-components-pagination">{pages:{{Math.ceil(it.sum/ it.perPage)}},filterShow:true,currentIndex:{{it.currentIndex}},expand:{{it.expandIndex[1]}},numberCheckActiveIndex:{{it.perPageIndex}} }</widget>
        </div>
    </div>
</div>