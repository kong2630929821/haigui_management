<div class="new-page" w-class="page" ev-detail-back="detailBack" on-tap="close">
    <div w-class="narBar">
        <div on-tap="gotoProduct">分类配置</div>
        <div>></div>
        <div>添加分类</div>
    </div>
    <div w-class="searchBox">
        <div w-class="tableTitle">
           <div> 一级分类</div>
           <div w-class="btn">添加</div>
        </div>
        <div w-class="filterBox">
            <div w-class="type_group">
                <div w-class="type1">
                    <div w-class="title">请输入一级分类名字</div>
                    <div w-class="input" ev-input-change="inputType_1">
                        <widget w-tag="app-components-input">{placeHolder:"请输入"}</widget>
                    </div>
                </div>
                <div w-class="btn1">删除</div>
            </div>
        </div>
    </div>
    <div w-class="searchBox">
            <div w-class="tableTitle">
               <div>二级分类</div>
               <div w-class="btn">添加</div>
            </div>
            <div w-class="filterBoxItem">
                {{for i,v of [1,1,1,1,1]}}
                <div w-class="typeItem">
                    <div w-class="type1">
                        <div w-class="title">请输入二级分类名字</div>
                        <div w-class="input" ev-input-change="inputType_2">
                            <widget w-tag="app-components-input">{placeHolder:"请输入"}</widget>
                        </div>
                    </div>
                    <div w-class="updataTitle">上传照片</div>
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