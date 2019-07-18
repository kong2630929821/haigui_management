<div w-class="page" ev-detail-back="detailBack" on-tap="close">
    {{if it.shopDetail==0}}
    <div w-class="searchBox">
            <div w-class="tableTitle">筛选查询</div>
            <div w-class="filterBox">
                <div w-class="filterTitle">
                    <span>状态</span>
                    <div style="display:inline-block;height: 50px;margin-left: 20px;margin-top: 26px" ev-selected="filterTimeType">
                        <widget w-tag="app-components-simpleFilter1">{options:{{it.statusType}},activeIndex:{{it.statusTypeActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
                    </div>
                </div>
                <div w-class="filterTitle">
                    <span>上架时间</span>      
                </div>
                <div style="margin: 28px 0 28px 25px;" ev-dateBox-change="changeDateBox" ev-period-change="changeDate">
                    <widget w-tag="app-components-periodTimePicker">{showDateBox:{{it.showDateBox}},startDate:{{it.startTime}},endDate:{{it.endTime}} }</widget>
                </div>
                <div w-class="btnBox">
                    <div w-class="input" ev-input-change="inputChange">
                        <widget w-tag="app-components-input">{placeHolder:"查询商品ID"}</widget>
                    </div>
                    <div w-class="search" on-tap="search">查询</div>
                </div>
            </div>
        </div>
        <div w-class="shopSum">共{{it.shopNum}}件商品</div> 
        <div>
            <div w-class="tableTitle">商品列表</div>
            <div w-class="tableData">
                <div w-class="title">
                    {{for i,v of it.showDateTitle}}
                    <div w-class="titleItem">{{v}}</div>
                    {{end}}
                </div>
                <div w-class="dataBody">
                    {{for i,v of it.showDataList}}
                        <div ev-shelf="shelfGoods" ev-change="change({{i}},e)" ev-detail="lookInfo({{i}},e)">
                            <widget w-tag="app-components-goodsItem">{datas:{{v}}, inFlag:1 }</widget>
                        </div>
                    {{end}}
                </div>
            </div>
            <div w-class="ctroller">
                <div w-class="searchleft" on-tap="exportShop">导出全部信息</div>
                <div w-class="onShelves" on-tap="onShelves">添加商品</div>
                <div ev-changeCurrent="pageChange" w-class="pagination" ev-perPage="perPage">
                    <widget w-tag="app-components-pagination">{pages:{{Math.ceil(it.shopNum/ it.perPage)}},filterShow:true }</widget>
                </div>
            </div>
        </div>
    {{elseif it.shopDetail==1}}
        <div ev-change-cancel="lookCancel">
            <widget w-tag="app-view-page-onShelvesImg">{dataList:{{it.currentData}},disable:true}</widget>
        </div>
    {{elseif it.shopDetail==2}}
        <div ev-change-showShop="showShop"  ev-change-cancel="lookCancel">
            <widget w-tag="app-view-page-onShelves"></widget>
        </div>
    {{elseif it.shopDetail==3}}
    <div w-class="page1">
        <div ev-change-showShop="showShop"  ev-change-cancel="lookCancel">
            <widget w-tag="app-view-page-onShelvesImg">{dataList:{{it.currentData}},style:false}</widget>
        </div>
    </div>
    {{end}}
</div>