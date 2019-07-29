<div w-class="datePicker" >
    <div on-tap="changeDateBox" w-class="dateShow active" >
        <div ev-input-blur="changeStartDate" w-class="inputBox">
            <widget w-tag="app-components-input" >{placeHolder:"开始日期",input:{{it.startDate}},style:"background-color:inherit" }</widget>
        </div>
        <img style="width: 30px" src="../res/images/small_calendar.png" />
        <div ev-input-blur="changeEndDate" w-class="inputBox">
            <widget w-tag="app-components-input" >{ placeHolder:"结束日期",input:{{it.endDate}},style:"background-color:inherit"}</widget>
        </div>
        <img style="width: 30px" src="../res/images/small_calendar.png" />
    </div>
    {{if it.showDateBox}}
    <div w-class="dateBox" style="{{it.position}}">
        <div ev-dateSelect-change="changeStartDate" style="margin-right:1px;">
            <widget w-tag="app-components-dateSelection">{showDate:{{it.startDate}},needTime:{{it.needTime}} }</widget>
        </div>
        <div ev-dateSelect-change="changeEndDate">
            <widget w-tag="app-components-dateSelection">{showDate:{{it.endDate}},needTime:{{it.needTime}} }</widget>
        </div>
    </div>
    {{end}}

</div>