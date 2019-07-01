<div w-class="page" ev-detail-back="detailBack" on-tap="close">
    {{if it.showAddProduct==0}}
    <div w-class="searchBox">
        <div w-class="tableTitle">筛选查询</div>
        <div w-class="filterBox">
            <div w-class="filterTitle">
                <span>产品类型</span>
                <div style="display:inline-block;height: 50px;margin-left: 20px;margin-top: 26px" ev-selected="filterTimeType">
                    <widget w-tag="app-components-simpleFilter1">{options:{{it.timeType}},activeIndex:{{it.timeTypeActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
                </div>
            </div>
            <div w-class="filterTitle">
                <span>修改时间</span>   
            </div>
            <div style="margin: 28px 0 28px 25px;" ev-dateBox-change="changeDateBox" ev-period-change="changeDate">
                    <widget w-tag="app-components-periodTimePicker">{showDateBox:{{it.showDateBox}},startDate:{{it.startTime}},endDate:{{it.endTime}} }</widget>
                </div>
            <div w-class="btnBox">
                <div w-class="input" ev-input-change="inputChange">
                    <widget w-tag="app-components-input">{placeHolder:"sku，产品名，供应商"}</widget>
                </div>
                <div w-class="search" on-tap="search">查询</div>
            </div>
        </div>
    </div>
    <div w-class="shopSum">共{{it.shopNum}}件商品</div> 
    <div ev-table-detail="goDetail">
        <div w-class="tableTitle">产品列表</div>
        <widget w-tag="app-components-table">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false,auto:true,inlineBtn2:{{it.btn2}},inlineBtn1:{{it.btn1}} }</widget>
    </div>
    <div w-class="ctroller">
        <div w-class="searchleft" on-tap="exportShop">导出全部信息</div>
        <div w-class="onShelves" on-tap="addProduct">添加产品</div>
        <div ev-changeCurrent="pageChange" w-class="pagination" ev-perPage="perPage">
            <widget w-tag="app-components-pagination">{pages:{{Math.ceil(it.shopNum/ it.perPage)}},currentIndex:{{it.currentIndex}},filterShow:true }</widget>
        </div>
    </div>
    {{elseif it.showAddProduct==1}}
        <div ev-change-showProduct="showProduct">
            <widget w-tag="app-view-page-addProduct"></widget>
        </div>
    {{else}}
        <div ev-change-showProduct="showProduct">
            <widget w-tag="app-view-page-addProduct">{data:{{it.currentData}},status:{{it.showAddProduct==3?1:2}} }</widget>
        </div>
    {{end}}
</div>