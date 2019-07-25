<div w-class="modal-mask">
    <div w-class="body">
        <div w-class="title">退货申请</div>
        <div w-class="content">
            <span>申请人：</span>
            <span>{{it.username}}</span>
            <span style="margin-left:20px;">退货理由：</span>
            <span>{{it.content}}</span>
        </div>
        <div style="color: #888;">详情图片：</div>
        {{for i,v of it.imgs}}
        <widget w-tag="app-components-img" style="margin-right:10px">{imgURL:{{v}},width:"300px"}</widget>
        {{end}}
        <div w-class="btns">
            <div w-class="btn-ok" on-tap="closeBtn" on-down="onShow">关闭</div>
        </div>
    </div>
</div>