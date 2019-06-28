<div class="new-page" w-class="page" ev-detail-back="detailBack" on-tap="close">
    <div w-class="narBar">
        <div on-tap="gotoProduct">商品库</div>
        <div>></div>
        <div>上架商品</div>
    </div>
    {{ if 1==0}}
    <div w-class="searchBox">
        <div w-class="onShelvesTitle">已选产品</div>
        <div w-class="searchItem" style="height:356px">
            {{for i,v of [1,1,1]}}
            <div w-class="item">
                <div w-class="bodyTitle">
                    <div w-class="shopId" style="flex:1;margin-left: 93px;">商品名称（ID）</div>
                    <div w-class="shopName" style="flex:1;">2018款怀集系列见覅拉尔金属怀旧连衣裙-红色（1515）</div>
                    <div w-class="shopType" style="flex:1;">
                        <span w-class="discount">供应商（ID）</span>
                        <span style="margin-left:12px;">附加类水果（15511）</span>
                    </div>
                    <div w-class="shopType" style="flex:1;">
                        <span w-class="discount">品牌</span>
                        <span style="margin-left:12px;">巴黎</span>
                    </div>
                </div>
                <div w-class="itemBox">
                    <div w-class="productList">
                        {{for i,v of [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}}
                        <div w-class="product_info">
                            <div>sku</div>
                            <div>15484848848</div>
                        </div>
                        {{end}}
                    </div>
                    <div w-class="btnGroup">
                        <div w-class="btn">移除</div>
                    </div>
                </div>
            </div>
            {{end}}
        </div>
    </div>
    {{end}}
    {{if 0==1}}
    <div w-class="searchBox">
        <div w-class="onShelvesTitle">选择产品</div>
        <div w-class="search">
            <div w-class="input" ev-input-change="skuChange" style="width: 724px;">
                <widget w-tag="app-components-input">{placeHolder:"请输入" }</widget>
            </div>
            <div w-class="btn">查询</div>
        </div>
        <div w-class="searchItem">
            {{for i,v of [1,1,1]}}
            <div w-class="item">
                <div w-class="bodyTitle">
                    <div w-class="shopId" style="flex:1;margin-left: 93px;">商品名称（ID）</div>
                    <div w-class="shopName" style="flex:1;">2018款怀集系列见覅拉尔金属怀旧连衣裙-红色（1515）</div>
                    <div w-class="shopType" style="flex:1;">
                        <span w-class="discount">供应商（ID）</span>
                        <span style="margin-left:12px;">附加类水果（15511）</span>
                    </div>
                    <div w-class="shopType" style="flex:1;">
                        <span w-class="discount">品牌</span>
                        <span style="margin-left:12px;">巴黎</span>
                    </div>
                </div>
                <div w-class="itemBox">
                    <div w-class="productList">
                        {{for i,v of [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}}
                        <div w-class="product_info">
                            <div>sku</div>
                            <div>15484848848</div>
                        </div>
                        {{end}}
                    </div>
                    <div w-class="btnGroup">
                        <div w-class="btn">选择</div>
                    </div>
                </div>
            </div>
            {{end}}
        </div>
    </div>
    {{end}}
    <div w-class="searchBox">
        <div w-class="onShelvesTitle">基本信息</div>
        <div w-class="searchItem" style="height:356px">
           <div w-class="shopName_Box">
                <div w-class="title">商品名称</div>
                <div w-class="input" ev-input-change="sku_nameChange" style="width: 724px;">
                    <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[2]}},disabled:{{it.status==1?true:false}}}</widget>
                </div>
           </div>
           <div>
                <div w-class="title">保质期</div>
                <div style="display:inline-block;height: 50px;margin-left: 20px;" ev-selected="filterTimeType">
                    <widget w-tag="app-components-simpleFilter1">{options:{{it.timeType}},activeIndex:{{it.timeTypeActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
                </div>
                <div w-class="input" ev-input-change="sku_nameChange" style="width: 305px;">
                    <widget w-tag="app-components-input">{placeHolder:"请输入"}</widget>
                </div>
           </div>
        </div>
    </div>
    <div w-class="ctr">
        <div w-class="btn" on-tap="gotoProduct">取消</div>
        <div w-class="btn" on-tap="saveProduct">下一步</div>
    </div>
</div>