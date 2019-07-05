<div w-class="imgBox">
    {{if it.src}}
    <img src="{{it.src}}" alt="" w-class="imgItem"/>
    {{else}}
    <div w-class="addImg">
        <div w-class="addBox">
            <p w-class="lineRow"></p>
            <p w-class="lineCol"></p>
        </div>
        <div>{{it.title}}</div>
    </div>
    {{end}}
    <input type="file" on-change="importTransport" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" w-class="import-input"/>
</div>