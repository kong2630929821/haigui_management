<div w-class="page" on-tap="close" style="height:100%">
    {{if !it.showEdit}}
    <div style="background:#fff;">
        <div w-class="tableTitle">筛选位置</div>
        <div w-class="locationSel" ev-selected="changeLocation" ev-expand="expand">
            <span style="margin-right:20px;">选择展示位置</span>
            <widget w-tag="app-components-simpleFilter">{options:["商城首页","分类汇总页"],active:{{it.active}},expand:{{it.expandIndex}} }</widget>
        </div>
    </div>

    <div w-class="searchBoxType">
        <div w-class="classSum">共计：{{it.num[0]}}个一级分类 {{it.num[1]}}个二级分类</div>
        <div w-class="tableTitle">商品分类<div w-class="btn" on-tap="goEdit(-1)">添加</div></div>
        <div w-class="searchItem_1">
            <div w-class="tableDataTitle">
                {{for i,v of it.showDataTitle}}
                    <div w-class="data_item">{{v}}</div>
                {{end}}
            </div>
            {{for i,v of it.showDataList}}
            <div w-class="tableItem">
                <div w-class="data_item">{{v.name}}</div>
                <div w-class="data_item_1">
                    {{if v.groupType}}
                        {{for index,item of v.children}}
                            <div w-class="col_item">{{item.name}}</div>
                        {{end}}
                    {{end}}
                </div>
                <div w-class="data_item">{{v.time}}</div>
                <div w-class="data_item_1">
                    <div w-class="btn" on-tap="goEdit({{i}})">编辑</div>
                </div>
            </div>
            {{end}}
        </div>
    </div>
    {{elseif it.active==0}}
    <div ev-detail-back="closeEdit">
        <widget w-tag="app-view-page-mallSettingEdit">{currentData:{{it.currentData}},addNewClass:{{it.addNewClass}} }</widget>
    </div>

    {{elseif it.active==1}}
    <div ev-detail-back="closeEdit">
        <widget w-tag="app-view-page-addClass">{currentData:{{it.currentData}},addNewClass:{{it.addNewClass}},isMallHome:false }</widget>
    </div>
    {{end}}
</div>