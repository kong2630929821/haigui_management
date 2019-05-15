<div w-class="page">
    <div w-class="tabRow">
        <div w-class="tab">
            <img src="../../res/images/defultUser.png" w-class="tabImg"/>
            <div>
                <div w-class="tabTitle">今日申请人数</div>
                <div w-class="amount">7</div>
            </div>
        </div>
        <div w-class="tab">
            <img src="../../res/images/money.png" w-class="tabImg"/>
            <div>
                <div w-class="tabTitle">今天提现</div>
                <div w-class="amount">7</div>
            </div>
        </div>
        <div w-class="tab">
            <img src="../../res/images/money.png" w-class="tabImg"/>
            <div>
                <div w-class="tabTitle">本月提现</div>
                <div w-class="amount">7</div>
            </div>
        </div>
    </div>

    <div w-class="tabRow" style="margin:20px 0 10px;">
        <div w-class="tabBar {{it.activeTab==0?'activeTab':''}}" on-tap="changeTab(0)">提现申请</div>
        <div w-class="tabBar {{it.activeTab==1?'activeTab':''}}" on-tap="changeTab(1)">处理完成</div>
    </div>

    {{if it.showDataList}}
    <div ev-table-btnClick="dealWith">
        <div w-class="tableTitle">数据列表</div>
        <widget w-tag="app-components-table">{datas: {{it.showDataList}},title:{{it.showTitleList}},btn1:{{it.btn}} }</widget>
    </div>
    {{end}}
</div>