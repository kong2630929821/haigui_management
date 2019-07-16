<div w-class="page" ev-detail-back="detailBack" on-tap="close" style="padding:0;">
    <div style="display: flex">
        <div w-class="back" on-tap="goBack">返回</div>    
        <div style="flex:1 0 0;display:flex;align-items: center;min-height: 50px;background: #fff;margin-left: 20px;padding: 0 10px;">
            <div style="font-weight: 600;flex-shrink: 0;">已选择的商品ID:</div>
            <div style="margin:0 10px;">{{it.goodsId.join(", ")}}</div>
            <div w-class="btn" style="margin:0;width: 60px;flex-shrink: 0;" on-tap="confirmGoods">确认</div>
        </div>
    </div>

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
                            <div w-class="shopName">商品类型：{{v.shopType}}</div>
                            <div w-class="shopName">品牌：{{v.brand}}</div>
                            <div w-class="shopName">分类：
                                {{for j,t of v.typeName}}
                                    {{t[1]}}-{{t[3]}}
                                {{end}}
                            </div>
                            <div w-class="shopName">税费：{{v.tax}}</div>
                            <div w-class="shopName">是否有折扣：{{v.discount}}</div>
                            {{if v.state==0}}
                            <div w-class="shopType" style="color:red">已下架</div>
                            {{elseif v.state==1}}
                            <div w-class="shopType" style="color:#21811C;">已上架</div>
                            {{else}}
                            {{end}}
                        </div>
                        <div w-class="bodyContent">
                            <div w-class="imgShow">
                                <img style="width: 100%;height: 100%;" src="{{it.mallImagPre}}{{v.img[0]?v.img[0][0]:''}}" alt=""/>
                            </div>
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
                                <div w-class="ctrollerStatus">
                                    {{:fg = it.goodsId.findIndex(t=> t == v.id)>-1}}
                                    <div w-class="btn" style="background:{{fg ? '#ce2525':'#1991eb'}}" on-tap="selectGoods({{v.id}})">{{fg?"取消":"选择"}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                {{end}}
            </div>
        </div>
    </div>
    <div style="position:relative;">
        <div ev-changeCurrent="pageChange" ev-perPage="perPage" w-class="pagination">
            <widget w-tag="app-components-pagination">{pages:{{Math.ceil(it.shopNum/ it.perPage)}},currentIndex:{{it.currentIndex}},filterShow:true }</widget>
        </div>
    </div>
    
</div>