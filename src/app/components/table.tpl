<div w-class='box'>
    {{if it.title}}
    <div w-class="header" >
        <table w-class="table">
            <thead w-class="has-gutter">
                <tr style="background:#fff;">
                    {{if it.needCheckBox}}
                    <th w-class="th {{it.auto?'autoTh':''}}" style="width:80px;">选择</th>
                    {{end}}
                    {{for i,v of it.title}}
                    <th w-class="th {{it.auto?'autoTh':''}}">{{v}}</th>
                    {{end}}

                    {{if it.inlineBtn1 || it.inlineBtn2 || it.inputFile}}
                    <th w-class="th th1 {{it.auto?'autoTh':''}}">操作</th>
                    {{end}}
                </tr>
            </thead>
        </table>
    </div>
    {{end}}    
    <div w-class="{{it.auto?'autoBody':''}}">
        <table w-class="table">
            <tbody>
                {{for i,v of it.datas}}
                <tr style="background:#fff;">
                    {{if it.needCheckBox}}
                    <td w-class="td {{it.auto?'autoTd':''}}" style="width:80px;" on-tap="checked({{i}})">
                        <img src="../res/images/{{it.selectList.indexOf(i)>-1?'selectBox_active.png':'selectBox.png'}}" />
                    </td>
                    {{end}}
                    
                    {{for j,r of v}}
                    <td w-class="td {{it.auto?'autoTd':''}}">
                        <span style="word-break: break-all;">{{typeof(r)=="string" ? r :JSON.stringify(r)}}</span>
                    </td>
                    {{end}}

                    {{if it.inlineBtn1 || it.inlineBtn2 || it.inputFile}}
                    <td w-class="td td1 {{it.auto?'autoTd':''}}">
                        {{if it.inputFile}}
                        <div style="margin-left:0;">
                            <input type="file" on-change="importExcel(e,{{i}})"/>
                        </div>
                        {{end}}
                        
                        {{if it.inlineBtn1}}
                        <div w-class="btn {{it.color?'btnColor':''}}" style="margin-left:0;" on-tap="goDetail(e,{{i}},1)">{{it.inlineBtn1}}</div>
                        {{end}}

                        {{if it.inlineBtn2}}
                        <div w-class="btn" style="margin-left:0;" on-tap="goDetail(e,{{i}},2)">{{it.inlineBtn2}}</div>
                        {{end}}
                       
                    </td>
                    {{end}}
                </tr>
                {{end}}
            </tbody>
        </table>

    </div>

    {{if it.auto==0}}
        <div w-class="bottom">
            {{if it.needCheckBox}}
            <div w-class="allCheck" on-tap="allChecked">
                <img src="../res/images/{{it.allChecked?'selectBox_active.png':'selectBox.png'}}"/>
                <span style="margin-left:10px;">全选</span>
            </div>
            {{end}}

            <div w-class="btns">
                {{if it.btn1}}
                <div w-class="bottomBtn" on-tap="clickBtn(e,1)">{{it.btn1}}</div>
                {{end}}

                {{if it.btn2}}
                <div w-class="bottomBtn" on-tap="clickBtn(e,2)">{{it.btn2}}</div>
                {{end}}
            </div>
        </div>
    {{end}}
</div>
