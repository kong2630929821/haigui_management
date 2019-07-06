<div w-class="modify">
    <div w-class="box">输入正数为增加，输入负数为减少</div>
    {{for i,v of it.showData}}
    <div w-class="money">
        <p w-class="title">{{v.title}} ￥{{v.num}}</p>
        <div w-class="input" ev-input-change="inputChange(e,{{i}})">
            <widget w-tag="app-components-input">{placeHolder:{{v.num}}}</widget>
            <div w-class="btn2" on-tap="okBtnClick({{i}})">修改</div>
        </div>
    </div>
    {{end}}
    <div w-class="btnGroup">
        <div w-class="btn1" on-tap="cancelBtnClick">关闭窗口</div>
    </div>
</div>