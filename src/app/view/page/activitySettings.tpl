<div w-class="page" ev-detail-back="detailBack" on-tap="close">
    <div w-class="shopSum">共{{it.realSum}}条梯度</div> 
    <div ev-table-detail="goDetail">
        <div w-class="tableTitle">真实中奖概率</div>
        <widget w-tag="app-components-table">{datas: {{it.real}},title:{{it.showTitleList}},needCheckBox:false,auto:true,inlineBtn1:"编辑",inlineBtn2:"删除"}</widget>
    </div>
    <div w-class="ctroller">
        <div w-class="searchleft" on-tap="exportUser">添加梯度</div>
        <div w-class="searchleft" on-tap="addUser">应用该设置</div>
    </div>
    <div w-class="shopSum" style="margin-top:20px;">共{{it.foreignSum}}条梯度</div> 
    <div ev-table-detail="goDetail">
        <div w-class="tableTitle">对外展示中奖概率</div>
        <widget w-tag="app-components-table">{datas: {{it.foreign}},title:{{it.showTitleList}},needCheckBox:false,auto:true,inlineBtn1:"编辑",inlineBtn2:"删除"}</widget>
    </div>
    <div w-class="ctroller">
        <div w-class="searchleft" on-tap="exportUser">添加梯度</div>
        <div w-class="searchleft" on-tap="addUser">应用该设置</div>
    </div>
</div>