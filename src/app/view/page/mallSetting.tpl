<div w-class="page">
    {{if !it.showEdit}}
    {{%===========================头部banner专区===========================}}
    <div w-class="bannerBox">
        <div w-class="tableTitle">商城主页banner<div w-class="btn" on-tap="addBtn">添加</div></div>
        <div w-class="item">
            <div w-class="itemTitle">
                <span w-class="tab">图片</span>
                <span w-class="tab">跳转专区ID</span>
                <span w-class="tab">操作</span>
            </div>
            <div w-class="itemContent">
                <div w-class="tab inputBox">
                    <widget w-tag="app-components-img">{imgURL:"../res/images/logo.png",width:"220px",height:"120px"}</widget>
                </div>
                <span w-class="tab">1353</span>
                <span w-class="tab">
                    <div w-class="btn1" on-tap="edit">编辑</div>
                </span>
            </div>
        </div>
        {{if it.isEdit}}
        <div w-class="item">
            <div w-class="itemTitle">
                <span w-class="tab">图片</span>
                <span w-class="tab">跳转专区ID</span>
                <span w-class="tab">操作</span>
            </div>
            <div w-class="itemContent">
                <div w-class="tab inputBox">
                    <widget w-tag="app-components-inputImg"></widget>
                </div>
                <span w-class="tab">
                    <widget w-tag="app-components-input">{placeHolder:"输入专区ID",style:"border:1px solid #eee;"}</widget>
                </span>
                <span w-class="tab">
                    <div w-class="btn1" on-tap="cancel">取消</div>
                    <div w-class="btn1" on-tap="confirm">保存</div>
                </span>
            </div>
        </div>
        {{end}}
    </div>

    {{%===========================猜你喜欢专区===========================}}
    <div w-class="bannerBox">
        <div w-class="tableTitle">猜你喜欢配置</div>
        <div w-class="itemContent">
            <div w-class="guessTab">
                <span style="margin-right:10px;">选择规则</span>
                <widget w-tag="app-components-simpleFilter">{options:["最新上架","最热商品"]}</widget>
            </div>
            <div w-class="guessTab">
                <span style="margin-right:10px;">展示数量</span>
                <widget w-tag="app-components-input">{placeHolder:"输入数量",style:"border:1px solid #eee;",itype:"integer"}</widget>
                <span>（上限200）</span>
            </div>
            <div w-class="tab">
                <div w-class="btn1" on-tap="confirm">保存</div>
            </div>
        </div>
    </div>
    {{%===========================单链专区设置===========================}}
    <div w-class="bannerBox">
        <div w-class="tableTitle">单链专区设置<div w-class="btn" on-tap="addBtn">添加</div></div>
        <div w-class="item">
            <div w-class="itemTitle" style="margin-left:10px;">单链专区:&nbsp;1</div>
            <div w-class="itemContent">
                <div w-class="guessTab">
                    <span style="margin-right:10px;">专区封面图</span>
                    <widget w-tag="app-components-img">{imgURL:"../res/images/logo.png",width:"220px",height:"120px"}</widget>
                </div>
                <div w-class="guessTab">
                    <span style="margin-right:10px;">专区名称</span>
                    <widget w-tag="app-components-input">{placeHolder:"输入名称",style:"border:1px solid #eee;"}</widget>
                </div>
                <div w-class="guessTab">
                    <span style="margin-right:10px;">商品ID</span>
                    <widget w-tag="app-components-input">{placeHolder:"输入ID",style:"border:1px solid #eee;"}</widget>
                </div>
                <div w-class="guessTab">
                    <span style="margin-right:10px;">展示位置编号</span>
                    <span>4</span>
                    <widget w-tag="app-components-input">{placeHolder:"输入数量",style:"border:1px solid #eee;"}</widget>
                </div>
                <div w-class="guessTab">
                    <span style="margin-right:10px;">最后一次修改时间</span>
                    <span>2019.7.8 12:20:20</span>
                </div>
                <div w-class="tab">
                    <div w-class="btn1" on-tap="confirm">保存</div>
                </div>
            </div>
        </div>
    </div>

    {{%===========================聚合专区设置===========================}}
    <div w-class="bannerBox">
        <div w-class="tableTitle">聚合页专区设置<div w-class="btn" on-tap="addBtn">添加</div></div>
        <div w-class="item">
            <div w-class="itemTitle" style="margin-left:10px;">聚合页专区:&nbsp;1</div>
            <div w-class="itemContent">
                <div w-class="guessTab">
                    <span style="margin-right:10px;">专区封面图</span>
                    <widget w-tag="app-components-img">{imgURL:"../res/images/logo.png",width:"220px",height:"120px"}</widget>
                </div>
                <div w-class="guessTab">
                    <span style="margin-right:10px;">专区头图</span>
                    <widget w-tag="app-components-img">{imgURL:"../res/images/logo.png",width:"220px",height:"120px"}</widget>
                </div>
                <div w-class="guessTab">
                    <span style="margin-right:10px;">专区名称</span>
                    <span>专区名称</span>
                </div>
                <div w-class="tab">
                    <div w-class="btn1" on-tap="goEdit">编辑</div>
                    <div w-class="btn1" on-tap="delet">删除</div>
                </div>
                <div w-class="guessTab">
                    <span style="margin-right:10px;">商品总计</span>
                    <span>13</span>
                </div>
                <div w-class="guessTab">
                    <span style="margin-right:10px;">展示位置编号</span>
                    <span>4</span>
                </div>
                <div w-class="guessTab">
                    <span style="margin-right:10px;">最后一次修改时间</span>
                    <span>2019.7.8 12:20:20</span>
                </div>
            </div>
        </div>
    </div>

    {{else}}
    <div ev-detail-back="closeEdit">
        <widget w-tag="app-view-page-mallSettingEdit"></widget>
    </div>
    {{end}}
</div>