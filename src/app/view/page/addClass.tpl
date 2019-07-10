<div class="new-page" w-class="page" ev-detail-back="detailBack" on-tap="close">
    <div w-class="back" on-tap="goBack">返回</div>

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
            <div w-class="btn" on-tap="addBtn">添加</div>
        </div>
        <div w-class="filterBoxItem">
            {{if it.currentData.groupType}}
                {{for i,v of it.currentData.children}}
                <div w-class="typeItem">
                    <div w-class="tab">
                        <span style="margin:0 10px;">分类名字: </span>
                        <widget w-tag="app-components-input">{placeHolder:"输入分类名字",style:"border:1px solid #eee;",input:{{v.name}}}</widget>
                    </div>
                    <div w-class="tab">
                        <span style="margin-right:10px;">图标</span>
                        <img w-class="imgIcon" src="{{it.mallImagPre}}/{{v.imgs?v.imgs[0][0]:''}}" alt="图片"/>
                    </div>
                    <div w-class="tab" style="justify-content: flex-end;">
                        <div w-class="btn1" on-tap="delSecondClass({{i}})">删除</div>
                        <div w-class="btn1" on-tap="upSecondClass({{i}})">保存</div>
                    </div>
                </div>
                {{end}}
            {{end}}

            {{if it.addClass}}
            <div w-class="typeItem">
                <div w-class="tab" ev-input-change="secondNameChange">
                    <span style="margin:0 10px;">分类名字: </span>
                    <widget w-tag="app-components-input">{placeHolder:"输入分类名字",style:"border:1px solid #eee;",input:{{it.secondName}}}</widget>
                </div>
                <div w-class="inputBox" ev-input-file="secondImgUpload">
                    <widget w-tag="app-components-inputImg">{path:"group",src:{{it.secondImg}} }</widget>
                </div>
                
                <div w-class="tab" style="justify-content: flex-end;">
                    <div w-class="btn1" on-tap="delBtn">删除</div>
                    <div w-class="btn1" on-tap="addSecondClass">保存</div>
                </div>
            </div>
            {{end}}
        </div>
    </div>
    <div w-class="btns">
        {{if it.currentData.name}}
        <div w-class="btn" on-tap="delClass" style="margin-right:30px;">删除</div>
        {{end}}
        <div w-class="btn" on-tap="addClass">保存</div>
    </div>
</div>