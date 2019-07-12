<div w-class="addUserBox">
    {{if it.title}}
    <div w-class="addTitle">
        {{it.title}}
    </div>
    {{end}}
    <div w-class="addBox">
        {{for i,v of it.showDataTitle}}
            <div w-class="row">
                <div w-class="title">{{v}}</div>
                <div w-class="input" ev-input-change="change({{i}},e)" style="width:382px;">
                    <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.style!=0?it.data[i]?it.data[i]:JSON.stringify(it.data[i]):""}},disabled:{{i==0?true:false}},itype:"number"}</widget>
                </div>
            </div>
        {{end}}
        <div w-class="row" style="justify-content: center;">
            <div w-class="title">{{it.content}}</div>
            <div style="display:inline-block;height: 50px;margin-left: 20px;" ev-selected="filterPostage">
                <widget w-tag="app-components-simpleFilter1">{options:{{it.postage}},activeIndex:{{it.postageActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
            </div>
        </div>
    </div>
    <div w-class="btns">
        <div w-class="btn-cancel" on-tap="cancelBtnClick">{{it.cancelText}}</div>
        <div w-class="btn-ok" on-tap="okBtnClick">{{it.sureText}}</div>
    </div>
</div>