<div w-class="page" ev-detail-back="detailBack" on-tap="close">
    {{if it.userInfo}}
        <div w-class="searchBox" style="height:auto">
            <div w-class="tableTitle">数据统计</div>
            <div w-class="filterBox">
                <div w-class="tabRow" style="margin:20px 20px;">
                    <div w-class="tabBar {{it.activeTab==0?'activeTab':''}}" on-tap="changeTab(0)" on-down="onShow">会员统计</div>
                    <div w-class="tabBar {{it.activeTab==1?'activeTab':''}}" on-tap="changeTab(1)" on-down="onShow">商品统计</div>
                </div>
                {{if it.activeTab==1}}
                <div w-class="filterTitle">
                    <span on-tap="open">商品销售排行</span> 
                    <div style="margin: 28px 0 28px 25px;" ev-dateBox-change="changeDateBox" ev-period-change="changeDate">
                        <widget w-tag="app-components-periodTimePicker">{showDateBox:{{it.showDateBox}},startDate:{{it.startTime}},endDate:{{it.endTime}} }</widget>
                    </div>     
                </div> 
                {{end}}
            </div>
        </div>
        {{if it.activeTab==0}}
        <div w-class="filterBox" style="padding-bottom:20px;">
            {{for i,v of it.statisticsList}}
            <div w-class="tab">
                <div>
                    <img src="../../res/images/defultUser.png" w-class="tabImg"/>
                    <div style="margin-top: 10px;">昨日新增</div>
                </div>
                <div>
                    <div w-class="tabTitle">{{v}}</div>
                    <div w-class="amount">{{it.vipCount[0]?it.vipCount[0][i]:''}}</div>
                    <div w-class="up">
                        <div w-class="number">{{it.vipCount[2]?it.vipCount[2][i]:''}}</div>
                        {{if it.vipCount[2][i]!=it.vipCount[1][i]}}
                        <img src="../../res/images/{{it.vipCount[2][i]>it.vipCount[1][i]?'up.png':'upDown.png'}}" w-class="tabUpImg"/>
                        {{end}}
                    </div>
                </div>
            </div>
            {{end}}
        </div>
        <div w-class="tableBox">
            <div w-class="table_1">
                <div ev-table-detail="goDetail">
                    <div w-class="tableTitle">邀请排名TOP10</div>
                    <widget w-tag="app-components-table" style="height: 500px;">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false,auto:true,inlineBtn1:"详情"}</widget>
                </div>
            </div>
            <div style="flex:1"></div>
            <div w-class="table_1">
                <div ev-table-detail="goDetail">
                    <div w-class="tableTitle">分享排名TOP10列表</div>
                    <widget w-tag="app-components-table" style="height: 500px;">{datas: {{it.shareDataList}},title:{{it.showTitleList}},needCheckBox:false,auto:true,inlineBtn1:"详情"}</widget>
                </div>
            </div>
        </div>
        {{else}}
            <div w-class="searchBox1">
                <div w-class="tableTitle">商品数据</div>
                <div w-class="filterShopBox">
                    <div w-class="shopCol" style=" background:rgba(240,240,240,1);">
                        {{for i,v of it.shopTitle}}
                            <div w-class="shopRow">{{v}}</div>
                        {{end}}
                    </div>
                    <div w-class="shopCol2">
                        {{for i,v of it.shopTitleInfo}}
                            <div w-class="shopRow">
                                {{for index,item of v}}
                                    <div w-class="row">
                                        <div>{{item[0]}}</div>
                                        <div w-class="keyValue">{{item[1]}}</div>
                                        {{if item[2]>0}}
                                        <img w-class="tabUpImg" src="../../res/images/{{item[2]==1?'up.png':'upDown.png'}}" alt=""/>
                                        {{end}}
                                    </div>
                                {{end}}
                            </div>
                        {{end}}
                    </div>
                </div>
            </div>
            <div ev-table-detail="goDetail" style="margin-top:40px">
                <div w-class="tableTitle">商品销售周排名TOP10</div>
                <widget w-tag="app-components-table" style="height: 500px;">{datas: {{it.shopList}},title:{{it.showTitleList}},needCheckBox:false,auto:true}</widget>
            </div>
        {{end}}
    {{else}}
        <div ev-detail-back="getDatas">
            <widget w-tag="app-view-page-vipDetail">{uid:{{it.uid}} }</widget>
        </div>
    {{end}}
</div>