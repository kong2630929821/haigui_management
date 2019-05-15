import { Widget } from '../../../pi/widget/widget';
import { changeHWangState, getHWangApply } from '../../net/pull';
import { popNewMessage } from '../../utils/logic';
interface Props {
    datas:any[];  // 原始数据
    showDataList:any[];  // 显示数据
    showTitleList:string[];  // 显示标题
    activeTab:number;  // 活跃tab
    btn:string;  // 按钮
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
        btn:'开始处理'
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
        getHWangApply().then(r => {
            let list = [];
            if (r.value && r.value.length > 0) {
                this.props.datas = r.value;
                list = r.value.map(item => {
                    return [
                        item[1],
                        item[3],
                        item[2],
                        item[4],
                        Status[item[5]]
                    ];
                });
                list = list.filter(item => {
                    return item[4] === Status[this.props.activeTab];
                });
            }
            this.props.showDataList = list;
            this.paint();
        });
    }

    // 处理数据
    public dealWith(e:any) {
        console.log(e.fg);
        const data = this.props.datas[0];
        if (data) {
            changeHWangState(data[0],data[1],this.props.activeTab + 1).then(() => {
                popNewMessage('处理成功');
            });
        }
    }
}