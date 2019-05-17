<div w-class="page" ev-detail-back="detailBack">
    <div w-class="tabRow">
        <div w-class="search" on-tap="search">订单列表</div>
    </div>
    <div w-class="searchBox">
        <div w-class="tableTitle">筛选查询</div>
        <input type="text" placeholder="订单编号"/>
        <select on-change="showOrder">
            {{for i,v of it.supplierList}}
                <option value="{{v}}">{{v}}</option>
            {{end}}
        </select>
        <select on-change="showOrder">
            {{for i,v of it.orderType}}
                <option value="{{v}}">{{v}}</option>
            {{end}}
        </select>
        <div w-class="search" on-tap="test">显示所有供应商</div>
        <div w-class="search" on-tap="exportOrder">导出订单</div>
        <div w-class="search" on-tap="searchById">按订单id查询</div>
        <input type="file" on-change="importTransport"/>导入运单
    </div>
    <div>
        <widget w-tag="app-components-table">{datas: {{it.contentList}},title:{{it.showTitleList}},needCheckBox:false}</widget>
    </div>
</div>