<div style="width:100%;height:100%;display: flex;">
		<form style="top:0;left:0;right:0;height:300;background: #fff;">
			导入运费<input type="file" on-change="imFreight"/><div></div>
			导入分类<input type="file" on-change="imGoodsCate"/><div></div>
			导入商品<input type="file" on-change="imGoods"/><div></div>
			导入供应商<input type="file" on-change="imSupplier"/><div></div>
			导入地区信息<input type="file" on-change="imArea"/><div></div>
			导入品牌信息<input type="file" on-change="imBrand"/><div></div>
			导入库存信息<input type="file" on-change="imInventory"/><div></div>
		</form>
		<div style="top:0;left:0;right:0;height:300;background: #156"> 
			<button on-click="select_supplier">获取所有有未发货订单的供应商</button>
			<select on-change="showSupplier">
				{{for i,v of it.pageList}}
					<option value={{v}}>{{v}}</option>
				{{end}}
			</select>
			<button on-click="showSupplier">查询</button>
			<button on-click="exSupplier">导出订单</button>
			<div></div>导入运单<input type="file" on-change="imTransport"/><div></div>
			{{for i,v of it.supplierList}}
				<div>{{v}}</div>
			{{end}}
		</div>
</div>

