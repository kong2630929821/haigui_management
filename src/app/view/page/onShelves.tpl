<div class="new-page" w-class="page" ev-detail-back="detailBack" on-tap="close">
    <div w-class="narBar">
        <div on-tap="gotoShop">商品库</div>
        <div>></div>
        <div>上架商品</div>
    </div>
    {{if it.onShelvesType==0}}
    {{ if it.selectData.length}}
    <div w-class="searchBox">
        <div w-class="onShelvesTitle">已选产品</div>
        <div w-class="searchItem" style="height:356px">
            {{for i,v of it.selectData}}
            <div w-class="item">
                <div w-class="bodyTitle">
                    <div w-class="shopId" style="flex:1;margin-left: 93px;">商品名称（ID）</div>
                    <div w-class="shopName" style="flex:1;">{{v[2]}}</div>
                    <div w-class="shopType" style="flex:1;">
                        <span w-class="discount">供应商（ID）</span>
                        <span style="margin-left:12px;">{{v[0]}}</span>
                    </div>
                    <div w-class="shopType" style="flex:1;">
                        <span w-class="discount">品牌</span>
                        <span style="margin-left:12px;">巴黎</span>
                    </div>
                </div>
                <div w-class="itemBox">
                    <div w-class="productList">
                        {{for index,item of v}}
                        <div w-class="product_info">
                            <div>{{it.showDataTitle[index]}}：</div>
                            <div>{{item}}</div>
                        </div>
                        {{end}}
                    </div>
                    <div w-class="btnGroup">
                        <div w-class="btn" on-tap="remove({{i}})">移除</div>
                    </div>
                </div>
            </div>
            {{end}}
        </div>
    </div>
    {{end}}
    <div w-class="searchBox">
        <div w-class="onShelvesTitle">选择产品</div>
        <div w-class="search">
            <div w-class="input" ev-input-change="inputChange" style="width: 724px;">
                <widget w-tag="app-components-input">{placeHolder:"SKU/产品ID/产品名称" }</widget>
            </div>
            <div w-class="btn" on-tap="searchProduct">查询</div>
        </div>
        {{if it.searchData.length}}
        <div w-class="searchItem">
            {{for i,v of it.searchData}}
                <div w-class="item">
                <div w-class="bodyTitle">
                    <div w-class="shopId" style="flex:1;margin-left: 93px;">产品名称（ID）</div>
                    <div w-class="shopName" style="flex:1;">{{v[2]}}</div>
                    <div w-class="shopType" style="flex:1;">
                        <span w-class="discount">供应商（ID）</span>
                        <span style="margin-left:12px;">{{v[0]}}</span>
                    </div>
                    <div w-class="shopType" style="flex:1;">
                        <span w-class="discount">品牌</span>
                        <span style="margin-left:12px;">XXXXXX</span>
                    </div>
                </div>
                <div w-class="itemBox">
                    <div w-class="productList">
                        {{for index,item of v}}
                        <div w-class="product_info">
                            <div>{{it.showDataTitle[index]}}：</div>
                            <div style="margin-left:15px">{{item}}</div>
                        </div>
                        {{end}}
                    </div>
                    <div w-class="btnGroup">
                        <div w-class="btn" on-tap="check({{i}})">选择</div>
                    </div>
                </div>
            </div>
            {{end}}
        </div>
        {{end}}
    </div>
    {{end}}
    {{if it.onShelvesType==1}}
        <div ev-change-showProduct="showProduct">
            <widget w-tag="app-view-page-onShelvesImg">{selectData:{{it.selectData}} }</widget>
        </div>
    {{end}}
    <div w-class="ctr">
        <div w-class="btn" on-tap="gotoShop">取消</div>
        <div w-class="btn {{it.selectData.length?'':'btn1'}}" on-tap="next">下一步</div>
    </div>
</div>