<div w-class="addUserBox">
    {{if it.title}}
    <div w-class="addTitle">
        {{it.title}}
    </div>
    {{end}}
    <div w-class="row">
        <div w-class="title">金额：</div>
        <div w-class="input" ev-input-change="priceChange" style="width:382px;">
            <widget w-tag="app-components-input">{placeHolder:"请输入金额",input:{{it.price}}}</widget>
        </div>
    </div>
    <div w-class="row">
        <div w-class="title">中奖概率(%)：</div>
        <div w-class="input" ev-input-change="probabilityChange" style="width: 314px;">
            <widget w-tag="app-components-input">{input:{{it.probability}},placeHolder:"请输入概率"}</widget>
        </div>
    </div>
    <div w-class="btns">
        <div w-class="btn-cancel" on-tap="cancelBtnClick">{{it.cancelText}}</div>
        <div w-class="btn-ok" on-tap="okBtnClick">{{it.sureText}}</div>
    </div>
</div>