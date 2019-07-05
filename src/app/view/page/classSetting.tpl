<div class="new-page" w-class="page" ev-detail-back="detailBack" on-tap="close">
    {{if it.style==0}}
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
    <div w-class="shopSum">共计：{{it.num[0]}}个一级分类 {{it.num[1]}}个二级分类</div>
    <div w-class="searchBoxType">
        <div w-class="tableTitle">商品分类</div>
        <div w-class="searchItem_1">
            <div w-class="tableDataTitle">
                {{for i,v of it.showDataTitle}}
                    <div w-class="data_item">{{v}}</div>
                {{end}}
            </div>
            {{for i,v of it.showDataList}}
            <div w-class="tableItem">
                <div w-class="data_item">{{v.name}}</div>
                <div w-class="data_item_1">
                    {{for index,item of v.children}}
                        <div w-class="col_item">
                            <div>{{item[0]}}</div>
                            <div w-class="imgIcon">
                                {{if item[1].length}}
                                <img style="width:100%;height: 100%;" src="{{it.mallImagPre}}/{{item[1][0]}}" alt=""/>
                                {{end}}
                            </div>
                        </div>
                    {{end}}
                </div>
                <div w-class="data_item">{{v.time}}</div>
                <div w-class="data_item_1">
                    <div w-class="btn" on-tap="changeRow({{i}})">编辑</div>
                </div>
            </div>
            {{end}}
        </div>
    </div>
    {{elseif it.style==1}}
    <div ev-change-showShop="showSupplier">
        <widget w-tag="app-view-page-addClass"></widget>
    </div>
    {{else}}
    <div ev-change-showShop="showSupplier">
            <widget w-tag="app-view-page-addClass"></widget>
        </div>
    {{end}}
</div>