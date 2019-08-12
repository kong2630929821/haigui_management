<div w-class="modify">
    <div w-class="box">输入正数为增加，输入负数为减少</div>
    {{for i,v of it.showData}}
    <div w-class="money">
        <div w-class="changeBox">
            <p w-class="title1">{{v.title}} ￥{{v.num}}</p>
            <div w-class="input" ev-input-change="inputChange(e,{{i}})">
                <widget w-tag="app-components-input">{placeHolder:{{v.num}},itype:"number",maxNumber:1000000 }</widget>            
            </div>
        </div>
        <div w-class="changeBox">
            <p w-class="title">备注</p>
            <div w-class="input" ev-input-change="inputNoteChange(e,{{i}})">
                <widget w-tag="app-components-input">{placeHolder:"请输入备注",input:{{v.note}} }</widget>            
            </div>
            <div w-class="btn2" on-tap="okBtnClick({{i}})" on-down="onShow">修改</div>
        </div>
    </div>
    {{end}}
    <div w-class="btnGroup">
        <div w-class="btn1" on-tap="cancelBtnClick" on-down="onShow">关闭窗口</div>
    </div>
</div>