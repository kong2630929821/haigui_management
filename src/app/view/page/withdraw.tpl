<div w-class="page" on-tap="pageClick">
    <div w-class="tabRow">
        <div w-class="tab">
            <img src="../../res/images/defultUser.png" w-class="tabImg"/>
            <div>
                <div w-class="tabTitle">今日申请人数</div>
                <div w-class="amount">{{it.userNum}}</div>
            </div>
        </div>
        <div w-class="tab">
            <img src="../../res/images/money.png" w-class="tabImg"/>
            <div>
                <div w-class="tabTitle">今天提现</div>
                <div w-class="amount">{{it.dayMoney}}</div>
            </div>
        </div>
        <div w-class="tab">
            <img src="../../res/images/money.png" w-class="tabImg"/>
            <div>
                <div w-class="tabTitle">本月提现</div>
                <div w-class="amount">{{it.monthTotal}}</div>
            </div>
        </div>
    </div>

    <div w-class="tabRow" style="margin:20px 0 10px;">
        <div w-class="tabBar {{it.activeTab==0?'activeTab':''}}" on-tap="changeTab(0)">提现申请</div>
        <div w-class="tabBar {{it.activeTab==1?'activeTab':''}}" on-tap="changeTab(1)">处理中</div>
        <div w-class="tabBar {{it.activeTab==2?'activeTab':''}}" on-tap="changeTab(2)">处理完成</div>
    </div>

    <div w-class="searchBox">
        <div w-class="tableTitle">筛选查询</div>
        <div w-class="input" ev-input-change="uidChange">
            <widget w-tag="app-components-input">{placeHolder:"用户ID"}</widget>
        </div>
        <div w-class="search" on-tap="search">查询</div>
        
        <div style="display:inline-block" ev-dateBox-change="changeDateBox" ev-period-change="changeDate">
            <widget w-tag="app-components-periodTimePicker">{showDateBox:{{it.showDateBox}},startDate:{{it.startTime}},endDate:{{it.endTime}} }</widget>
        </div>
        {{if it.activeTab==2}}
        <div style="display:inline-block;height: 50px;margin-left: 40px;" ev-selected="filterTimeType">
            <widget w-tag="app-components-simpleFilter1">{options:{{it.timeType}},activeIndex:{{it.timeTypeActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
        </div>
        {{end}}
    </div>

    {{if it.showDataList}}
    <div ev-table-detail="dealWith" ev-table-btnClick="exportData" ev-table-redetail="redealWith">
        <div w-class="tableTitle">数据列表</div>
        <widget w-tag="app-components-tableDeal">{datas: {{it.curShowDataList}},title:{{it.showTitleList}},inlineBtn2:{{it.btn2}},inlineBtn1:{{it.btn1}},btn1:"导出列表"}</widget>
    </div>
    {{end}}
    {{if Math.ceil(it.showDataList.length/it.perPage)}}
    <div ev-changeCurrent="changePage" w-class="pagination-box" ev-perPage="perPage"> 
        <widget w-tag="app-components-pagination">{pages:{{Math.ceil(it.showDataList.length/it.perPage)}},filterShow:true }</widget>
    </div>
    {{end}}
</div>