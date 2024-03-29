<div w-class="modal-mask">
    <div w-class="body">
        {{if it.title}}
        <div w-class="title">
            <pi-ui-html>{{it.title}}</pi-ui-html>
        </div>
        {{end}}
        <div w-class="input" ev-input-change="messChange">
            <widget w-tag="app-components-input">{placeHolder:{{it.placeHolder}} }</widget>        
        </div>

        <div w-class="btns">
            <div w-class="btn-cancel" on-tap="cancelBtnClick" on-down="onShow">{{it.cancelText}}</div>
            <div w-class="btn-ok" on-tap="okBtnClick" on-down="onShow">{{it.sureText}}</div>
        </div>
    </div>
</div>