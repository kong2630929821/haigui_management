<div w-class="datePicker">
    <div on-tap="changeDateBox" w-class="dateShow active" >
        <div ev-input-blur="changeStartDate" w-class="inputBox">
            <widget w-tag="app-components-input" >{placeHolder:"选择日期",input:{{it.startDate}},style:"background-color:inherit" }</widget>
        </div>
        
    </div>
    {{if it.showDateBox}}
    <div w-class="dateBox" style="{{it.position}}">
        <div ev-dateSelect-change="changeStartDate" style="margin-right:1px;">
            <widget w-tag="app-components-dateSelection">{showDate:{{it.startDate}},needTime:true }</widget>
        </div>
    </div>
    {{end}}

</div>