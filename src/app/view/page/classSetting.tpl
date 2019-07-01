<div class="new-page" w-class="page" ev-detail-back="detailBack" on-tap="close">
    {{if 0==1}}
    <div w-class="searchBox">
        <div w-class="tableTitle">筛选查询</div>
        <div w-class="searchItem" style="height:92px">
            <div w-class="item">
                <div w-class="input" ev-input-change="supplierChange" style="width: 464px;">
                    <widget w-tag="app-components-input">{placeHolder:"供应商ID/名称"}</widget>
                </div>
                <div w-class="btn">查询</div>
            </div>
            <div w-class="ctroller">
                <div w-class="searchleft" on-tap="exportShop">导出全部信息</div>
                <div w-class="onShelves" on-tap="addSupplier">添加供应商</div>
            </div>
        </div>
    </div>
    <div w-class="shopSum">共计：5个一级分类 23个二级分类</div>
    <div w-class="searchBoxType">
        <div w-class="tableTitle">商品分类</div>
        <div w-class="searchItem_1">
            <div w-class="tableDataTitle">
                {{for i,v of it.showDataTitle}}
                    <div w-class="data_item">{{v}}</div>
                {{end}}
            </div>
            {{for index,item of [1,2,3,4]}}
            <div w-class="tableItem">
                <div w-class="data_item">面部护理</div>
                <div w-class="data_item_1">
                    {{for i,v of it.showDataTitle}}
                        <div w-class="col_item">
                            <div>面膜</div>
                            <div w-class="imgIcon"></div>
                        </div>
                    {{end}}
                </div>
                <div w-class="data_item">2018-12-24 12:20:20</div>
                <div w-class="data_item_1">
                    <div w-class="btn">编辑</div>
                </div>
            </div>
            {{end}}
        </div>
    </div>
    {{else}}
    <div ev-change-showShop="showSupplier">
        <widget w-tag="app-view-page-addClass"></widget>
    </div>
    {{end}}
</div>