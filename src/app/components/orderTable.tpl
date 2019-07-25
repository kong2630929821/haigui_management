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

                    <td w-class="td td1">
                        {{if (i > 0 ? v[0] !== it.showDatas[i - 1][0] : true)}}
                            {{if (v[12] === it.PENDINGPAYMENT ||  v[12] === it.PENDINGDELIVERED)}}
                            <div w-class="btn btnColor" on-tap="quitOrder(e,{{i}})" on-down="onShow">取消订单</div>
                            {{elseif (v[12] === it.FAILED)}}
                            <div w-class="btn" style="color: #222;" on-down="onShow">手动取消</div>
                            
                            {{end}}
                            <div w-class="btn" on-tap="goDetail(e,{{i}})" on-down="onShow">查看详情</div>
                        {{end}}
                    </td>
                </tr>
                {{end}}

            </tbody>
        </table>

    </div>
    
    <div w-class="bottom">
        {{if it.needCheckBox}}
        <div w-class="allCheck" on-tap="allChecked" on-down="onShow">
            <img src="../res/images/{{it.allChecked?'selectBox_active.png':'selectBox.png'}}"/>
            <span style="margin-left:10px;">全选</span>
        </div>
        {{end}}

        <div w-class="searchleft" on-tap="exportOrder" on-down="onShow">导出订单</div>

        <div ev-input-file="importTransport"><app-components-inputFileBtn>{text:"导入运单"}</app-components-inputFileBtn></div>
        <div w-class="searchleft" style="width:120px" on-tap="exportAllOrder" on-down="onShow">导出全部订单</div>
    </div>
</div>
    