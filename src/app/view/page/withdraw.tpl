<div w-class="page" on-tap="pageClick" style="height:100%">
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
        <div w-class="tabBar {{it.activeTab==0?'activeTab':''}}" on-tap="changeTab(0)" on-down="onShow">提现申请</div>
        <div w-class="tabBar {{it.activeTab==1?'activeTab':''}}" on-tap="changeTab(1)" on-down="onShow">处理中</div>
        <div w-class="tabBar {{it.activeTab==2?'activeTab':''}}" on-tap="changeTab(2)" on-down="onShow">处理完成</div>
    </div>

    <div w-class="searchBox">
        <div w-class="tableTitle">筛选查询</div>
        <div style="display:flex;align-items: center;">
            <div w-class="input" ev-input-change="uidChange">
                <widget w-tag="app-components-input">{placeHolder:"用户ID"}</widget>
            </div>
            <div w-class="search" on-tap="search" on-down="onShow">查询</div>
            
            <div style="display:inline-block;margin-left: 25px;" ev-dateBox-change="changeDateBox" ev-period-change="changeDate">
                <widget w-tag="app-components-periodTimePicker">{showDateBox:{{it.showDateBox}},startDate:{{it.startTime}},endDate:{{it.endTime}} }</widget>
            </div>
            {{if it.activeTab==2}}
            <div style="display:inline-block;height: 50px;margin-left: 40px;" ev-selected="filterTimeType" ev-expand="expand(e,0)">
                <widget w-tag="app-components-simpleFilter1">{options:{{it.timeType}},activeIndex:{{it.timeTypeActiveIndex}},expand:{{it.expandIndex[0]}} }</widget>
            </div>
            {{end}}
        </div>
    </div>

    {{if it.showDataList}}
    <div ev-table-detail="dealWith" ev-table-btnClick="exportData" ev-table-redetail="redealWith">
        <div w-class="tableTitle">数据列表</div>
        <widget w-tag="app-components-tableDeal">{datas: {{it.curShowDataList}},title:{{it.showTitleList}},inlineBtn2:{{it.btn2}},inlineBtn1:{{it.btn1}},btn1:"导出列表"}</widget>
    </div>
    {{end}}
    {{if Math.ceil(it.showDataList.length/it.perPage)}}
    <div ev-changeCurrent="changePage" w-class="pagination-box" ev-perPage="perPage" ev-expand="expand(e,1)"> 
        <widget w-tag="app-components-pagination">{pages:{{Math.ceil(it.showDataList.length/it.perPage)}},filterShow:true, currentIndex:{{it.curPage}},expand:{{it.expandIndex[1]}},numberCheckActiveIndex:{{it.perPageIndex}} }</widget>
    </div>
    {{end}}
</div>