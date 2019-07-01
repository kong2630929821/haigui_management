<div class="new-page" w-class="page" ev-detail-back="detailBack" on-tap="close">
    {{if !it.showAddSupplier}}
    <div w-class="searchBox">
        <div w-class="tableTitle">筛选查询</div>
        <div w-class="searchItem" style="height:92px">
            <div w-class="input" ev-input-change="supplierChange" style="width: 464px;">
                <widget w-tag="app-components-input">{placeHolder:"供应商ID/名称"}</widget>
            </div>
            <div w-class="btn">查询</div>
        </div>
    </div>
    <div w-class="shopSum">共{{it.shopNum}}件商品</div> 
    <div ev-table-detail="goDetail">
        <div w-class="tableTitle">产品列表</div>
        <widget w-tag="app-components-table">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false,auto:true,inlineBtn2:{{it.btn2}},inlineBtn1:{{it.btn1}} }</widget>
    </div>
    <div w-class="ctroller">
        <div w-class="searchleft" on-tap="exportShop">导出全部信息</div>
        <div w-class="onShelves" on-tap="addSupplier">添加供应商</div>
    </div>
    {{else}}
    <div ev-change-showShop="showSupplier">
        <widget w-tag="app-view-page-addSupplier"></widget>
    </div>
    {{end}}
</div>