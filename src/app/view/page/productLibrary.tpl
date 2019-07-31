<div w-class="page" ev-detail-back="detailBack" on-tap="close" style="height:100%;">
    {{if it.showAddProduct==0}}
    <div w-class="searchBox">
        <div w-class="tableTitle">筛选查询</div>
        <div w-class="filterBox">
            <div w-class="filterTitle">
                <span>修改时间</span>   
            </div>
            <div style="margin: 28px 0 28px 25px;" ev-dateBox-change="changeDateBox" ev-period-change="changeDate">
                    <widget w-tag="app-components-periodTimePicker">{showDateBox:{{it.showDateBox}},startDate:{{it.startTime}},endDate:{{it.endTime}} }</widget>
                </div>
            <div w-class="btnBox">
                <div w-class="input" ev-input-change="inputChange">
                    <widget w-tag="app-components-input">{placeHolder:"供应商ID，SKU，sku名",input:{{it.inputValue}}}</widget>
                </div>
                <div w-class="search" on-tap="search" on-down="onShow">查询</div>
            </div>
        </div>
    </div>
    <div w-class="shopSum">共{{it.shopNum}}个SKU</div> 
    <div ev-table-detail="goDetail">
        <div w-class="tableTitle">SKU列表</div>
        <widget w-tag="app-components-table">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false,auto:true,inlineBtn2:{{it.btn2}},inlineBtn1:{{it.btn1}} }</widget>
    </div>
    <div w-class="ctroller">
        <div w-class="searchleft" on-tap="exportShop" on-down="onShow">导出全部信息</div>
        <div w-class="onShelves" on-tap="addProduct" on-down="onShow">添加SKU</div>
        <div ev-changeCurrent="pageChange" w-class="pagination" ev-perPage="perPage" ev-expand="expand">
            <widget w-tag="app-components-pagination">{pages:{{Math.ceil(it.shopNum/ it.perPage)}},filterShow:true, currentIndex:{{it.currentIndex}},expand:{{it.expandIndex}},numberCheckActiveIndex:{{it.perPageIndex}} }</widget>
        </div>
    </div>
    {{elseif it.showAddProduct==1}}
        <div ev-change-showProduct="showProduct" ev-change-save="saveProduct" style="height:100%;">
            <widget w-tag="app-view-page-addProduct">{status:3}</widget>
        </div>
    {{else}}
        <div ev-change-showProduct="showProduct" ev-change-save="saveProduct" style="height:100%;">
            <widget w-tag="app-view-page-addProduct">{data:{{it.currentData}},status:{{it.showAddProduct==3?1:2}} }</widget>
        </div>
    {{end}}
</div>