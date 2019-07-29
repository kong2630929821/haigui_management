<div w-class="page" on-tap="close">
    <div w-class="narBar">
        <div on-tap="gotoShop">商品库</div>
        <div>></div>
        <div>商品详情</div>
    </div>
    <div w-class="searchBox">
        <div w-class="tableTitle">基本信息</div>
        <div w-class="bodyTitle">
            <div w-class="shopId">商品名称（ID）</div>
            <div w-class="shopName">2018款怀集系列见覅拉尔金属怀旧连衣裙-红色（1515）</div>
            <div w-class="shopType">
                <span w-class="discount">是否打折</span>
                <span style="margin-left:12px;">9.5折</span>
            </div>
            <div w-class="shopType">
                <span w-class="discount">最新上架时间</span>
                <span style="margin-left:12px;">2018-83-48 12:48:32</span>
            </div>
            <div w-class="shopType">
                <span w-class="discount">状态</span>
                <span style="margin-left:12px;">已上架</span>
            </div>
            <div w-class="shopType">
                <span w-class="discount">所属分类</span>
                <span style="margin-left:12px;">女装-连衣裙</span>
            </div>
        </div>
        <div w-class="imgShow">
            <div w-class="imgInfo">
                <div w-class="infoTitle">
                    <div w-class="title_1">商品封面图</div>
                    <div w-class="title_1">商品轮播图</div>
                </div>
                <div w-class="imgItem">
                    {{for i,v of [1,2,3,4,5,6,7,8,9,10,11]}}
                        <div w-class="item_img"></div>
                    {{end}}
                </div>
            </div>
            <div w-class="imgInfo">
                <div w-class="infoTitle">
                    <div w-class="title_1">商品详情图</div>
                </div>
                <div w-class="imgItem">
                    {{for i,v of [1,2,3,4,5,6,7,8,9,10,11,1,1,12,13]}}
                        <div w-class="item_img"></div>
                    {{end}}
                </div>
            </div>
        </div>
    </div>
    <div w-class="productBox">
        <div w-class="tableTitle">产品信息</div>
        <div>
            {{for i,v of [1,2,3]}}
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
                <div w-class="productList">
                    {{for i,v of [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}}
                        <div w-class="product_info">
                            <div>sku</div>
                            <div>15484848848</div>
                        </div>
                    {{end}}
                </div>
            {{end}}
        </div>
    </div>
    <div w-class="saleBox">
        <div w-class="tableTitle">销售信息</div>
        <div w-class="saleInfo">
            <div w-class="saleNum">该商品总销售量：672</div>
            <div w-class="saleCtr">
                <div w-class="saleTime">时间段销售量：327</div>
                <div style="display: flex;margin-left: 40px;">
                    <div w-class="checkTime">选择时间段</div>
                    <div ev-dateBox-change="changeDateBox" ev-period-change="changeDate">
                        <widget w-tag="app-components-periodTimePicker">{showDateBox:{{it.showDateBox}},startDate:{{it.startTime}},endDate:{{it.endTime}} }</widget>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>