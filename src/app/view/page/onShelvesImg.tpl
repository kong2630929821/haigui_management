<div>
    {{if it.style==true}}
    <div w-class="searchBox">
        <div w-class="onShelvesTitle">基本信息</div>
        <div w-class="searchItem" style="height:171px;justify-content: space-around;">
            <div w-class="shopName_Box">
                <div w-class="title">商品名称</div>
                <div w-class="input" ev-input-change="sku_nameChange" style="width: 724px;margin-left: 46px;">
                    <widget w-tag="app-components-input">{placeHolder:"请输入"}</widget>
                </div>
            </div>
            <div w-class="inputBox">
                <div w-class="item1">
                    <div w-class="title">折扣价</div>
                    <div w-class="input" ev-input-change="supplierChange" style="width: 464px;margin-left: 46px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入"}</widget>
                    </div>
                </div>
                <div w-class="item1">
                    <div w-class="title">所属分类</div>
                    <div style="display:inline-block;height: 50px;margin-left: 20px;" ev-selected="filterTimeType">
                        <widget w-tag="app-components-simpleFilter1">{options:{{it.timeType}},activeIndex:{{it.timeTypeActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
                    </div>
                    <div w-class="input" ev-input-change="sku_nameChange" style="width: 305px;margin-left: 46px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入"}</widget>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div w-class="searchBox">
        <div w-class="onShelvesTitle">基本信息</div>
        <div w-class="bodyTitle">
            <div w-class="shopId" style="margin-left: 93px;">商品名称（ID）</div>
            <div w-class="shopName">2018款怀集系列见覅拉尔金属怀旧连衣裙-红色（1515）</div>
            <div w-class="shopType">
                <span w-class="discount">是否打折</span>
                <span style="margin-left:12px;">9.5折</span>
            </div>
        </div>
        <div w-class="updataImg">
            <div w-class="shopImg">
                <div>商品封面图(4/5)</div>
                <div w-class="img_info">
                    {{for i,v of [1,2,3,4,5]}}
                        <div w-class="img_item">
                            <div ev-input-file="importTransport"><app-components-inputFileBtn></app-components-inputFileBtn></div>
                        </div>
                    {{end}}
                </div>
            </div>
            <div w-class="shopImg">
                <div>商品详情图（12/20）</div>
                <div w-class="img_info">
                    {{for i,v of [1,2,3,4,5,1,1,1,1,1]}}
                        <div w-class="img_item"></div>
                    {{end}}
                </div>
            </div>
            <div w-class="shopImg">
                <div>商品轮播（12/20）</div>
                <div w-class="img_info">
                    {{for i,v of [1,2,3,4,5]}}
                        <div w-class="img_item"></div>
                    {{end}}
                </div>
            </div>
        </div>
    </div>
    <div w-class="searchBox">
        <div w-class="onShelvesTitle">已选产品</div>
        <div w-class="searchItem" style="height:356px;overflow: auto;">
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
                        <div w-class="product_info" style="align-items: center;">
                            <div>差价：</div>
                            <div>
                                <div w-class="input" ev-input-change="spread(e,{{i}})" style="width: 124px;margin-left: 46px;height: 30px;">
                                    <widget w-tag="app-components-input">{placeHolder:"请输入"}</widget>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {{end}}
        </div>
    </div>
    {{else}}
    <div w-class="searchBox">
            <div w-class="onShelvesTitle">基本信息</div>
            <div w-class="searchItem" style="height:286px;overflow: auto;">
                <div w-class="prductTitle">
                    <div w-class="shopId" style="margin-left: 25px;">商品名称（ID）</div>
                    <div w-class="shopName">2018款怀集系列见覅拉尔金属怀旧连衣裙-红色（1515）</div>
                    <div w-class="shopType">
                        <span w-class="discount">所属分类</span>
                        <span style="margin-left:12px;">服饰-上装</span>
                    </div>
                    <div w-class="shopType">
                        <span w-class="discount">折扣</span>
                        <span style="margin-left:12px;">无折扣</span>
                    </div>
                </div>
                {{for i,v of [1,1,1]}}
                <div w-class="item">
                    <div w-class="bodyTitle">
                        <div w-class="shopId" style="margin-left: 25px;">商品名称（ID）</div>
                        <div w-class="shopName">2018款怀集系列见覅拉尔金属怀旧连衣裙-红色（1515）</div>
                        <div w-class="shopType">
                            <span w-class="discount">供应商（ID）</span>
                            <span style="margin-left:12px;">附加类水果（15511）</span>
                        </div>
                        <div w-class="shopType">
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
                    </div>
                </div>
                {{end}}
            </div>
        </div>
        <div w-class="searchBox">
            <div w-class="onShelvesTitle">基本信息</div>
            <div w-class="bodyTitle">
                <div w-class="shopId" style="margin-left: 93px;">商品名称（ID）</div>
                <div w-class="shopName">2018款怀集系列见覅拉尔金属怀旧连衣裙-红色（1515）</div>
                <div w-class="shopType">
                    <span w-class="discount">是否打折</span>
                    <span style="margin-left:12px;">9.5折</span>
                </div>
            </div>
            <div w-class="updataImg">
                <div w-class="shopImg">
                    <div>商品封面图(4/5)</div>
                    <div w-class="img_info">
                        {{for i,v of [1,2,3,4,5]}}
                            <div w-class="img_item"></div>
                        {{end}}
                    </div>
                </div>
                <div w-class="shopImg">
                    <div>商品详情图（12/20）</div>
                    <div w-class="img_info">
                        {{for i,v of [1,2,3,4,5,1,1,1,1,1]}}
                            <div w-class="img_item"></div>
                        {{end}}
                    </div>
                </div>
                <div w-class="shopImg">
                    <div>商品轮播（12/20）</div>
                    <div w-class="img_info">
                        {{for i,v of [1,2,3,4,5]}}
                            <div w-class="img_item"></div>
                        {{end}}
                    </div>
                </div>
            </div>
        </div>
        <div w-class="searchBox">
            <div w-class="onShelvesTitle">商品展示</div>
            <div w-class="showShop">
                <div w-class="title">所属分类</div>
                <div style="display:inline-block;height: 50px;margin-left: 20px;" ev-selected="filterTimeType">
                    <widget w-tag="app-components-simpleFilter1">{options:{{it.timeType}},activeIndex:{{it.timeTypeActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
                </div>
            </div>
        </div>
    {{end}}
</div>
