<div w-class="box">
    <div w-class="tableTitle">数据列表</div>
    <div w-class="body">
        <table w-class="table">
            <thead w-class="has-gutter">
                <tr style="background:#fff;">
                    {{if it.needCheckBox}}
                    <th w-class="th" style="width:80px;">选择</th>
                    {{end}}
                    {{for i,v of it.title}}
                    <th w-class="th">{{v}}</th>
                    {{end}}

                    {{if it.inlineBtn1 || it.inlineBtn2 || it.inputFile}}
                    <th w-class="th">操作</th>
                    {{end}}
                </tr>
            </thead>
            <tbody >
                {{for i,v of it.showDatas}}
                <tr style="background:#fff;">
                    {{if it.needCheckBox &&  (i > 0 ? v[0] !== it.showDatas[i - 1][0] : true) }}
                    <td w-class="td" style="width:80px;" on-tap="checked(e,{{i}})">
                        <img src="../res/images/{{it.selectList[i] ? 'selectBox_active.png':'selectBox.png'}}" />
                    </td>
                    {{else}}
                    <td w-class="td" style="width:80px;" >
                    </td>
                    {{end}}
                    
                    {{for j,r of v}}
                    <td w-class="td" >
                        <div w-class="flex-style">
                        {{if j === 0 && it.isExported(r)}}
                        <span w-class="label">导</span>
                        {{end}}
                        <span style="word-break: break-all;">{{typeof(r)=="string" ? r :JSON.stringify(r)}}</span>
                        </div>
                    </td>
                    {{end}}

                    {{if it.inlineBtn1 || it.inlineBtn2 || it.inputFile}}
                    <td w-class="td td1">
                        {{if it.inputFile}}
                        <div style="margin-left:0;">
                            <input type="file" on-change="importExcel(e,{{i}})"/>
                        </div>
                        {{end}}
                        {{if v[13] === it.PENDINGPAYMENT ||  v[13] === it.PENDINGDELIVERED}}
                            <div w-class="btn {{it.color?'btnColor':''}}" style="margin-left:0;" on-tap="quitOrder(e,{{i}})">取消订单</div>
                        {{elseif v[13] === it.FAILED}}
                            <div w-class="btn {{it.color?'btnColor':''}}" style="margin-left:0;">手动取消</div>
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
    
    <div w-class="bottom">
        {{if it.needCheckBox}}
        <div w-class="allCheck" on-tap="allChecked">
            <img src="../res/images/{{it.allChecked?'selectBox_active.png':'selectBox.png'}}"/>
            <span style="margin-left:10px;">全选</span>
        </div>
        {{end}}

        <div w-class="searchleft" on-tap="exportOrder">导出订单</div>

        <div ev-input-file="importTransport"><app-components-inputFileBtn>{text:"导入运单"}</app-components-inputFileBtn></div>
        <div w-class="searchleft" style="width:120px" on-tap="exportAllOrder">导出全部订单</div>
    </div>
</div>
    