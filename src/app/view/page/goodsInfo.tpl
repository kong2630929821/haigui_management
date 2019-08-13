<div w-class="page" ev-detail-back="detailBack" on-tap="close" style="padding:0;">
        <div style="display: flex" ev-input-change="goodsIdChange">
            <div w-class="back" on-tap="goBack" on-down="onShow">返回</div>    
            <div style="flex:1 0 0;display:flex;align-items: center;min-height: 50px;background: #fff;margin-left: 20px;padding: 0 10px;">
                <div style="font-weight: 600;flex-shrink: 0;">已选择的商品ID:</div>
                <widget w-tag="app-components-textarea" style="padding:10px;margin: 10px;border: 1px solid #e2e2e2;">{input:{{it.goodsIdShow}},placehold:"" }</widget>
                <div w-class="btn" style="margin:0;width: 60px;flex-shrink: 0;" on-tap="confirmGoods">确认</div>
            </div>
        </div>
    
        <div w-class="searchBox">
            <div w-class="tableTitle">筛选查询</div>
            <div w-class="btnBox" style="justify-content: flex-start;">
                <div w-class="input" ev-input-change="inputChange">
                    <widget w-tag="app-components-input">{placeHolder:"查询商品ID"}</widget>
                </div>
                <div w-class="search" on-tap="search" on-down="onShow">查询</div>
                <div w-class="search" style="margin-left:200px;" on-tap="goodsIdChange" on-down="onShow">编辑</div>
            </div>
        </div>

        <div w-class="shopSum">共{{it.shopNum}}件商品</div> 
        <div>
            <div w-class="tableTitle">商品列表</div>
            <div w-class="tableData">
                <div w-class="title">
                    {{for i,v of it.showDateTitle}}
                    <div w-class="titleItem">{{v}}</div>
                    {{end}}
                </div>
                <div w-class="dataBody">
                    {{for i,v of it.showDataList}}
                        <div ev-selGoods="selectGoods">
                            <widget w-tag="app-components-goodsItem">{datas:{{v}}, inFlag:3,selected:{{it.goodsId.findIndex(r=>r==v.id) > -1}} }</widget>
                        </div>
                    {{end}}
                </div>
            </div>
        </div>
        <div style="position:relative;">
            <div ev-changeCurrent="pageChange" ev-perPage="perPage" w-class="pagination">
                <widget w-tag="app-components-pagination">{pages:{{Math.ceil(it.shopNum/ it.perPage)}},filterShow:true,currentIndex:{{it.currentIndex}} }</widget>
            </div>
        </div>
        
    </div>