<div class="new-page" w-class="new-page">
    <div w-class="left-container">
        {{for i,v of it1.groups}}
        <div w-class="group1-item  {{it1.activeId === v[1].id ? 'group1-item-active' : ''}}" on-tap="clickLevel1Item(e,{{v[0]}})">{{v[1].name}}</div>
        {{end}}
    </div>
    <div w-class="right-container">
        {{if it1.groups.size > 0}}
        {{for i,v of it1.groups.get(it1.activeId).childs}}
        <div w-class="group2-item" on-tap="clickLevel2Item(e,{{v[0]}})">
            <div style="background-image: url(../../../res/image/{{v[1].images[0].path}});" w-class="group-icon" class="bg-img"></div>
            <div>{{v[1].name}}</div>
        </div>
        {{end}}
        {{end}}
    </div>
    
</div>