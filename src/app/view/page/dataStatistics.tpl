<div w-class="page" ev-detail-back="detailBack" on-tap="close">
    {{if it.userInfo}}
        <div w-class="searchBox">
            <div w-class="tableTitle">数据统计</div>
            <div w-class="filterBox">
                <div w-class="tabRow" style="margin:20px 20px;">
                    <div w-class="tabBar {{it.activeTab==0?'activeTab':''}}" on-tap="changeTab(0)">会员统计</div>
                    <div w-class="tabBar {{it.activeTab==1?'activeTab':''}}" on-tap="changeTab(1)">商品统计</div>
                </div>
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
                        <img src="../../res/images/{{it.vipCount[2][i]>=it.vipCount[1][i]?'up.png':'upDown.png'}}" w-class="tabUpImg"/>
                    </div>
                </div>
            </div>
            {{end}}
        </div>
        <div w-class="tableBox">
            <div w-class="table_1">
                <div ev-table-detail="goDetail">
                    <div w-class="tableTitle">邀请排名TOP10</div>
                    <widget w-tag="app-components-table">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false,auto:true,inlineBtn1:"详情"}</widget>
                </div>
            </div>
            <div style="flex:1"></div>
            <div w-class="table_1">
                <div ev-table-detail="goDetail">
                    <div w-class="tableTitle">分享排名TOP10列表</div>
                    <widget w-tag="app-components-table">{datas: {{it.shareDataList}},title:{{it.showTitleList}},needCheckBox:false,auto:true,inlineBtn1:"详情"}</widget>
                </div>
            </div>
        </div>
        {{else}}
            <div>1</div>
        {{end}}
    {{else}}
        <div ev-detail-back="getDatas">
            <widget w-tag="app-view-page-vipDetail">{uid:{{it.uid}} }</widget>
        </div>
    {{end}}
</div>