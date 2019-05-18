<div w-class="page" ev-detail-back="detailBack">
    <div w-class="tabRow">
        <div w-class="search" on-tap="search">订单列表</div>
    </div>
    <div w-class="searchBox">
        <div w-class="tableTitle">筛选查询</div>
        <input type="text" placeholder="订单编号"/>
        <select on-change="showOrderBySid">
            {{for i,v of it.supplierList}}
                <option value="{{v}}">{{v}}</option>
            {{end}}
        </select>
        <select on-change="showOrderByOrderType">
            {{for i,v of it.orderType}}
                <option value="{{v}}">{{v}}</option>
            {{end}}
        </select>
        <select on-change="showOrderByExportState">
            {{for i,v of it.exportType}}
                <option value="{{v}}">{{v}}</option>
            {{end}}
        </select>
        
        <div>
            开始时间<input type="datetime-local"/>
            结束时间<input type="datetime-local"/>
            <select on-change="showOrderByTime">
                    {{for i,v of it.timeType}}
                        <option value="{{v}}">{{v}}</option>
                    {{end}}
            </select>
        </div>
        <div w-class="search" on-tap="exportOrder">导出订单</div>
        <div w-class="search" on-tap="searchById">按订单id查询</div>
        <input type="file" on-change="importTransport"/>导入运单
    </div>
    <div>
        <widget w-tag="app-components-table">{datas: {{it.contentList}},title:{{it.showTitleList}},needCheckBox:false}</widget>
    </div>
</div>