<div w-class="dateBox">
    <div w-class="dateBox_header">
        <img src="../res/images/ArrowLeft.png" w-class="headerImg" on-tap="changeYear(e,0)"/>
        <img src="../res/images/ArrowLeft.png" w-class="headerImg" on-tap="changeMonth(e,0)"/>
        <div style="flex: 1 0 0;text-align: center;">
            <span>{{it.year}}&nbsp;年&nbsp;{{it.month}}&nbsp;月</span>
        </div>
        <img src="../res/images/right.png" w-class="headerImg" on-tap="changeMonth(e,1)"/>
        <img src="../res/images/right.png" w-class="headerImg" on-tap="changeYear(e,1)"/>
    </div>

    <div w-class="dateBox_Content">
        <div w-class="content_row">
            {{for i,v of it.dateHead}}
            <div w-class="rowItem">{{v}}</div>
            {{end}}
        </div>
        {{for i,v of it.dateList}}
        <div w-class="content_row">
            {{for j,r of v}}
            {{let fg = r[1]==it.curDate[1] && r[2]==it.curDate[2]}}
            <div w-class="rowItem {{r[1]==it.month?'curMonth':''}}" style="background:{{fg?'rgb(27,141,238)':''}}" on-tap="changeDate(e,{{i}},{{j}})">{{ Number(r[2]) }}</div>
            {{end}}
        </div>
        {{end}}
    </div>
    {{if it.needTime}}
    <div w-class="bottom">
        <div w-class="time">{{it.curTime[0]}}</div>
        <div w-class="bottomBtn">
            <img src="../res/images/top.png" w-class="btn" on-tap="changeHour(e,1)"/>
            <img src="../res/images/down.png" w-class="btn1" on-tap="changeHour(e,0)"/>
        </div>
        <span style="margin-left:5px;">:</span>
        <div w-class="time">{{it.curTime[1]}}</div>
        <div w-class="bottomBtn">
            <img src="../res/images/top.png" w-class="btn" on-tap="changeMinute(e,1)"/>
            <img src="../res/images/down.png" w-class="btn1" on-tap="changeMinute(e,0)"/>
        </div>
        <span style="margin-left:5px;">:</span>
        <div w-class="time">{{it.curTime[2]}}</div>
        <div w-class="bottomBtn">
            <img src="../res/images/top.png" w-class="btn" on-tap="changeSecond(e,1)"/>
            <img src="../res/images/down.png" w-class="btn1" on-tap="changeSecond(e,0)"/>
        </div>
    </div>
    {{end}}
    
</div>