<div class="new-page" w-class="page" ev-detail-back="detailBack" on-tap="close">
        <div w-class="narBar">
            <div on-tap="gotoProduct">品牌设置</div>
            <div>></div>
            <div>添加品牌</div>
        </div>
        <div w-class="searchBox">
                <div w-class="tableTitle">
                   <div>品牌</div>
                   <div w-class="btn">添加</div>
                </div>
                <div w-class="filterBoxItem">
                    {{for i,v of [1,1,1,1,1]}}
                    <div w-class="typeItem">
                        <div w-class="type1">
                            <div w-class="title">输入品牌名称</div>
                            <div w-class="input" ev-input-change="inputType_2">
                                <widget w-tag="app-components-input">{placeHolder:"请输入"}</widget>
                            </div>
                        </div>
                        <div w-class="updataTitle">品牌ICON</div>
                        <div w-class="updataImg"></div>
                        <div w-class="btn">删除</div>
                    </div>
                    {{end}}
                </div>
            </div>
        <div w-class="ctr">
            <div w-class="btn" on-tap="gotoProduct">取消</div>
            <div w-class="btn" on-tap="saveProduct" style="cursor: {{0==1?'not-allowed':''}};">保存</div>
        </div>
    </div>