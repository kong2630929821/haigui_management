<div w-class="datePicker" >
    <div on-tap="changeDateBox" w-class="dateShow {{it.showDateBox?'active':''}}" >
        <div ev-input-blur="changeStartDate" w-class="inputBox">
            <widget w-tag="app-components-input" >{placeHolder:"开始日期",input:{{it.startDate}},style:"background-color:inherit" }</widget>
        </div>
        <img style="width: 30px" src="../res/images/calendar.png" />
        <div ev-input-blur="changeEndDate" style="margin-left:30px" w-class="inputBox">
            <widget w-tag="app-components-input" >{ placeHolder:"结束日期",input:{{it.endDate}},style:"background-color:inherit"}</widget>
        </div>
        <img style="width: 30px" src="../res/images/calendar.png" />
    </div>
    {{if it.showDateBox}}
    <div w-class="dateBox" style="{{it.position}}">
        <div ev-dateSelect-change="changeStartDate" style="margin-right:1px;">
            <widget w-tag="app-components-dateSelection">{showDate:{{it.startDate}},needTime:true }</widget>
        </div>
        <div ev-dateSelect-change="changeEndDate">
            <widget w-tag="app-components-dateSelection">{showDate:{{it.endDate}},needTime:true }</widget>
        </div>
    </div>
    {{end}}

</div>