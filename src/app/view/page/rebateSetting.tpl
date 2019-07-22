<div w-class="page" ev-detail-back="detailBack" on-tap="close">
    <div w-class="searchBox">
        <div w-class="tableTitle">海宝收益配置</div>
        <div w-class="filterBox">
            <img src="../../res/images/upHbaoImg.png" w-class="img"/>
            <div>
                {{for i,v of it.haiBaoTitle}}
                <div w-class="row">
                    <div w-class="title">{{v}}</div>
                    <div w-class="input" ev-input-change="haiWangChange(0,{{i}},e)" style="width:160px;margin-left:20px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.haiBao[i]}},disabled:{{it.style[0]}},itype:"integer"}</widget>
                    </div>
                </div>
                {{end}}
                <div w-class="row">
                    <div w-class="edit" on-tap="edit(0)">编辑</div>
                    <div w-class="edit" on-tap="confirm(0)">应用</div>
                </div>
            </div>
        </div>
    </div>

    <div w-class="searchBox">
        <div w-class="tableTitle">海王收益配置</div>
        <div w-class="filterBox">
            <img src="../../res/images/upHwangImg.png" w-class="img"/>
            {{for i,v of it.haiWangTitle}}
            <div w-class="row">
                <div w-class="title">{{v}}</div>
                <div w-class="input" ev-input-change="haiWangChange(1,{{i}},e)">
                    <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.haiWang[i]}},disabled:{{it.style[1]}},itype:"integer"}</widget>
                </div>
            </div>
            {{end}}
            <div w-class="row">
                <div w-class="edit" on-tap="edit(1)">编辑</div>
                <div w-class="edit" on-tap="confirm(1)">应用</div>
            </div>
        </div>
    </div>
   
    <div w-class="searchBox">
        <div w-class="tableTitle">购物收益配置</div>
        <div w-class="filterBox">
            <img src="../../res/images/shoppingImg.png" w-class="img"/>
            {{for i,v of it.shoppingTitle}}
            <div w-class="row">
                <div w-class="title">{{v}}</div>
                <div w-class="input" ev-input-change="haiWangChange(2,{{i}},e)">
                    <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.shopping[i]}},disabled:{{it.style[2]}},itype:"integer"}</widget>
                </div>
            </div>
            {{end}}
            <div w-class="row">
                <div w-class="edit" on-tap="edit(2)">编辑</div>
                <div w-class="edit" on-tap="confirm(2)">应用</div>
            </div>
        </div>
    </div>
</div>