<div w-class="page" ev-detail-back="detailBack" on-tap="close">
        {{if it.brandShow==0}}
        <div w-class="searchBox">
            <div w-class="tableTitle">筛选查询</div>
            <div w-class="filterBox">
                <div w-class="btnBox">
                    <div w-class="input" ev-input-change="inputChange">
                        <widget w-tag="app-components-input">{placeHolder:"品牌/名称"}</widget>
                    </div>
                    <div w-class="search" on-tap="search">查询</div>
                </div>
            </div>
        </div>
        <div w-class="shopSum">共{{it.shopNum}}件品牌</div> 
        <div ev-table-detail="goDetail">
            <div w-class="tableTitle">品牌列表</div>
            <widget w-tag="app-components-table">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false,auto:true,inlineBtn2:"编辑",inlineBtn1:"删除" }</widget>
        </div>
        <div w-class="ctroller">
            <div w-class="searchleft" on-tap="exportShop">导出全部信息</div>
            <div w-class="onShelves" on-tap="addBrand">添加品牌</div>
        </div>
        {{elseif it.brandShow==1}}
            <div ev-change-showProduct="showProduct">
                <widget w-tag="app-view-page-addBrand"></widget>
            </div>
        {{else}}
            <div ev-change-showProduct="showProduct">
                <widget w-tag="app-view-page-addBrand"></widget>
            </div>
        {{end}}
    </div>