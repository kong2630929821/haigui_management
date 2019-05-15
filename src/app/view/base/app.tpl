<div w-class="new_page" style="display:flex;flex-direction:column;">
	<div w-class="base">
		<div w-class="left">
			<div w-class="logo">商城管理系统</div>
			{{for i,v of it.pageList}}
            <div w-class="item {{it.activePage.page === v.page?'active':''}}" on-tap="changePage({{i}})">
                <span style="flex:1 0 0;">{{v.name}}</span>
            </div>
            {{end}}
		</div>
		<div w-class="right">
			<div w-class="rightTop">
				<div w-class="browse-location">
                    <img w-class="icon-home" src="../../../res/images/home.png" alt=""/>
                    <span w-class="path">首页>{{it.activePage.name}}</span>
                </div>
			</div>
			<form style="top:0;left:0;right:0;">
				导入运费<input type="file" on-change="imFreight"/><div></div>
				导入分类<input type="file" on-change="imGoodsCate"/><div></div>
				导入商品<input type="file" on-change="imGoods"/><div></div>
				导入供应商<input type="file" on-change="imSupplier"/><div></div>
				导入地区信息<input type="file" on-change="imArea"/><div></div>
				导入品牌信息<input type="file" on-change="imBrand"/><div></div>
				导入库存信息<input type="file" on-change="imInventory"/><div></div>
			</form>
			<div style="top:0;left:0;right:0;"> 
				<button on-click="select_supplier">获取所有有未发货订单的供应商</button>
				<select on-change="showSupplier">
					{{for i,v of it.contentList}}
						<option value="{{v}}">{{v}}</option>
					{{end}}
				</select>
				<button on-click="exSupplier">导出订单</button>
				<button on-click="getReturnGoods">获取用户退货记录</button>
				<div></div>导入运单<input type="file" on-change="imTransport"/><div></div>
				<table style='border:1px solid black;color:#789'>
					{{for i,v of it.supplierList}}
						<tr>
							{{for i1,v1 of v}}
								<td>{{v1}}</td>
							{{end}}
						</tr>
					{{end}}
				</table>
			</div>
			
		</div>
	</div>
</div>

