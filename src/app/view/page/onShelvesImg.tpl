<div on-tap="close">
    <div w-class="narBar">
        {{if !it.style}}
        <div on-tap="gotoShop" on-down="onShow">商品库</div>
        <div>></div>
        <div>修改商品</div>
        {{end}}
        {{if it.disable}}
        <div on-tap="gotoShop" on-down="onShow">商品库</div>
        <div>></div>
        <div>商品详情</div>
        {{end}}
    </div>
    <div w-class="searchBox">
        <div w-class="onShelvesTitle">基本信息</div>
        <div w-class="searchItem1">
            {{for i,v of it.inputTitle}}
                <div w-class="item1">
                    <div w-class="title">{{v}}</div>
                    <div w-class="input" ev-input-change="inputChange({{i}},e)" style="width: 382px;margin-left: 20px;">
                        {{%===============================编辑时商品ID不能修改=============================}}
                        <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.data[i]}},disabled:{{i==0 && !it.style?true :it.disable}},itype:{{i==1 || i==6?'text':'number'}} }</widget>
                    </div>
                </div>
            {{end}}
            <div w-class="item1">
                <div w-class="title">国家</div>
                <div style="display:inline-block;height: 50px;margin-left: 2px;" ev-selected="areaIdChange" ev-expand="expand({{0}},e)">
                    <widget w-tag="app-components-simpleFilter1">{options:{{it.areaId}},activeIndex:{{it.areaIdActiveIndex}},expand:{{it.expandIndex[0]}},disabled:{{it.disable}} }</widget>
                </div>
            </div>
            
            {{if it.disable}}
                <div w-class="item1">分类：{{it.dataList.typeName}}</div>
            {{end}}
            <div w-class="item1">
                <div w-class="title">商品类型</div>
                <div style="display:inline-block;height: 50px;margin-left: 2px;" ev-selected="bondedChange" ev-expand="expand({{1}},e)">
                    <widget w-tag="app-components-simpleFilter1">{options:{{it.goodsType}},activeIndex:{{it.bondedActiveIndex}},expand:{{it.expandIndex[1]}},disabled:{{it.disable}} }</widget>
                </div>
            </div>
            <div w-class="item1">
                <div w-class="title">品牌</div>
                <div style="display:inline-block;height: 50px;margin-left: 20px;" ev-selected="brandTypeChange" ev-expand="expand({{2}},e)">
                    <widget w-tag="app-components-simpleFilter">{dataList:{{it.brandType}},active:{{it.brandTypeIndex}},expand:{{it.expandIndex[2]}},search:true,dataListId:{{it.brandId}},disabled:{{it.disable}} }</widget>
                </div>
            </div>
            {{if it.bondedActiveIndex}}
            <div w-class="item1">
                <div w-class="title">税费(元)</div>
                <div w-class="input" ev-input-change="taxChange" style="width: 382px;margin-left: 20px;">
                    <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.tax?  it.tax:JSON.stringify(it.tax)}},disabled:{{it.disable}} }</widget>
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
                        <app-components-inputImg>{path:{{it.path}},src:{{it.thumbnail.length!=0?it.thumbnail[0][0]:''}},disabled:{{it.disable}}}</app-components-inputImg>
                    </div>
                </div>
            </div>
            <div w-class="shopImg">
                <div>主图({{it.mainPicture.length}}/5)</div>
                <div w-class="img_info">
                    {{for i,v of it.mainPicture}}
                        <div w-class="img_item" ev-input-file="updataImgMain({{i}},e)" ev-input-removeFile="removeMainImg({{i}})">
                            <app-components-inputImg>{path:{{it.path}},src:{{it.mainPicture[i]?it.mainPicture[i][0]:""}},disabled:{{it.disable}},removeImg:{{it.disable?false:true}} }</app-components-inputImg>
                        </div>
                    {{end}}
                    {{if it.mainPicture.length!=5}}
                    <div w-class="img_item" ev-input-file="addMainImg">
                        <app-components-inputImg>{path:{{it.path}},disabled:{{it.disable}}}</app-components-inputImg>
                    </div>
                    {{end}}
                </div>
            </div>
            <div w-class="shopImg">
                <div>详情图({{it.infoPicture.length}}/20)</div>
                <div w-class="img_info">
                    {{for i,v of it.infoPicture}}
                        <div w-class="img_item" ev-input-file="updataImgInfo({{i}},e)" ev-input-removeFile="removeInfoImg({{i}})">
                            <app-components-inputImg>{path:{{it.path}},src:{{it.infoPicture[i]?it.infoPicture[i][2][0]:""}},disabled:{{it.disable}},removeImg:{{it.disable?false:true}} }</app-components-inputImg>
                        </div>
                    {{end}}
                    {{if it.infoPicture.length!=20}}
                    <div w-class="img_item" ev-input-file="addInfoImg">
                        <app-components-inputImg>{path:{{it.path}},src:"",disabled:{{it.disable}}}</app-components-inputImg>
                    </div>
                    {{end}}
                </div>
            </div>
        </div>
    </div>
    {{if it.selectData.length}}
    <div w-class="searchBox">
        <div w-class="onShelvesTitle">已选SKU</div>
        <div w-class="searchItem" style="max-height:356px;overflow: auto;flex-direction: column;">
            {{for i,v of it.selectData}}
            <div w-class="item">
                <div w-class="bodyTitle">
                    <div w-class="shopId" style="margin-left: 93px;">SKU名称</div>
                    <div w-class="shopName" style="flex:1;">{{v[2]}}</div>
                    <div w-class="shopType" style="flex:1;">
                        <span w-class="discount">供应商ID</span>
                        <span style="margin-left:12px;">{{v[0]}}</span>
                    </div>
                </div>
                <div w-class="itemBox">
                    <div w-class="productList">
                        {{for index,item of v}}
                        <div w-class="product_info">
                            <div w-class="infoTitle">{{it.showDataTitle[index]}}：</div>
                            <div>{{item}}</div>
                        </div>
                        {{end}}
                        <div w-class="product_info" style="align-items: center;">
                            <div>差价(元)：</div>
                            <div>
                                <div w-class="input" ev-input-change="spread(e,{{i}})" style="width: 124px;margin-left: 18px;height: 30px;">
                                    <widget w-tag="app-components-input">{placeHolder:"请输入",input:{{it.spreadList[i]?it.spreadList[i][1]:''}},disabled:{{it.disable}},itype:"number" }</widget>
                                </div>
                            </div>
                        </div>
                    </div>
                    {{if !it.disable}}
                    <div w-class="btnGroup">
                        <div w-class="btn" on-tap="remove({{i}})" on-down="onShow">移除</div>
                    </div>
                    {{end}}
                </div>
            </div>
            {{end}}
        </div>
    </div>
    {{end}}
    {{if it.disable}}
    <div w-class="saleBox" style="height:144px">
        <div w-class="tableTitle">销售信息</div>
        <div w-class="saleInfo">
            <div w-class="saleNum">该商品总销售量：{{it.sale[0]}}</div>
            <div w-class="saleCtr">
                <div w-class="saleTime">时间段销售量：{{it.sale[1]}}</div>
                <div style="display: flex;margin-left: 40px;">
                    <div w-class="checkTime">选择时间段</div>
                    <div ev-dateBox-change="changeDateBox" ev-period-change="changeDate">
                        <widget w-tag="app-components-periodTimePicker">{showDateBox:{{it.showDateBox}},startDate:{{it.startTime}},endDate:{{it.endTime}} }</widget>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{end}}
    {{if !it.disable}}
    <div w-class="search">
            <div w-class="input" ev-input-change="inputProductChange" style="width: 724px;">
                <widget w-tag="app-components-input">{placeHolder:"供应商ID，SKU，sku名" }</widget>
            </div>
            <div w-class="btn" on-tap="searchProduct" on-down="onShow">查询</div>
        </div>
        {{if it.searchData.length}}
        <div w-class="searchItem" style="background: white;">
            {{for i,v of it.searchData}}
                <div w-class="item">
                <div w-class="bodyTitle" style="justify-content: space-evenly;">
                    <div w-class="shopId" style="margin-left: 93px;">SKU名称</div>
                    <div w-class="shopName" style="flex:1;">{{v[2]}}</div>
                    <div w-class="shopType" style="flex:1;">
                        <span w-class="discount">供应商ID</span>
                        <span style="margin-left:12px;">{{v[0]}}</span>
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
                        <div w-class="btn" on-tap="check({{i}})" on-down="onShow">选择</div>
                    </div>
                </div>
            </div>
            {{end}}
        </div>
        {{end}}
    {{end}}
    <div w-class="ctr">
        <div w-class="btn" on-tap="gotoShop" on-down="onShow">取消</div>
        {{if !it.disable}}
        <div w-class="btn" on-tap="next" on-down="onShow">{{it.btn}}</div>
        {{end}}
    </div>
</div>
