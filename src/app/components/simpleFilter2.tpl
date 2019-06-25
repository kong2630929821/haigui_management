<div w-class="filter" >
        {{if it.expand}}
        <div w-class="optionList">
            {{for i,v of it.options}}
                <div on-tap="select(e,{{i}},{{v.status}})" w-class="option {{i == it.activeIndex ? 'active':''}}" class="selectBox_option">
                    <label>{{v.text}}</label>
                </div>
            {{end}}
        </div>
        {{end}}
        <div on-tap="change" w-class="show">
            <span w-class="showTesxt">{{it.options[it.activeIndex].text}}</span>
            <img src="../res/images/arrowDown.png" w-class="arrow"/>
        </div>
    </div>