<div w-class="page" ev-detail-back="detailBack" on-tap="close">
    <div w-class="searchBox">
        <div w-class="tableTitle">提现状态</div>
        <div w-class="filterBox">
           <div w-class="switch" ev-switch-click="switchChange">
                <div w-class="switchTitle">{{it.title}}</div>
                <app-components-switch style="margin-left:25px;">{type:{{it.status}},activeColor:"#13ce66",inactiveColor:"#ff4949"}</app-components-switch>
           </div>
        </div>
    </div>
    <div w-class="searchBox">
        <div w-class="tableTitle">提现设置</div>
        <div w-class="settingBox">
            {{for i,v of it.showDataTitle}}
                {{if i==0||i==1||i== 5||i==6 }}
                <div w-class="box">
                    <div w-class="title">{{v}}</div>
                    <div w-class="input" ev-input-change="inputChange({{i}},e)" style="width: 382px;">
                        <widget w-tag="app-components-input">{input:{{it.showDataList[i]}},placeHolder:"请输入",itype:"number",disabled:"{{it.isChange?it.isChange:''}}" }</widget>
                    </div>
                </div>
                {{end}}
            {{end}}
        </div>
    </div>
    <div w-class="btns">
        <div w-class="btn-cancel" on-tap="changeBtnClick" on-down="onShow">修改</div>
        <div w-class="btn-ok" on-tap="okBtnClick" on-down="onShow">保存</div>
    </div>
</div>