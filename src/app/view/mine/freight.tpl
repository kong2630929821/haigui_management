<div class="new-page" w-class="page">
    <div w-class="top">
        <div w-class="row">
            <div w-class="text row">
                <img src="../../res/image/address.png" w-class="img"/>
                <span>收货人：陈某某</span>
            </div>
            <div w-class="text">12000325250</div>
        </div>
        <div w-class="address">收货地址：四川省成都市高新区天府三街1140号17栋5-33号</div>
    </div>

    <widget w-tag="app-view-mine-orderItem"></widget>

    <div w-class="row row1">
        <div w-class="order">
            百世快递&nbsp;<span style="color:#000;">12323565612154</span>
        </div>
        <img src="../../res/image/copy.png" w-class="copy"/>
    </div>

    {{for i,v of [1,2,3]}}
    <div w-class="process">
        <div>商品等待揽收</div>
        <div style="font-size: 26px;margin-top: 10px;">04-14 23:00</div>
    </div>
    {{end}}
</div>