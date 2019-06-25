<div w-class="new_page" style="display:flex;flex-direction:column;">
    <div w-class="logo">海龟壹号管理后台</div>
    <div w-class="base">
        <div w-class="left">
            {{for i,v of it.pageList}}
            <div w-class="item {{(it.activePage.page === v.page&&!v.children)?'active':''}}" on-tap="changePage({{i}})">
                <img w-class="icon-left" src="../../res/images/{{v.img}}" alt=""/>
                <span style="flex:1 0 0;">{{v.name}}</span>
                <img w-class="icon-right" src="../../res/images/arrowRight.png" alt=""/>
            </div>
            {{if v.children&&v.show}}
                {{for index,item of v.children}}
                    <div w-class="item {{it.activePage.page === item.page?'active':''}}" on-tap="changeChildrenPage({{i}},{{index}})">
                        <span style="flex:1 0 0;margin-left: 46px;">{{item.name}}</span>
                    </div>
                {{end}}
            {{end}}
            {{end}}
        </div>

        <div w-class="right">
            <widget w-tag="app-view-page-{{it.activePage.page}}"></widget>
        </div>
    </div>
</div>