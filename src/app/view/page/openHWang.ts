import { Widget } from '../../../pi/widget/widget';
import { changeHWangState, getHWangApply } from '../../net/pull';
import { popNewMessage, unicode2Str } from '../../utils/logic';
interface Props {
    datas:any[];  // 原始数据
    showDataList:any[];  // 显示数据
    showTitleList:string[];  // 显示标题
    activeTab:number;  // 活跃tab
    btn:string;  // 按钮
    applyIdList:number[]; // 申请开通海王的ID列表
}
const Status = [
    '申请中',
    '处理中',
    '处理完成'
];
/**
 * 开通海王
 */
export class OpenHWang extends Widget {
    public props:Props = {
        showDataList:[
            // ['123456','张三','15534429570','四川省成都市金牛区XX街道XX小区XX','申请中']
        ],
        showTitleList:['用户ID','姓名','手机号','地址信息','受理状态'],
        activeTab:0,
        datas:[],
        btn:'开始处理',
        applyIdList:[]
    };

    // 切换tab
    public changeTab(num:number) {
        this.props.activeTab = num;
        if (num === 2) {
            this.props.btn = '';
        } else if (num === 1) {
            this.props.btn = '处理完成';
        } else {
            this.props.btn = '开始处理';
        }
        this.paint();
        this.getData();
    }

    public getData() {
        getHWangApply().then(r => {
            let list = [];
            if (r.value && r.value.length > 0) {
                this.props.datas = r.value;
                list = r.value.map(item => {
                    return [
                        item[0],    // id
                        item[1],    // uid
                        unicode2Str(item[3]),  // 姓名
                        item[2],     // 电话
                        item[4],     // 地址
                        Status[item[5]]  // 状态
                    ];
                });
                list = list.filter(t => {
                    if (t[5] === Status[this.props.activeTab]) {
                        this.props.applyIdList.push(t.shift());

                        return true;
                    } 

                    return false;
                });
            }
            this.props.showDataList = list;
            this.paint();
        });
    }

    // 处理数据
    public async dealWith(e:any) {
        console.log(e.fg);
        for (const v of e.value) {
            const id = this.props.applyIdList[v];
            const uid = this.props.showDataList[v][0];
            if (id && uid) {
                await changeHWangState(id, uid, 2);
            }
        }
        popNewMessage('处理完成');
        this.getData();
        
    }
}