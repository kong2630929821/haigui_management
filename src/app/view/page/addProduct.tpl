<div class="new-page" w-class="page" ev-detail-back="detailBack" on-tap="close">
    <div w-class="narBar">
        <div on-tap="gotoProduct">产品库</div>
        <div>></div>
        <div>添加产品</div>
    </div>
    <div w-class="searchBox">
        <div w-class="tableTitle">基本信息</div>
        <div w-class="filterBox">
            <div w-class="productName">
                <div w-class="title">SKU</div>
                <div w-class="input" ev-input-change="skuChange" style="width: 724px;">
                    <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[1]}},disabled:{{it.status==1?true:false}} }</widget>
                </div>
            </div>
            <div w-class="productName">
                <div w-class="item">
                    <div w-class="title">供应商id</div>
                    <div w-class="input" ev-input-change="supplierChange" style="width: 464px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[0]}},disabled:{{it.status==1?true:false}}}</widget>
                    </div>
                </div>
                <div w-class="item">
                    <div w-class="title">产品名</div>
                    <div w-class="input" ev-input-change="sku_nameChange" style="width: 464px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[2]}},disabled:{{it.status==1?true:false}}}</widget>
                    </div>
                </div>
            </div>
            <div w-class="productName">
                <div w-class="item">
                    <div w-class="title">库存数量</div>
                    <div w-class="input" ev-input-change="inventoryChange" style="width: 464px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[5]}},disabled:{{it.status==1?true:false}}}</widget>
                    </div>
                </div>
                <div w-class="item">
                    <div w-class="title">供货价</div>
                    <div w-class="input" ev-input-change="supplier_priceChange" style="width: 464px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[6]}},disabled:{{it.status==1?true:false}}}</widget>
                    </div>
                </div>
            </div>
            <div w-class="productName">
                <div w-class="item">
                    <div w-class="title">供应商SKU</div>
                    <div w-class="input" ev-input-change="supplierSkuChange" style="width: 464px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[9]}},disabled:{{it.status==1?true:false}}}</widget>
                    </div>
                </div>
                <div w-class="item">
                    <div w-class="title">供应商商品id</div>
                    <div w-class="input" ev-input-change="supplierIdChange" style="width: 464px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[10]}},disabled:{{it.status==1?true:false}}}</widget>
                    </div>
                </div>
            </div>
            <div w-class="productName">
                <div w-class="title">保质期</div>
                <div style="display:inline-block;height: 50px;margin-left: 20px;" ev-selected="shelfLifeChange">
                    <widget w-tag="app-components-simpleFilter1">{options:{{it.shelfLife}},activeIndex:{{it.shelfLifeActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
                </div>
                {{if !it.shelfLifeActiveIndex}}
                    <div w-class="title">保质期时间</div>
                    <div style="margin-left: 20px;" ev-dateBox-change="changeDateBox" ev-period-change="changeDate">
                        <widget w-tag="app-components-periodTimePicker">{showDateBox:{{it.showDateBox}},startDate:{{it.startTime}},endDate:{{it.endTime}} }</widget>
                    </div>
                {{end}}
            </div>
            <div w-class="productName">
                <div w-class="item">
                    <div w-class="title">退货信息</div>
                    <div w-class="input" ev-input-change="returnGoodsInfo" style="width: 664px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[11]}},disabled:{{it.status==1?true:false}}}</widget>
                    </div>
                </div>
            </div>
            <div w-class="productName">
                <div w-class="item">
                    <div w-class="title">收件人</div>
                    <div w-class="input" ev-input-change="recipient" style="width: 464px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[12]}},disabled:{{it.status==1?true:false}}}</widget>
                    </div>
                </div>
                <div w-class="item">
                    <div w-class="title">联系电话</div>
                    <div w-class="input" ev-input-change="phoneChange" style="width: 464px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[13]}},disabled:{{it.status==1?true:false}}}</widget>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div w-class="ctr">
        <div w-class="btn" on-tap="gotoProduct">取消</div>
        <div w-class="btn" on-tap="saveProduct" style="cursor: {{it.status==1?'not-allowed':''}};">保存</div>
    </div>
</div>