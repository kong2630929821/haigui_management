<div w-class="page">
    <div w-class="back" on-tap="goBack">返回</div>
    
    {{%===========================聚合专区设置===========================}}
    <div w-class="bannerBox">
        <div w-class="tableTitle">聚合页专区设置<div w-class="btn" on-tap="addBtn">添加</div></div>
        <div w-class="item">
            <div w-class="itemTitle" style="margin-left:10px;">聚合页专区:&nbsp;1</div>
            <div w-class="itemContent">
                <div w-class="guessTab">
                    <span style="margin-right:10px;">专区封面图</span>
                    <div w-class="tab inputBox">
                        <widget w-tag="app-components-inputImg"></widget>
                    </div>
                </div>
                <div w-class="guessTab">
                    <span style="margin-right:10px;">专区头图</span>
                    <div w-class="tab inputBox">
                        <widget w-tag="app-components-inputImg"></widget>
                    </div>
                </div>
                <div w-class="guessTab" style="flex:1 0 0;">
                    <span style="margin-right:10px;">专区名称</span>
                    <widget w-tag="app-components-input">{placeHolder:"输入名称",style:"border:1px solid #eee;"}</widget>
                </div>
                <div w-class="guessTab" style="flex:1 0 0;">
                    <span style="margin-right:10px;">展示位置编号</span>
                    <widget w-tag="app-components-input">{placeHolder:"输入位置编号",style:"border:1px solid #eee;"}</widget>
                </div>
            </div>
        </div>
    </div>

    {{%===========================专区分类===========================}}
    <div w-class="bannerBox">
        <div w-class="tableTitle">专区分类<div w-class="btn" on-tap="addBtn">添加</div></div>
        <div w-class="itemContent">
            <div w-class="guessTab">
                <span style="margin-right:10px;">分类</span>
                <widget w-tag="app-components-input">{placeHolder:"输入名称",style:"border:1px solid #eee;"}</widget>
                <div w-class="btn1" on-tap="delet">删除</div>
            </div>
            <div w-class="guessTab">
                <span style="margin-right:10px;">分类</span>
                <widget w-tag="app-components-input">{placeHolder:"输入名称",style:"border:1px solid #eee;"}</widget>
                <div w-class="btn1" on-tap="delet">删除</div>
            </div>
            <div w-class="guessTab">
                <span style="margin-right:10px;">分类</span>
                <widget w-tag="app-components-input">{placeHolder:"输入名称",style:"border:1px solid #eee;"}</widget>
                <div w-class="btn1" on-tap="delet">删除</div>
            </div>
            <div w-class="guessTab">
                <span style="margin-right:10px;">分类</span>
                <widget w-tag="app-components-input">{placeHolder:"输入名称",style:"border:1px solid #eee;"}</widget>
                <div w-class="btn1" on-tap="delet">删除</div>
            </div>
        </div>
    </div>

</div>