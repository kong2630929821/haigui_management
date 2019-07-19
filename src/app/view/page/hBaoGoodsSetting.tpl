<div w-class="page">
        <div w-class="searchBox">
            <div w-class="tableTitle">筛选查询</div>
            <div w-class="btnBox" style="justify-content: flex-start;">
                <div w-class="input" ev-input-change="inputChange">
                    <widget w-tag="app-components-input">{placeHolder:"查询商品ID"}</widget>
                </div>
                <div w-class="search" on-tap="search">查询</div>
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
                        <div ev-bindUser="bindUser">
                            {{:index = it1.findIndex(r=>r[0] == v.id)}}
                            <widget w-tag="app-components-goodsItem">{datas:{{v}}, inFlag:2,bindUser:{{index > -1 ? it1[index][1] :""}} }</widget>
                        </div>
                    {{end}}
                </div>
            </div>
        </div>
        <div style="position:relative;">
            <div ev-changeCurrent="pageChange" ev-perPage="perPage" w-class="pagination">
                <widget w-tag="app-components-pagination">{pages:{{Math.ceil(it.shopNum/ it.perPage)}},filterShow:true }</widget>
            </div>
        </div>
        
    </div>