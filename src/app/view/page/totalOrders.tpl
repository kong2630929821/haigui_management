<div w-class="page" ev-detail-back="detailBack">
    <div w-class="tabRow">
        <div w-class="search" on-tap="search">订单列表</div>
    </div>
    <div w-class="searchBox">
        <div w-class="tableTitle">筛选查询</div>
        <div w-class="input">
            <widget w-tag="app-components-input">{placeHolder:"订单编号"}</widget>
        </div>
        <select>
            {{for i,v of it.supplierList}}
                <option value="{{v}}">{{v}}</option>
            {{end}}
        </select>
        <select>
            {{for i,v of it.orderType}}
                <option value="{{v}}">{{v}}</option>
            {{end}}
        </select>
        <div w-class="search" on-tap="search">查询</div>
        <div w-class="search" on-tap="test">显示所有供应商</div>
        <div w-class="search" on-tap="exportOrder">导出订单</div>
        <input type="file" on-change="importTransport"/>导入运单
    </div>
    <div>
        <widget w-tag="app-components-table">{datas: {{it.contentList}},title:{{it.showTitleList}},needCheckBox:false}</widget>
    </div>
</div>