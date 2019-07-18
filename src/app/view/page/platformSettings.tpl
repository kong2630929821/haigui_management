<div w-class="page" ev-detail-back="detailBack" on-tap="close">
    {{if it.showAddSupplier==0}}
    <div w-class="searchBox">
        <div w-class="tableTitle">筛选查询</div>
        <div w-class="searchItem" style="height:92px">
            <div w-class="input" ev-input-change="inputChange" style="width: 464px;">
                <widget w-tag="app-components-input">{placeHolder:"供应商ID",input:{{it.searchValue}}}</widget>
            </div>
            <div w-class="btn" on-tap="search">查询</div>
        </div>
    </div>
    <div w-class="shopSum">共{{it.shopNum}}个供应商</div> 
    <div ev-table-detail="goDetail">
        <div w-class="tableTitle">供应商列表</div>
        <widget w-tag="app-components-tableImg">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false,auto:true,inlineBtn2:{{it.btn2}},inlineBtn1:{{it.btn1}} }</widget>
    </div>
    <div w-class="ctroller">
        <div w-class="searchleft" on-tap="exportShop">导出全部信息</div>
        <div w-class="onShelves" on-tap="addSupplier">添加供应商</div>
    </div>
    {{elseif it.showAddSupplier==1}}
    <div ev-change-showShop="showSupplier" ev-save-change="saveChange">
        <widget w-tag="app-view-page-addSupplier">{style:false}</widget>
    </div>
    {{else}}
    <div ev-change-showShop="showSupplier" ev-save-change="saveChange">
        <widget w-tag="app-view-page-addSupplier">{currentData:{{it.currentValue}},style:{{it.showAddSupplier}} }</widget>
    </div>
    {{end}}
</div>