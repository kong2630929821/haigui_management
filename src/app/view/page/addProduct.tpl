<div w-class="page" ev-detail-back="detailBack" on-tap="close">
    <div w-class="narBar">
        <div>产品库</div>
        <div>></div>
        <div>添加产品</div>
    </div>
    <div w-class="searchBox">
        <div w-class="tableTitle">基本信息</div>
        <div w-class="filterBox">
            <div w-class="productName">
                <div w-class="title">产品名称</div>
                <div w-class="input" ev-input-change="inputChange" style="width: 724px;">
                    <widget w-tag="app-components-input">{placeHolder:"请输入"}</widget>
                </div>
            </div>
            <div w-class="productName">
                <div w-class="item">
                    <div w-class="title">SKU编号</div>
                    <div w-class="input" ev-input-change="inputChange" style="width: 464px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入"}</widget>
                    </div>
                </div>
                <div w-class="item">
                    <div w-class="title">供应商SKU编号</div>
                    <div w-class="input" ev-input-change="inputChange" style="width: 464px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入"}</widget>
                    </div>
                </div>
            </div>
            <div w-class="productName">
                <div w-class="item">
                    <div w-class="title">库存数量</div>
                    <div w-class="input" ev-input-change="inputChange" style="width: 464px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入"}</widget>
                    </div>
                </div>
                <div w-class="item">
                    <div w-class="title">供应商商品ID</div>
                    <div w-class="input" ev-input-change="inputChange" style="width: 464px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入"}</widget>
                    </div>
                </div>
            </div>
            <div w-class="productName">
                <div w-class="item">
                    <div w-class="title">成本价格</div>
                    <div w-class="input" ev-input-change="inputChange" style="width: 464px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入"}</widget>
                    </div>
                </div>
                <div w-class="item">
                    <div w-class="title">产品类型</div>
                    <div style="display:inline-block;height: 50px;margin-left: 20px;" ev-selected="filterProductTypes">
                        <widget w-tag="app-components-simpleFilter1">{options:{{it.productTypes}},activeIndex:{{it.ProductTypesActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
                    </div>
                    <div w-class="input" ev-input-change="inputChange" style="width: 305px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入税费"}</widget>
                    </div>
                </div>
            </div>
            <div w-class="productName">
                <div w-class="title">保质期</div>
                <div style="display:inline-block;height: 50px;margin-left: 20px;" ev-selected="filterTimeType">
                    <widget w-tag="app-components-simpleFilter1">{options:{{it.timeType}},activeIndex:{{it.timeTypeActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
                </div>
                <div w-class="title">保质期时间</div>
                <div style="margin-left: 20px;" ev-dateBox-change="changeDateBox" ev-period-change="changeDate">
                    <widget w-tag="app-components-periodTimePicker">{showDateBox:{{it.showDateBox}},startDate:{{it.startTime}},endDate:{{it.endTime}} }</widget>
                </div>
            </div>
        </div>
    </div>
    <div w-class="searchBox">
        <div w-class="tableTitle">其他信息</div>
        <div w-class="otherBox">
            <div w-class="productName">
                <div w-class="title">供应商（ID）</div>
                <div style="display:inline-block;height: 50px;margin-left: 20px;" ev-selected="filterProductTypes">
                    <widget w-tag="app-components-simpleFilter1">{options:{{it.productTypes}},activeIndex:{{it.ProductTypesActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
                </div>
            </div>
            <div w-class="productName">
                <div w-class="title">退货信息</div>
                <div w-class="input" ev-input-change="inputChange" style="width: 1104px;margin-left: 56px;">
                    <widget w-tag="app-components-input">{placeHolder:"请输入"}</widget>
                </div>
            </div>
            <div w-class="productName">
                <div w-class="item">
                    <div w-class="title">收件人</div>
                    <div w-class="input" ev-input-change="inputChange" style="width: 464px;margin-left: 74px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入"}</widget>
                    </div>
                </div>
                <div w-class="item">
                    <div w-class="title">联系电话</div>
                    <div w-class="input" ev-input-change="inputChange" style="width: 464px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入"}</widget>
                    </div>
                </div>
            </div>
            <div w-class="productName">
                <div w-class="title">品牌</div>
                <div style="display:inline-block;height: 50px;margin-left: 20px;" ev-selected="filterProductTypes">
                    <widget w-tag="app-components-simpleFilter1">{options:{{it.productTypes}},activeIndex:{{it.ProductTypesActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
                </div>
            </div>
            <div w-class="productName">
                <div w-class="title">产品原产地</div>
                <div style="display:inline-block;height: 50px;margin-left: 20px;" ev-selected="filterProductTypes">
                    <widget w-tag="app-components-simpleFilter1">{options:{{it.productTypes}},activeIndex:{{it.ProductTypesActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
                </div>
            </div>
        </div>
    </div>
    <div w-class="ctr">
        <div w-class="btn">取消</div>
        <div w-class="btn">保存</div>
        <div w-class="btn">保存并继续添加</div>
    </div>
</div>