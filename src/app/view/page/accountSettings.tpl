<div w-class="page" ev-detail-back="detailBack" on-tap="close">
    <div w-class="searchBox">
        <div w-class="tableTitle">账号管理</div>
        <div w-class="filterBox">
  
        </div>
    </div>
    <div w-class="shopSum">共{{it.sum}}条记录</div> 
    <div ev-table-detail="goDetail">
        <div w-class="tableTitle">账号列表</div>
        <widget w-tag="app-components-table">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false,auto:true,inlineBtn1:"编辑",inlineBtn2:"删除"}</widget>
    </div>
    <div w-class="ctroller">
        <div w-class="searchleft" on-tap="exportUser">导出全部信息</div>
        <div w-class="searchleft" on-tap="addUser">添加账号</div>
        <div ev-changeCurrent="pageChange" w-class="pagination" ev-perPage="perPage">
            <widget w-tag="app-components-pagination">{pages:{{Math.ceil(it.sum/ it.perPage)}},currentIndex:{{it.currentIndex}},filterShow:true }</widget>
        </div>
    </div>
</div>