<div w-class="datePicker">
    <div on-tap="changeDateBox" w-class="dateShow {{it.showDateBox?'active':''}}" >
        <img src="../res/images/calendar.png" />
        <div ev-input-blur="changeStartDate">
            <widget w-tag="app-components-input" >{placeHolder:"开始日期",input:{{it.startDate}},style:"background-color:inherit" }</widget>
        </div>
        <div style="line-height:20px;">-</div>
        <div ev-input-blur="changeEndDate" >
            <widget w-tag="app-components-input" >{ placeHolder:"结束日期",input:{{it.endDate}},style:"background-color:inherit"}</widget>
        </div>
    </div>
    {{if it.showDateBox}}
    <div w-class="dateBox" style="{{it.position}}">
        <div ev-dateSelect-change="changeStartDate" style="margin-right:1px;">
            <widget w-tag="app-components-dateSelection">{showDate:{{it.startDate}} }</widget>
        </div>
        <div ev-dateSelect-change="changeEndDate">
            <widget w-tag="app-components-dateSelection">{showDate:{{it.endDate}} }</widget>
        </div>
    </div>
    {{end}}

</div>