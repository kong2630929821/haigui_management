<div w-class="imgBox">
    {{if it.src}}
    <img src="{{it.src}}" alt="" w-class="imgItem"/>
    {{else}}
    <div w-class="addImg">
        <div w-class="addBox">+</div>
        <div>{{it.title}}</div>
    </div>
    {{end}}
    <input type="file" disabled="{{it.disabled?it.disabled:''}}" on-change="importTransport" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" w-class="import-input"/>
    {{if it.removeImg}}
    <div w-class="remove" on-tap="remove">X</div>
    {{end}}
</div>