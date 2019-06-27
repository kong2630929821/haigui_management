<div w-class="page" ev-detail-back="detailBack" on-tap="close">
    <div w-class="searchBox">
        <div w-class="tableTitle">筛选查询</div>
        <div w-class="filterBox">
            <div w-class="filterTitle">
                <span>状态</span>
                <div style="display:inline-block;height: 50px;margin-left: 20px;margin-top: 26px" ev-selected="filterTimeType">
                    <widget w-tag="app-components-simpleFilter1">{options:{{it.timeType}},activeIndex:{{it.timeTypeActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
                </div>
            </div>
            <div w-class="filterTitle">
                <span>商品类型</span>
                <div style="display:inline-block;height: 50px;margin-left: 20px;margin-top: 26px" ev-selected="filterProductTypes">
                    <widget w-tag="app-components-simpleFilter1">{options:{{it.productTypes}},activeIndex:{{it.ProductTypesActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
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
            <div w-class="tableDataTitle">
                {{for i,v of it.showDateTitle}}
                    <div w-class="item">{{v}}</div>
                {{end}}
            </div>
            <div w-class="dataBody">
                {{for i,v of it.showDataList}}
                    <div w-class="dataItme">
                        <div w-class="bodyTitle">
                            <div w-class="shopId">{{v.id}}</div>
                            <div w-class="shopName">{{v.name}}</div>
                            <div w-class="shopType">分类：{{v.typeName}}</div>
                        </div>
                        <div w-class="bodyContent">
                            <div w-class="imgShow"></div>
                            <div w-class="typeShow">
                                {{for j,t of v.type}}
                                    <div w-class="row">
                                        {{for index,item of t}}
                                            <div w-class="typeShowItem {{index==0 ||index==1?'typeShowItem1':''}}">{{item}}</div>
                                        {{end}}
                                    </div>
                                {{end}}
                            </div>
                            <div w-class="status">
                                <div w-class="discount">{{v.discount}}</div>
                                <div w-class="discount">{{v.time}}</div>
                                <div w-class="discount">{{v.status}}</div>
                                <div w-class="ctrollerStatus">
                                    <div w-class="btn">下架</div>
                                    <div w-class="btn">详情</div>
                                    <div w-class="btn">删除</div>
                                </div>
                            </div>
                        </div>
                    </div>
                {{end}}
            </div>
        </div>
        <div w-class="ctroller">
            <div w-class="searchleft" on-tap="exportShop">导出全部信息</div>
            <div w-class="onShelves">上架商品</div>
            <div ev-changeCurrent="pageChange" w-class="pagination" ev-perPage="perPage">
                <widget w-tag="app-components-pagination">{pages:{{Math.ceil(it.shopNum/ 12)}},currentIndex:{{it.currentIndex}},filterShow:true }</widget>
            </div>
        </div>
    </div>
</div>