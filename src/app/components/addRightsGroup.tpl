<div w-class="modal-mask" on-tap="close"> 
    <div w-class="addUserBox">
        {{if it.title}}
        <div w-class="addTitle">
            {{it.title}}
        </div>
        {{end}}
        <div w-class="group">
            {{for i,v of it.showDataList}}
                <div w-class="row1" on-tap="check({{i}})" on-down="onShow">
                    <img src="../res/images/{{it.checkedList[i]?'selectBox_active.png':'selectBox.png'}}" w-class="rowImg"/>
                    <div w-class="rowItem">{{v}}</div>
                </div>
            {{end}}
        </div>
        <div w-class="row">
            <div w-class="title">名字</div>
            <div w-class="input" ev-input-change="nameChange" style="width: 382px;">
                <widget w-tag="app-components-input">{input:{{it.name}},placeHolder:"请输入名字"}</widget>
            </div>
        </div>
        <div w-class="btns">
            <div w-class="btn-cancel" on-tap="cancelBtnClick" on-down="onShow">{{it.cancelText}}</div>
            <div w-class="btn-ok" on-tap="okBtnClick" on-down="onShow">{{it.sureText}}</div>
        </div>
    </div>
</div>   