<div w-class="page">
    {{if it.selGoodsIndex === -1}}
    <div w-class="back" on-tap="goBack">返回</div>
    {{%===========================聚合专区设置===========================}}
    <div w-class="bannerBox">
        <div w-class="tableTitle">聚合页专区设置</div>
        <div w-class="itemContent">
            {{:imgs = it.currentData.imgs||[]}}
            <div w-class="guessTab">
                <span style="margin-right:10px;">专区封面图</span>
                <div w-class="tab inputBox" ev-input-file="imgUpload(e,0)">
                    <widget w-tag="app-components-inputImg">{src:{{imgs[0] ? imgs[0][0]:""}} }</widget>
                </div>
            </div>
            <div w-class="guessTab">
                <span style="margin-right:10px;">专区头图</span>
                <div w-class="tab inputBox" ev-input-file="imgUpload(e,1)">
                    <widget w-tag="app-components-inputImg">{src:{{imgs[1] ? imgs[1][0]:""}} }</widget>
                </div>
            </div>
            <div w-class="guessTab" style="flex:1 0 0;" ev-input-change="firstNameChange">
                <span style="margin-right:10px;">专区名称</span>
                <widget w-tag="app-components-input">{placeHolder:"输入名称",input:{{it.currentData.name}},style:"border:1px solid #eee;"}</widget>
            </div>
            <div w-class="guessTab" style="flex:1 0 0;" ev-selected="selLocation">
                <span style="margin-right:10px;">展示位置</span>
                <widget w-tag="app-components-simpleFilter1">{options:{{it.locations}},activeIndex:{{it.activeLoc}} }</widget>
            </div>
        </div>
    </div>

    {{%===========================专区分类===========================}}
    <div w-class="bannerBox" style="min-height:300px;">
        <div w-class="tableTitle">
            <div>专区分类</div>
            <div w-class="btn" on-tap="addBtn">{{it.isSoloPart?"选择商品":"添加"}}</div>
        </div>
        <div w-class="itemContent">
            {{if it.currentData.groupType && !it.isSoloPart}}
                {{for i,v of it.currentData.children}}
                <div w-class="guessTab" style="margin-right:50px;"  ev-input-change="secondNameChange(e,{{i}})">
                    <span style="margin-right:10px;">分类</span>
                    <widget w-tag="app-components-input">{placeHolder:"输入名称",input:{{v.name}},style:"border:1px solid #eee;"}</widget>
                    <div w-class="btn1" on-tap="delSecondClass({{i}})">删除</div>
                    <div w-class="btn1" on-tap="chooseGoods({{i}})">选择商品</div>
                    <div w-class="btn1" on-tap="saveSecondClass({{i}})">保存</div>
                </div>
                {{end}}
            {{end}}

            {{if it.addClass}}
            <div w-class="guessTab" ev-input-change="secondNameChange(e,-1)">
                <span style="margin-right:10px;">新分类</span>
                <widget w-tag="app-components-input">{placeHolder:"输入名称",input:{{it.secondName}},style:"border:1px solid #eee;"}</widget>
                <div w-class="btn1" on-tap="delBtn">删除</div>
                <div w-class="btn1" on-tap="addSecondClass">保存</div>
            </div>
            {{end}}
        </div>
    </div>
    <div w-class="btns">
        {{if it.currentData.name}}
        <div w-class="btn" on-tap="delClass" style="margin-right:30px;">删除</div>
        {{end}}
        <div w-class="btn" on-tap="addClass">保存</div>
    </div>

    {{else}}
    <div ev-confirm="selectGoods" ev-goodsInfo-back="cancelSel">
        <widget w-tag="app-view-page-goodsInfo">{goodsId:{{it.goodsId}}}</widget>
    </div>
    {{end}}
</div>