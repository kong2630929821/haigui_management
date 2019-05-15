<div w-class="">
    <div w-class="back" on-tap="goBack">返回</div>
    <table w-class="table">
        <thead>
            <tr style="background:#F0F0F0;">
                {{for i,v of it.showTitleList}}
                <th w-class="td">{{v}}</th>
                {{end}}
            </tr>
        </thead>
        <tbody>
            <tr style="background:#fff;">
                {{for i,v of it.userData}}
                <td w-class="td">{{v}}</td>
                {{end}}
            </tr>
        </tbody>
    </table>

    <div w-class="tabRow" style="margin:20px 0 10px;">
        <div w-class="tabBar {{it.activeTab==0?'activeTab':''}}" on-tap="changeTab(0)">ta的海宝</div>
        <div w-class="tabBar {{it.activeTab==1?'activeTab':''}}" on-tap="changeTab(1)">ta的海王</div>
    </div>

    <div>
        <div w-class="tableTitle">海宝列表</div>
        <widget w-tag="app-components-table">{datas: {{it.showDataList}},title:{{it.showTitleList}} }</widget>
    </div>
</div>