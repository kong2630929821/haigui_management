<div>
    <div w-class="body" style="max-height:600px;">
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
                        {{if it.img}}
                            {{if j==2&& r!="" }}
                                <img style="width: 30px ;height:30px;" src="{{it.mallImagPre}}{{r}}" alt=""/>
                            {{else}}
                                <span style="word-break: break-all;">{{typeof(r)=="string" ? r :JSON.stringify(r)}}</span>
                            {{end}}
                        {{else}}
                            <span style="word-break: break-all;">{{typeof(r)=="string" ? r :JSON.stringify(r)}}</span>
                        {{end}}
                    </td>                    
                    {{end}}

                    {{if it.inlineBtn1 || it.inlineBtn2}}
                    <td w-class="td">
                        <div style="display: flex;justify-content: center;">                            
                            {{if it.inlineBtn1}}
                            
                                {{if v[5]=="提现失败"}}
                                
                                <div w-class="dealBtn" on-tap="reDetail(e,{{i}},1)" on-down="onShow">{{it.inlineBtn1}}</div>
                                {{else}}
                                <div w-class="dealBtn" on-tap="goDetail(e,{{i}},1)" on-down="onShow">{{it.inlineBtn1}}</div>
                                {{end}}
                            {{end}}

                            {{if it.inlineBtn2}}
                            <div w-class="dealBtn" on-tap="goDetail(e,{{i}},2)" on-down="onShow">{{it.inlineBtn2}}</div>
                            {{end}}
                        </div>
                    </td>
                    {{end}}                    

                </tr>
                {{end}}
            </tbody>
        </table>

    </div>
</div>
