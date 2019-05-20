<div w-class="page" ev-detail-back="detailBack">
    {{if !it.showDetail}}
    <div w-class="tabRow">
        <div w-class="search" on-tap="search">所有商品</div>
    </div>

    <div w-class="searchBox">
        <div w-class="tableTitle">筛选查询</div>
        <div w-class="input" ev-input-change="inputChange">
            <widget w-tag="app-components-input">{placeHolder:"查询商品ID"}</widget>
        </div>
        <div w-class="search" on-tap="search">查询</div>
    </div>

    <div ev-table-detail="goDetail">
        <div w-class="tableTitle">商品列表</div>
        <widget w-tag="app-components-table">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false}</widget>
    </div>
    
    {{else}}
    <widget w-tag="app-view-page-vipDetail"></widget>
    {{end}}
    {{% ==================================分页=====================}}
        {{if it.showDataList.length>0}}
            <div ev-next="next" ev-prep="prep">
                <widget w-tag="app-components-pagination">{pages:{{Math.floor(it.showDataList.length / 3) + 1}},currentIndex:{{it.currentIndex}} }</widget>
            </div>
        {{end}}
</div>