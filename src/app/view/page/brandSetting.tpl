<div w-class="page" ev-detail-back="detailBack" on-tap="close" style="height:100%;">
        <div w-class="searchBox">
            <div w-class="tableTitle">筛选查询</div>
            <div w-class="filterBox">
                <div w-class="btnBox">
                    <div w-class="input" ev-input-change="inputChange">
                        <widget w-tag="app-components-input">{placeHolder:"品牌ID"}</widget>
                    </div>
                    <div w-class="search" on-tap="search" on-down="onShow">查询</div>
                </div>
            </div>
        </div>
        <div w-class="shopSum">共{{it.shopNum}}件品牌</div> 
        <div ev-table-detail="goDetail">
            <div w-class="tableTitle">品牌列表</div>
            <widget w-tag="app-components-tableImg">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false,auto:true,inlineBtn2:"删除",inlineBtn1:"编辑",img:true}</widget>
        </div>
        <div w-class="ctroller">
            <div w-class="searchleft" on-tap="exportShop" on-down="onShow">导出全部信息</div>
            <div w-class="onShelves" on-tap="addBrand" on-down="onShow">添加品牌</div>
            <div ev-changeCurrent="pageChange" w-class="pagination" ev-perPage="perPage" ev-expand="expand">
                <widget w-tag="app-components-pagination">{pages:{{Math.ceil(it.shopNum/ it.perPage)}},filterShow:true,currentIndex:{{it.currentIndex}},expand:{{it.expandIndex}},numberCheckActiveIndex:{{it.perPageIndex}} }</widget>
            </div>
        </div>
    </div>