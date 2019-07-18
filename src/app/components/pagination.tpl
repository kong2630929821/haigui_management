
    <div w-class="pagination">
        {{if it.filterShow}}
            <div w-class="filterBox">
                <span>每页</span>
                <div style="display:inline-block;height: 30px;margin-left: 10px" ev-selected="filterTimeType">
                    <widget w-tag="app-components-simpleFilter1">{options:{{it.numberCheck}},activeIndex:{{it.numberCheckActiveIndex}},expandIndex:{{it.expandIndex}},style:true}</widget>
                </div>
            </div>
        {{end}}
        <div w-class="filterBox">共{{it.pages}}页</div>
        <ul w-class="ul">
            <li class="btnHover" w-class="prep" on-tap="goto({{1}},e)" style="margin-right:10px;">首页</li>
            <li class="btnHover" w-class="prep" on-tap="prep">
                上一页
            </li>
            {{for i,v of it.pagesList}}
                <li class="liHover" w-class="li {{it.currentIndex===v?'actived':''}}" on-tap="currentClick(e,{{v}})" style=" padding-left: 10px;">{{v+1}}</li>
            {{end}}
            <li class="btnHover" w-class="next" on-tap="next">
                下一页
            </li>
            <li class="btnHover" w-class="next" on-tap="goto({{2}},e)" style="margin-left:10px;">
                尾页
            </li>
        </ul>
    </div>
    