<div w-class="filter" >
    <div on-tap="change" w-class="show {{it.search?'searchList':''}}">
        <span w-class="showTesxt {{it.search?'showTest2':''}}">{{it.options[it.active]}}</span>
        <img src="../res/images/arrowDown.png" w-class="arrow"/>
    </div>

    {{if it.expand}}
    <div w-class="optionList {{it.search?'searchList':''}}">
        {{if it.search}}
            <div w-class="input" ev-input-change="inputChange" style="width: 270px;margin:20px;" on-tap="inputBtn">
                <widget w-tag="app-components-input">{placeHolder:"请输入关键字匹配" }</widget>
            </div>
        {{end}}
        {{for i,v of it.options}}
            <div on-tap="select(e,{{i}})" w-class="option {{i==it.active?'active':''}}" class="selectBox_option">
                <label>{{v}}</label>
            </div>
        {{end}}
    </div>
    {{end}}
</div>