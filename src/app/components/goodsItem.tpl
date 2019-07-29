<div w-class="goodsItem">
    <div w-class="base">
        <img src="{{it.mallImagPre}}{{it.datas.img[0]?it.datas.img[0][0]:''}}" w-class="img"/>
        <div w-class="baseItem" style="width:250px">【商品名称】{{it.datas.name}}</div>
        <div w-class="baseItem">【商品ID】{{it.datas.id}}</div>
        <div w-class="baseItem">【商品类型】{{it.datas.shopType}}</div>
        <div w-class="baseItem">【品牌ID】{{it.datas.brand}}</div>
        <div w-class="baseItem" style="width:250px">【分类】{{it.datas.typeName}}</div>
        <div w-class="baseItem">【税费】{{it.datas.tax}}</div>
        <div w-class="baseItem">【折扣】{{it.datas.discount}}</div>
        <div w-class="baseItem">【上架时间】{{it.datas.onSaleTime}}</div>
      
        {{if it.datas.state==0}}
        <div w-class="baseItem" style="color:red">已下架</div>
        {{else}}
        <div w-class="baseItem" style="color:#21811C;">已上架</div>
        {{end}}

        {{if it.inFlag==1}}
            <div w-class="btns">
                {{if it.datas.state==0}}
                <div w-class="btn" on-tap="shelf(e,1)" on-down="onShow">上架</div>
                <div w-class="btn" on-tap="change" on-down="onShow">编辑</div> 
                {{elseif it.datas.state==1}}
                <div w-class="btn" on-tap="shelf(e,0)" on-down="onShow">下架</div>
                {{end}}
                <div w-class="btn" on-tap="goDetail" on-down="onShow">详情</div>
            </div>

        {{elseif it.inFlag==2}}
            {{if it.bindUser}}
            <div w-class="baseItem">【已绑定ID】{{it.bindUser}}</div>
            {{else}}
            <div w-class="btn" on-tap="bindUser" style="width:150px;">绑定邀请码</div>
            {{end}}

        {{else}}
            {{if it.selected}}
            <div w-class="btn" style="background:#ce2525" on-tap="selectGoods" on-down="onShow">取消</div>
            {{else}}
            <div w-class="btn" on-tap="selectGoods" on-down="onShow">选择</div>
            {{end}}
        {{end}}
    </div>

    {{for i,v of it.datas.skus}}
    <div w-class="content">
        {{for j,r of v}}
        <div w-class="contentItem">{{r}}</div>
        {{end}}
    </div>
    {{end}}

</div>