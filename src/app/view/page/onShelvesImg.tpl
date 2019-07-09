<div>
    {{if it.style==true}}
    <div w-class="searchBox">
        <div w-class="onShelvesTitle">基本信息</div>
        <div w-class="searchItem" style="height:264px;flex-direction: row;flex-wrap: wrap;">
            {{for i,v of it.inputTitle}}
                <div w-class="item1">
                    <div w-class="title">{{v}}</div>
                    <div w-class="input" ev-input-change="inputChange({{i}},e)" style="width: 300px;margin-left: 46px;">
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[i]}} }</widget>
                    </div>
                </div>
            {{end}}
            <div w-class="item1">
                <div w-class="title">地区ID</div>
                <div style="display:inline-block;height: 50px;margin-left: 20px;" ev-selected="areaIdChange">
                    <widget w-tag="app-components-simpleFilter1">{options:{{it.areaId}},activeIndex:{{it.areaIdActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
                </div>
            </div>
            <div w-class="item1">
                <div w-class="title">一级分类</div>
                <div style="display:inline-block;height: 50px;margin-left: 20px;" ev-selected="classTypeChange1">
                    <widget w-tag="app-components-simpleFilter1">{options:{{it.classType1}},activeIndex:{{it.classTypeOneActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
                </div>
                <div w-class="title">二级分类</div>
                <div style="display:inline-block;height: 50px;margin-left: 20px;" ev-selected="classTypeChange2">
                    <widget w-tag="app-components-simpleFilter1">{options:{{it.classType2}},activeIndex:{{it.classTypeTwoActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
                </div>
            </div>
            <div w-class="item1">
                <div w-class="title">是否保税区产品</div>
                <div style="display:inline-block;height: 50px;margin-left: 20px;" ev-selected="bondedChange">
                    <widget w-tag="app-components-simpleFilter1">{options:{{it.bonded}},activeIndex:{{it.bondedActiveIndex}},expandIndex:{{it.expandIndex}} }</widget>
                </div>
            </div>
            {{if it.bondedActiveIndex}}
            <div w-class="item1">
                <div w-class="title">税费</div>
                <div w-class="input" ev-input-change="taxChange" style="width: 300px;margin-left: 46px;">
                    <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.tax}} }</widget>
                </div>
            </div>
            {{end}}
        </div>
    </div>
    <div w-class="searchBox">
        <div w-class="onShelvesTitle">基本信息</div>
        <div w-class="bodyTitle" style="height: 57px;align-items: center;">
            <div w-class="title">图片路径</div>
            <div w-class="input" ev-input-change="inputPathChange" style="width: 300px;margin-left: 46px;">
                <widget w-tag="app-components-input">{placeHolder:"请输入图片路径用'/'隔开",input:{{it.path}} }</widget>
            </div>
        </div>
        <div w-class="updataImg">
            <div w-class="shopImg">
                <div>缩略图</div>
                <div w-class="img_info">
                    <div w-class="img_item" ev-input-file="updataImg">
                        <app-components-inputImg>{path:{{it.path}}}</app-components-inputImg>
                    </div>
                </div>
            </div>
            <div w-class="shopImg">
                <div>主图({{it.mainPicture.length}}/5)</div>
                <div w-class="img_info">
                    {{for i,v of it.mainPictureList}}
                        <div w-class="img_item" ev-input-file="updataImgMain({{i}},e)">
                            <app-components-inputImg>{path:{{it.path}}}</app-components-inputImg>
                        </div>
                    {{end}}
                </div>
            </div>
            <div w-class="shopImg">
                <div>详情图({{it.infoPicture.length}}/20)</div>
                <div w-class="img_info">
                    {{for i,v of it.infoPictureList}}
                        <div w-class="img_item" ev-input-file="updataImgInfo({{i}},e)">
                            <app-components-inputImg>{path:{{it.path}}}</app-components-inputImg>
                        </div>
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
                    <div w-class="shopId" style="margin-left: 93px;">商品名称（ID）</div>
                    <div w-class="shopName" style="flex:1;">{{v[2]}}</div>
                    <div w-class="shopType" style="flex:1;">
                        <span w-class="discount">供应商（ID）</span>
                        <span style="margin-left:12px;">{{v[0]}}</span>
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
    <div w-class="ctr">
        <div w-class="btn" on-tap="gotoShop">取消</div>
        <div w-class="btn" on-tap="next">确认</div>
    </div>
</div>
