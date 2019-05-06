<div class="new-page" w-class="page">
    <div w-class="row title">
        <div w-class="left" style="margin:0;">海宝</div>
        <div w-class="wxName">微信名</div>
    </div>
    {{for i,v of it.list}}
    <div w-class="row">
        <div w-class="left">{{v.key}}</div>
        <div w-class="right">{{v.value}}</div>
    </div>
    {{end}}
</div>