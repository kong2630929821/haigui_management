<div w-class="page" ev-detail-back="detailBack">
    <div w-class="tabRow">
        <div w-class="search" on-tap="search">导入Excel</div>
    </div>

    <div ev-import-file="imExcel">
        <widget w-tag="app-components-importTable">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false,inputFile:"选择" }</widget>
    </div>
</div>