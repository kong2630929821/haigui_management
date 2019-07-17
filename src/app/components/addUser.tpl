<div w-class="modal-mask"> 
    <div w-class="addUserBox">
        {{if it.title}}
        <div w-class="addTitle">
            {{it.title}}
        </div>
        {{end}}
        <div w-class="row">
            <div w-class="title">账号：</div>
            <div w-class="input" ev-input-change="userAccount" style="width:382px;">
                <widget w-tag="app-components-input">{placeHolder:"请输入账号",input:{{it.account}},disabled:{{it.style?false:true}}}</widget>
            </div>
        </div>
        <div w-class="row">
            <div w-class="title">密码：</div>
            <div w-class="input" ev-input-change="userPassWord" style="width: 382px;">
                <widget w-tag="app-components-input">{input:{{it.password}},placeHolder:"请输入密码",itype:"password"}</widget>
            </div>
        </div>
        <div w-class="row">
            <div w-class="title">账号类型：</div>
            <div style="display:inline-block;height: 50px;margin-left: 20px;" ev-selected="filterUserTypes">
                <widget w-tag="app-components-simpleFilter1">{options:{{it.userTypes}},activeIndex:{{it.userTypesActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
            </div>
        </div>
        <div w-class="btns">
            <div w-class="btn-cancel" on-tap="cancelBtnClick">{{it.cancelText}}</div>
            <div w-class="btn-ok" on-tap="okBtnClick">{{it.sureText}}</div>
        </div>
    </div>
</div>   