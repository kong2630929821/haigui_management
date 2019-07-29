<div w-class="page" ev-detail-back="detailBack" on-tap="close">
    {{if it.selGoodsIndex === -1}}
    <div w-class="back" on-tap="goBack" on-down="onShow">返回</div>
    <div w-class="searchBox">
        <div w-class="tableTitle">
           <div> 一级分类</div>
        </div>
        <div style="padding-bottom: 20px;display:flex;justify-content: space-between;">
            <div w-class="tab" style="width:auto" ev-input-change="firstNameChange">
                <span style="margin:0 10px;">分类名字: </span>
                <widget w-tag="app-components-input">{placeHolder:"输入分类名字",style:"border:1px solid #eee;",input:{{it.currentData.name}} }</widget>
            </div>
            
        </div>
    </div>
    <div w-class="searchBox">
        <div w-class="tableTitle">
            <div>二级分类</div>
            <div w-class="btn" on-tap="addBtn" on-down="onShow">添加</div>
        </div>
        <div w-class="filterBoxItem">
            {{if it.currentData.groupType}}
                {{for i,v of it.currentData.children}}
                <div w-class="typeItem">
                    <div w-class="tab" ev-input-change="secondNameChange(e,{{i}})">
                        <span style="margin:0 10px;">分类名字: </span>
                        <widget w-tag="app-components-input">{placeHolder:"输入分类名字",style:"border:1px solid #eee;",input:{{v.name}} }</widget>
                    </div>
                    <div w-class="tab">
                        <span style="margin-right:10px;">图标</span>
                        <div w-class="imgIcon" ev-input-file="secondImgUpload(e,{{i}})">
                            <widget w-tag="app-components-inputImg" >{path:"group",src:{{v.imgs[0].length > 0 ? v.imgs[0][0]:''}} }</widget>
                        </div>
                    </div>
                    <div w-class="tab" style="justify-content: flex-end;">
                        <div w-class="btn1" on-tap="delSecondClass({{i}})" on-down="onShow">删除</div>
                        <div w-class="btn1" on-tap="chooseGoods({{i}})" on-down="onShow">选择商品</div>
                        <div w-class="btn1" on-tap="saveSecondClass({{i}})" on-down="onShow">保存</div>
                    </div>
                </div>
                {{end}}
            {{end}}

            {{if it.addClass}}
            <div w-class="typeItem">
                <div w-class="tab" ev-input-change="secondNameChange(e,-1)">
                    <span style="margin:0 10px;">分类名字: </span>
                    <widget w-tag="app-components-input">{placeHolder:"输入分类名字",style:"border:1px solid #eee;",input:{{it.secondName}}}</widget>
                </div>
                <div w-class="inputBox" ev-input-file="secondImgUpload(e,-1)">
                    <widget w-tag="app-components-inputImg">{path:"group",src:{{it.secondImg}} }</widget>
                </div>
                
                <div w-class="tab" style="justify-content: flex-end;">
                    <div w-class="btn1" on-tap="delBtn" on-down="onShow">删除</div>
                    <div w-class="btn1" on-tap="addSecondClass" on-down="onShow">保存</div>
                </div>
            </div>
            {{end}}
        </div>
    </div>
    <div w-class="btns">
        {{if it.currentData.name}}
        <div w-class="btn" on-tap="delClass" style="margin-right:30px;" on-down="onShow">删除</div>
        {{end}}
        <div w-class="btn" on-tap="addClass" on-down="onShow">保存</div>
    </div>
    
    {{else}}
    <div ev-confirm="selectGoods" ev-goodsInfo-back="cancelSel">
        <widget w-tag="app-view-page-goodsInfo">{goodsId:{{it.goodsId}} }</widget>
    </div>
    {{end}}
</div>