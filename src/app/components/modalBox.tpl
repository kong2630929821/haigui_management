<div w-class="modal-mask">
    <div w-class="body">
        {{if it.title}}
        <div w-class="title">
            {{it.title}}
        </div>
        {{end}}
        <div w-class="content">
            <pi-ui-html>{{it.content}}</pi-ui-html>         
        </div>

        <div w-class="btns">
            <div w-class="btn-cancel" on-tap="cancelBtnClick">{{it.cancelText}}</div>
            <div w-class="btn-ok" on-tap="okBtnClick">{{it.sureText}}</div>
        </div>
    </div>
</div>