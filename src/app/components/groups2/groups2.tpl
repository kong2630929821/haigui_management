<div w-class="container">
    {{if it.list.length > 0}}
    <div w-class="group1" class="bg-img" style="background-image:url(../../res/image/{{it.list[0].images[0].path}});" on-tap="clickItem(e,0)"></div>
    <div w-class="groups">
        {{for i,v of it.list}}
        {{if i > 0}}
        <div w-class="group2"  on-tap="clickItem(e,{{i}})" style="{{i%2 === 0 ? 'padding-left:5px;' : 'padding-right:5px;'}}">
            <div style="background-image:url(../../res/image/{{v.images[0].path}});border-radius:6px;" class="bg-img" ></div>
        </div>
        {{end}}
        {{end}}
    </div>  
    {{end}}
</div>