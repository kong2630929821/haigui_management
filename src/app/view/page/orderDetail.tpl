<div w-class="page">
    <div w-class="back" on-tap="goBack">返回</div>
    <div w-class="tableTitle">基础信息</div>
    <div w-class="tableContent">
        {{for i,v of it.baseDataList}}
        <div w-class="item">
            <div w-class="itemTitle">{{it.baseTitleList[i]}}</div>
            <div w-class="itemMess">{{v?v:"暂无"}}</div>
        </div>
        {{end}}
    </div>

    <div w-class="tableTitle">商品信息</div>
    <div style="background:#fff;margin-bottom:20px;">
        {{for i,v of it.goodsDataList}}
        <div w-class="itemBox">
            {{for j,r of v}}
            <div w-class="item">
                <div w-class="itemTitle">{{it.goodsTitleList[j]}}</div>
                <div w-class="itemMess">{{r?r:"暂无"}}</div>
            </div>
            {{end}}
        </div>
        <div w-class="dividLine"></div>
        {{end}}
    </div>

    {{if it.rebateDataList.length > 0}}
    <div w-class="tableTitle">返利信息</div>
    <div style="background:#fff;margin-bottom:20px;">
        {{for i,v of it.rebateDataList}}
        <div w-class="itemBox">
            {{for j,r of v}}
            <div w-class="item">
                <div w-class="itemTitle">{{it.rebateTitleList[j]}}</div>
                <div w-class="itemMess">{{r?r:"暂无"}}</div>
            </div>
            {{end}}
        </div>
        <div w-class="dividLine"></div>
        {{end}}
    </div>
    {{end}}
</div>