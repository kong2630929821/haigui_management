<div>
    {{if it.orderType < 4}}
    <div w-class="row row1">
        <div w-class="order">订单号:e201523358595626</div>
        <div w-class="status">{{it.statusList[it.orderType]}}</div>
    </div>
    {{end}}
    <div w-class="row" style="margin:20px 30px;" on-tap="itemClick">
        <img src="../../res/image/classify_active.png" w-class="goodsImg"/>
        <div w-class="column">
            <div w-class="goodsTitle">商品标题商品标题商品标题商品标题商品标题商品标题商品标题</div>
            <div style="margin-bottom: 20px;">红色，规格1</div>
            <div w-class="row">
                <span style="font-size:32px;color:#8A4AF3;">￥ 88.00</span>
                <span style="font-size:20px;color:#353535;">x1</span>
            </div>
        </div>
    </div>

    <div w-class="row1">
        <div w-class="total">
            合计<span style="font-size:32px;color:#8A4AF3">￥ 88.00</span>
        </div>
    </div>

    <div w-class="row1">
        <div w-class="total">
            {{if it.btnList[it.orderType].btn1}}
            <div w-class="btn" on-tap="btnClick(e,0)">{{it.btnList[it.orderType].btn1}}</div>
            {{end}}
            <div w-class="btn btn1" on-tap="btnClick(e,1)">{{it.btnList[it.orderType].btn2}}</div>
        </div>
    </div>
</div>