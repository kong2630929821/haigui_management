<div w-class="page" ev-detail-back="detailBack" on-tap="close">
    <div w-class="searchBox">
        <div w-class="tableTitle">海宝收益配置</div>
        <div w-class="filterBox">
            <img src="../../res/images/upHbaoImg.png" w-class="img"/>
            <div>
                {{for i,v of it.haiBaoTitle}}
                <div w-class="row">
                    <div w-class="title">{{v}}</div>
                    <div w-class="input" ev-input-change="rebateChange(0,{{i}},e)" style="width:160px;margin-left:20px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.haiBao[i]}},disabled:{{it.style[0]}},itype:{{i==1 || i==2?"number":"integer"}} }</widget>
                    </div>
                </div>
                {{end}}
                <div w-class="row">
                    <div w-class="edit" on-tap="edit(0)" on-down="onShow">编辑</div>
                    <div w-class="edit" on-tap="confirm(0)" on-down="onShow">应用</div>
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
                <div w-class="input" ev-input-change="rebateChange(1,{{i}},e)">
                    <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.haiWang[i]}},disabled:{{it.style[1]}},itype:{{i==1?"number":"integer"}} }</widget>
                </div>
            </div>
            {{end}}
            <div w-class="row">
                <div w-class="edit" on-tap="edit(1)" on-down="onShow">编辑</div>
                <div w-class="edit" on-tap="confirm(1)" on-down="onShow">应用</div>
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
                <div w-class="input" ev-input-change="rebateChange(2,{{i}},e)">
                    <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.shopping[i]}},disabled:{{it.style[2]}},itype:"number"}</widget>
                </div>
            </div>
            {{end}}
            <div w-class="row">
                <div w-class="edit" on-tap="edit(2)" on-down="onShow">编辑</div>
                <div w-class="edit" on-tap="confirm(2)" on-down="onShow">应用</div>
            </div>
        </div>
    </div>
</div>