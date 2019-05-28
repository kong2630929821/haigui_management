<div>
    <div w-class="body">
        <table w-class="table header" style="width: 100%;">
            {{if it.title}}
            <thead w-class="has-gutter">
                <tr style="background:#fff;">
                    {{for i,v of it.title}}
                    <th w-class="th">{{v}}</th>
                    {{end}}

                    {{if it.inlineBtn1 || it.inlineBtn2}}
                    <th w-class="th">操作</th>
                    {{end}}
                </tr>
            </thead>
            {{end}}   
            <tbody>
                {{for i,v of it.datas}}
                <tr style="background:#fff;">
                    
                    {{for j,r of v}}
                    <td w-class="td">
                        <span>{{typeof(r)=="string" ? r :JSON.stringify(r)}}</span>
                    </td>
                    {{end}}

                    {{if it.inlineBtn1 || it.inlineBtn2}}
                    <td w-class="td">
                        <div style="display: flex;justify-content: center;">
                            {{if it.inlineBtn1}}
                            <div w-class="dealBtn" style="color:#FA2929" on-tap="goDetail(e,{{i}},1)">{{it.inlineBtn1}}</div>
                            {{end}}

                            {{if it.inlineBtn2}}
                            <div w-class="dealBtn" on-tap="goDetail(e,{{i}},2)">{{it.inlineBtn2}}</div>
                            {{end}}
                        </div>
                    </td>
                    {{end}}
                </tr>
                {{end}}
            </tbody>
        </table>

    </div>

    <div w-class="bottom">
        {{if it.btn1}}
        <div w-class="btns">
            <div w-class="bottomBtn" on-tap="clickBtn(e,1)">导出列表</div>
        </div>
        {{end}}
    </div>
</div>
