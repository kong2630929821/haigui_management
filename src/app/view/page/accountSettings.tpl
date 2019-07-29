<div w-class="page" ev-detail-back="detailBack" on-tap="close" style="height:100%">
    <div w-class="shopSum">共{{it.sum}}条记录</div> 
    <div ev-table-detail="goDetail">
        <div w-class="tableTitle">账号列表</div>
        <widget w-tag="app-components-table">{datas: {{it.showDataList}},title:{{it.showTitleList}},needCheckBox:false,auto:true,inlineBtn1:"编辑",inlineBtn2:"删除"}</widget>
    </div>
    <div w-class="ctroller">
        <div w-class="searchleft" on-tap="exportUser" on-down="onShow">导出全部信息</div>
        <div w-class="searchleft" on-tap="addUser" on-down="onShow">添加账号</div>
        <div ev-changeCurrent="pageChange" w-class="pagination" ev-perPage="perPage" ev-expand="expand">
            <widget w-tag="app-components-pagination">{pages:{{Math.ceil(it.sum/ it.perPage)}},filterShow:true,currentIndex:{{it.currentIndex}},expand:{{it.expandIndex}},numberCheckActiveIndex:{{it.perPageIndex}} }</widget>
        </div>
    </div>
</div>