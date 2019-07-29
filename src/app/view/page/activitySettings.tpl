<div w-class="page" ev-detail-back="detailBack" on-tap="close">
    <div w-class="shopSum">共{{it.realSum}}条梯度</div> 
    <div ev-table-detail="goDetail">
        <div w-class="tableTitle">真实中奖权重</div>
        <widget w-tag="app-components-table">{datas: {{it.real}},title:{{it.showTitleList}},needCheckBox:false,auto:true,inlineBtn1:"编辑",inlineBtn2:"删除"}</widget>
    </div>
    <div w-class="ctroller">
        <div w-class="searchleft" on-tap="addGradientIn" on-down="onShow">添加梯度</div>
        <div w-class="searchleft" on-tap="application({{1}})" on-down="onShow">应用该设置</div>
    </div>
    <div w-class="shopSum" style="margin-top:20px;">共{{it.foreignSum}}条梯度</div> 
    <div ev-table-detail="goDetailOut">
        <div w-class="tableTitle">对外展示中奖权重</div>
        <widget w-tag="app-components-table">{datas: {{it.foreign}},title:{{it.showTitleList}},needCheckBox:false,auto:true,inlineBtn1:"编辑",inlineBtn2:"删除"}</widget>
    </div>
    <div w-class="ctroller">
        <div w-class="searchleft" on-tap="addGradientOut" on-down="onShow">添加梯度</div>
        <div w-class="searchleft" on-tap="application({{2}})" on-down="onShow">应用该设置</div>
    </div>
</div>