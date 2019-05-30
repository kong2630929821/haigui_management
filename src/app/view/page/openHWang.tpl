<div w-class="page" on-tap="pageClick">
    <div w-class="tabRow">
        <div w-class="tab">
            <img src="../../res/images/defultUser.png" w-class="tabImg"/>
            <div>
                <div w-class="tabTitle">今日申请人数</div>
                <div w-class="amount">{{it.dayCount}}</div>
            </div>
        </div>
        <div w-class="tab">
            <img src="../../res/images/defultUser.png" w-class="tabImg"/>
            <div>
                <div w-class="tabTitle">本月开通人数</div>
                <div w-class="amount">{{it.monCount}}</div>
            </div>
        </div>
        <div w-class="tab">
            <img src="../../res/images/defultUser.png" w-class="tabImg"/>
            <div>
                <div w-class="tabTitle">海王总数</div>
                <div w-class="amount">{{it.allCount}}</div>
            </div>
        </div>
    </div>

    <div w-class="tabRow" style="margin:20px 0 10px;">
        <div w-class="tabBar {{it.activeTab==0?'activeTab':''}}" on-tap="changeTab(0)">开通申请</div>
        <div w-class="tabBar {{it.activeTab==1?'activeTab':''}}" on-tap="changeTab(1)">处理中</div>
        <div w-class="tabBar {{it.activeTab==2?'activeTab':''}}" on-tap="changeTab(2)">处理完成</div>
    </div>

    <div w-class="searchBox">
        <div w-class="tableTitle">筛选查询</div>
        <div w-class="input" ev-input-change="phoneChange">
            <widget w-tag="app-components-input">{placeHolder:"手机号"}</widget>
        </div>
        <div w-class="search" on-tap="search">查询</div>

        <div style="display:inline-block" ev-dateBox-change="changeDateBox" ev-period-change="changeDate">
            <widget w-tag="app-components-periodTimePicker">{showDateBox:{{it.showDateBox}},startDate:{{it.startTime}},endDate:{{it.endTime}} }</widget>
        </div>
    </div>

    {{if it.showDataList}}
    <div ev-table-detail="dealWith" ev-table-btnClick="exportData">
        <div w-class="tableTitle">数据列表</div>
        <widget w-tag="app-components-tableDeal">{datas: {{it.curShowDataList}},title:{{it.showTitleList}},inlineBtn2:{{it.btn2}},inlineBtn1:{{it.btn1}},btn1:"导出列表" }</widget>
    </div>
    {{end}}
    
    <div ev-changeCurrent="changePage">
        <widget w-tag="app-components-pagination">{pages:{{Math.ceil(it.showDataList.length/4)}} }</widget>
    </div>
</div>