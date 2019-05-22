<div w-class="page" on-tap="close">
    {{if !it.showDetail}}
    <div w-class="tabRow">
        <div w-class="{{it.returnStatus==0?'activeTitle':'title'}}" on-tap="checkType(0)">退货申请{{it.numberOfApplications}}</div>
        <div w-class="{{it.returnStatus==1?'activeTitle':'title'}}" on-tap="checkType(1)">退货中</div>
        <div w-class="{{it.returnStatus==2?'activeTitle':'title'}}" on-tap="checkType(2)">退货完成</div>

    </div>

    <div w-class="searchBox">
        <div w-class="tableTitle">筛选查询</div>
        <div w-class="btnBox">
            <div w-class="input" ev-input-change="inputChange">
                <widget w-tag="app-components-input">{placeHolder:"查询订单编号"}</widget>
            </div>
            <div w-class="search" on-tap="search">查询</div>
            <div style="margin-left: 30px;line-height:96px; ">{{it.typeTitle}}：</div>
            <div style="margin: 28px 0 28px 25px;" ev-dateBox-change="changeDateBox" ev-period-change="changeDate">
                <widget w-tag="app-components-periodTimePicker">{showDateBox:{{it.showDateBox}},startDate:{{it.startTime}},endDate:{{it.endTime}} }</widget>
            </div>
        </div>

    </div>

    <div ev-table-detail="goDetail">
        <div w-class="tableTitle">数据列表</div>
        {{if it.returnStatus==0}}
            <widget w-tag="app-components-table">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false,inlineBtn1:"处理申请",auto:true}</widget>
        {{elseif it.returnStatus==1}}
            <widget w-tag="app-components-table">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false,inlineBtn1:"退货失败",inlineBtn2:"退货成功",color:true,auto:true}</widget>
        {{else}}
            <widget w-tag="app-components-table">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false,auto:true,color:true}</widget>
        {{end}}
    </div>
    
    {{else}}
    <widget w-tag="app-view-page-vipDetail"></widget>
    {{end}}
</div>