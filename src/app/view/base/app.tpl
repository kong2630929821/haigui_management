<div style="width:100%;height:100%;display: flex;">
    <form action="" style="position:absolute;top:0;left:0;right:0;bottom:0;background: #fff;z-index: 999;">
		<input type="file" on-change="imFreight"/><div>导入运费</div>
		<input type="file" on-change="imGoodsCate"/><div>导入分类</div>
		<input type="file" on-change="imGoods"/><div>导入商品</div>
		<input type="file" on-change="imSupplier"/><div>导入供应商</div>
		<input type="file" on-change="imArea"/><div>导入地区信息</div>
		<input type="file" on-change="imBrand"/><div>导入品牌信息</div>
		<input type="file" on-change="imInventory"/><div>导入库存信息</div>
	</form>	
</div>

<div w-class="new_page" style="display:flex;flex-direction:column;">
    <div w-class="base">
        <div w-class="left">
            <div w-class="logo">商城管理系统</div>
            {{for i,v of it.pageList}}
            <div w-class="item {{it.activePage.page === v.page?'active':''}}" on-tap="changePage({{i}})">
                <img w-class="icon-left" src="../../res/images/{{v.img}}" alt=""/>
                <span style="flex:1 0 0;">{{v.name}}</span>
                <img w-class="icon-right" src="../../res/images/arrowRight.png" alt=""/>
            </div>
            {{end}}
        </div>
        <div w-class="right">
            <div w-class="rightTop">
                <div w-class="browse-location">
                    <img w-class="icon-home" src="../../res/images/home.png" alt=""/>
                    <span w-class="path">首页>{{it.activePage.name}}</span>
                </div>
                <div w-class="account">
                    <div w-class="avatarBox">
                        <img w-class="avatar" src="../../res/images/user_gray.png" alt=""/>
                    </div>
                    <img w-class="accountDown" src="../../res/images/arrowDown.png" alt=""/>
                </div>
            </div>

            {{for i,v of it.pageList}}
            <div style="{{it.activePage.page === v.page?'display: block;':'display: none;'}}" w-class="rightContent">
                <widget w-tag="management-client-app-view-{{v.page}}"></widget> 
            </div>
            {{end}}
            
        </div>
    </div>
</div>
