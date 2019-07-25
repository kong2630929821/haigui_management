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
    
                        <td w-class="td td1 {{it.auto?'autoTd':''}}">
                            <div w-class="btns">
                                <div ev-input-file="importFile(e,{{i}})" style="position:relative;"><app-components-inputFileBtn>{text:"导入表单"}</app-components-inputFileBtn></div>
                                <div on-tap="doImportClick(e,{{i}})" w-class="btn3 {{it.files[i] ? '' : 'no-click'}}" on-down="onShow">应用新表</div>
                            </div>
                        </td>
                    </tr>
                    {{end}}
                </tbody>
            </table>
    
        </div>
    
        {{if it.auto==0}}
            <div w-class="bottom">
                {{if it.needCheckBox}}
                <div w-class="allCheck" on-tap="allChecked" on-down="onShow">
                    <img src="../res/images/{{it.allChecked?'selectBox_active.png':'selectBox.png'}}"/>
                    <span style="margin-left:10px;">全选</span>
                </div>
                {{end}}
    
                <div w-class="btns">
                    {{if it.btn1}}
                    <div w-class="bottomBtn" on-tap="clickBtn(e,1)" on-down="onShow">{{it.btn1}}</div>
                    {{end}}
    
                    {{if it.btn2}}
                    <div w-class="bottomBtn" on-tap="clickBtn(e,2)" on-down="onShow">{{it.btn2}}</div>
                    {{end}}
                </div>
            </div>
        {{end}}
    </div>
    