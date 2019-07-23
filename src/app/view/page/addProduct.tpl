<div w-class="page" ev-detail-back="detailBack" on-tap="close" style="height:100%">
    <div w-class="narBar">
        <div on-tap="gotoProduct">SKU库</div>
        <div>></div>
        <div>{{it.title}}</div>
    </div>
    <div w-class="searchBox">
        <div w-class="tableTitle">基本信息</div>
        <div w-class="filterBox">
                <div w-class="item">
                    <div w-class="title">SKU</div>
                    <div w-class="input" ev-input-change="skuChange">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[0]?it.data[0]:""}},disabled:{{it.status==3?false:true}} }</widget>
                    </div>
                </div>   
  
                <div w-class="item">
                    <div w-class="title">供应商</div>
                    <div style="display:inline-block;height: 50px;" ev-selected="supplierTypeChange" ev-expand="expand({{0}},e)">
                        <widget w-tag="app-components-simpleFilter">{dataList:{{it.supplierType}},active:{{it.supplier}},expand:{{it.expandIndex[0]}},search:true,dataListId:{{it.supplierId}},disabled:{{it.status==3?false:true}} }</widget>
                    </div>
                </div>
                <div w-class="item">
                    <div w-class="title">SKU名</div>
                    <div w-class="input" ev-input-change="sku_nameChange">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[1]?it.data[1]:""}},disabled:{{it.status==1?true:false}}}</widget>
                    </div>
                </div>
           
           
                <div w-class="item">
                    <div w-class="title">库存数量</div>
                    <div w-class="input" ev-input-change="inventoryChange">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[4]?it.data[4]:""}},disabled:{{it.status==1?true:false}},itype:"number"}</widget>
                    </div>
                </div>
                <div w-class="item">
                    <div w-class="title">供货价(元)</div>
                    <div w-class="input" ev-input-change="supplier_priceChange" style="width:319px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[5]?it.data[5]:""}},disabled:{{it.status==1?true:false}},itype:"number"}</widget>
                    </div>
                </div>
           
           
                <div w-class="item">
                    <div w-class="title">供应商SKU</div>
                    <div w-class="input" ev-input-change="supplierSkuChange">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[8]?it.data[8]:""}},disabled:{{it.status==1?true:false}}}</widget>
                    </div>
                </div>
                <div w-class="item">
                    <div w-class="title">供应商商品id</div>
                    <div w-class="input" ev-input-change="supplierIdChange">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[9]?it.data[9]:""}},disabled:{{it.status==1?true:false}}}</widget>
                    </div>
                </div>
                <div w-class="item">
                    <div w-class="title">保质期</div>
                    <div style="display:inline-block;height: 50px;" ev-selected="shelfLifeChange"  ev-expand="expand({{1}},e)">
                        <widget w-tag="app-components-simpleFilter1">{options:{{it.shelfLife}},activeIndex:{{it.shelfLifeActiveIndex}},expand:{{it.expandIndex[1]}} }</widget>
                    </div>
                </div>
                {{if !it.shelfLifeActiveIndex}}
                    <div w-class="item">
                        <div w-class="title">保质期时间</div>
                        <div style="width: 300px;" ev-dateBox-change="changeDateBox" ev-period-change="changeDate">
                            <widget w-tag="app-components-periodTimePicker">{showDateBox:{{it.showDateBox}},startDate:{{it.startTime}},endDate:{{it.endTime}},needTime:false }</widget>
                        </div>
                    </div>
                {{end}}
                <div w-class="item">
                    <div w-class="title">退货信息</div>
                    <div w-class="input" ev-input-change="returnGoodsInfo">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[10]?it.data[10]:""}},disabled:{{it.status==1?true:false}}}</widget>
                    </div>
                </div>
                <div w-class="item">
                    <div w-class="title">收件人</div>
                    <div w-class="input" ev-input-change="recipient">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[11]?it.data[11]:""}},disabled:{{it.status==1?true:false}}}</widget>
                    </div>
                </div>
                <div w-class="item">
                    <div w-class="title">联系电话</div>
                    <div w-class="input" ev-input-change="phoneChange">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[12]?it.data[12]:""}},disabled:{{it.status==1?true:false}},maxLength:11}</widget>
                    </div>
                </div>
        </div>
    </div>
    <div w-class="ctr">
        <div w-class="btn" on-tap="gotoProduct">取消</div>
        {{if it.status!=1}}
        <div w-class="btn" on-tap="saveProduct">保存</div>
        {{end}}
    </div>
</div>