<div w-class="datePicker">
    <div w-class="dateShow {{it.showDateBox?'active':''}}">
        <div on-tap="changeDateBox" style="display:flex;align-items:center;">
            <img src="../res/images/calendar.png" />
            <div ev-input-blur="changeShowDate">
                <widget w-tag="app-components-input" >{placeHolder:"选择日期",input:{{it.showDate}},style:"background-color:inherit" }</widget>
            </div>
        </div>
    </div>

    {{if it.showDateBox}}
        {{if it.showTimeBox}}
        <div w-class="timeBox">
            <div w-class="timeList">
                {{for i,v of it.hourList}}
                <div w-class="timeItem {{i==it.hour?'activeItme':''}}" on-tap="changeHour(e,{{i}})">{{v}}</div>
                {{end}}
            </div>
            <div w-class="timeList">
                {{for i,v of it.minuteList}}
                <div w-class="timeItem {{i==it.minute?'activeItme':''}}" on-tap="changeMinute(e,{{i}})">{{v}}</div>
                {{end}}
            </div>
        </div>
        {{else}}
        <div w-class="dateBox" style="{{it.position}}">
            <div ev-dateSelect-change="changeShowDate" style="margin-right:1px;">
                <widget w-tag="app-components-dateSelection">{showDate:{{it.showDate}} }</widget>
            </div>
            <div w-class="btn" on-tap="changeTimeBox">修改时分</div>
        </div>
        {{end}}
    {{end}}

    

</div>