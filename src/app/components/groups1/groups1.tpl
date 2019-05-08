<div w-class="groups">
    {{for i,v of it.list}}
    <div w-class="group" on-tap="clickItem(e,{{i}})">
        <div style="background-image: url(../../res/image/{{v.images[0].path}});" w-class="group-icon" class="bg-img"></div>
        <div>{{v.name}}</div>
    </div>
    {{end}}
</div>