<div class="new-page" w-class="page" ev-detail-back="detailBack" on-tap="close">
    <div w-class="narBar">
        <div on-tap="cancel">供应商配置</div>
        <div>></div>
        <div>{{it.pageTitle}}</div>
    </div>
    <div w-class="searchBox">
        <div w-class="tableTitle">基本信息</div>
        <div w-class="filterBox1" style="flex-direction: row; flex-wrap: wrap;align-items: center;">
                <div w-class="item">
                    <div w-class="title">供应商名称</div>
                    <div w-class="input" ev-input-change="supplierChange" style="width: 464px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.style?it.currentData[1][0]:""}} }</widget>
                    </div>
                </div>
                <div w-class="item">
                    <div w-class="title">手机号码</div>
                    <div w-class="input" ev-input-change="inputChange({{2}},e)" style="width: 464px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.style?it.currentData[2]:""}}}</widget>
                    </div>
                </div>
                <div w-class="item">
                    <div w-class="title">描述备注</div>
                    <div w-class="input" ev-input-change="textareaChange" style="width: 481px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.style?it.currentData[1][2]:""}}}</widget>
                    </div>
                </div>

        </div>
    </div>
    <div w-class="searchBox_1">
        <div w-class="tableTitle">运费信息</div>
        <div w-class="filterBox">
            <div w-class="productName">
                <div w-class="title">运费类型</div>
                <div style="display:inline-block;height: 50px;margin-left: 20px;" ev-selected="filterTimeType">
                    <widget w-tag="app-components-simpleFilter1">{options:{{it.statusType}},activeIndex:{{it.statusTypeActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
                </div>
            </div>
            <div w-class="productName">
                <div style=";margin-left: 30px;" ev-input-file="importTransport"><app-components-inputFileBtn>{text:"导入表单"}</app-components-inputFileBtn></div>
                <div style="line-height: 31px;margin-left: 30px;">最新导入时间：{{it.time}}</div>
                <div w-class="searchleft" on-tap="userForm">应用表单</div>
                <div w-class="searchleft" on-tap="exportForm">导出表单</div>
            </div>
        </div>
        <div ev-table-detail="goDetail">
            <div w-class="tableTitle">邮费列表</div>
            <widget w-tag="app-components-table">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false,inlineBtn2:{{it.btn2}},inlineBtn1:{{it.btn1}} }</widget>
        </div>
    </div>
    <div w-class="ctr">
        <div w-class="btn" on-tap="cancel">取消</div>
        <div w-class="btn" on-tap="save">保存</div>
    </div>
</div>