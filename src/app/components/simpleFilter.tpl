<div w-class="filter" >
    <div on-tap="change" w-class="show">
        <span w-class="showTesxt">{{it.options[it.active]}}</span>
        <img src="../res/images/arrowDown.png" w-class="arrow"/>
    </div>

    {{if it.expand}}
    <div w-class="optionList">
        {{for i,v of it.options}}
            <div on-tap="select(e,{{i}})" w-class="option {{i==it.active?'active':''}}" class="selectBox_option">
                <label>{{v}}</label>
            </div>
        {{end}}
    </div>
    {{end}}
</div>