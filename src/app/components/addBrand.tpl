<div w-class="addBrand">
    {{if it.title}}
    <div w-class="addTitle">
        {{it.title}}
    </div>
    {{end}}
    <div w-class="row">
        <div w-class="title">品牌名</div>
        <div w-class="input" ev-input-change="brandName">
            <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.inputValue}}}</widget>
        </div>
    </div>
    <div w-class="row">
        <div w-class="title">品牌描述</div>
        <div w-class="input" ev-input-change="textareaChange" style="width: 382px;height:  114px;">
            <widget w-tag="app-components-textarea">{input:{{it.textArea}},placehold:"",disabled:false,clearable:false,itype:"text",style:"",autofacus:false,maxLength:150}</widget>
        </div>
    </div>
    <div w-class="row">
        <div w-class="title">ICON路径</div>
        <div w-class="input" ev-input-change="inputIconChange" style="width: 386px;margin-left:38px">
            <widget w-tag="app-components-input">{input:{{it.path}},placehold:""}</widget>
        </div>
    </div>
    <div w-class="row">
        <div w-class="title">品牌ICON</div>
        <div w-class="img_item" ev-input-file="updataImg">
            <app-components-inputImg>{path:{{it.path}},src:{{it.img}} }</app-components-inputImg>
        </div>
    </div>
    <div w-class="btns">
        <div w-class="btn-cancel" on-tap="cancelBtnClick">{{it.cancelText}}</div>
        <div w-class="btn-ok" on-tap="okBtnClick">{{it.sureText}}</div>
    </div>
</div>