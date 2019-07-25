<div w-class="modal-mask">
    <div w-class="body">
        {{if it.title}}
        <div w-class="title">
            {{it.title}}
        </div>
        {{end}}
        {{if !it.style}}
        <div w-class="content">
            <pi-ui-html>{{it.content}}</pi-ui-html>         
        </div>
        {{else}}
        <div w-class="input" ev-input-change="inputChange">
            <widget w-tag="app-components-input">{placeHolder:"输入邀请码"}</widget>
        </div>
        {{end}}
        <div w-class="btns">
            <div w-class="btn-cancel" on-tap="cancelBtnClick" on-down="onShow">{{it.cancelText}}</div>
            <div w-class="btn-ok" on-tap="okBtnClick" on-down="onShow">{{it.sureText}}</div>
        </div>
    </div>
</div>