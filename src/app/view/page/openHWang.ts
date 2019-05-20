import { deepCopy } from '../../../pi/util/util';
import { Widget } from '../../../pi/widget/widget';
import { changeHWangState, getHWangApply, getHwangTotal } from '../../net/pull';
import { popNewMessage, unicode2Str } from '../../utils/logic';
interface Props {
    datas:any[];  // 原始数据
    showDataList:any[];  // 显示数据
    showTitleList:string[];  // 显示标题
    activeTab:number;  // 活跃tab
    btn1:string;  // 按钮
    btn2:string;  // 按钮
    applyIdList:number[]; // 申请开通海王的ID列表
    searPhone:string;  // 查询手机号
    dayCount:number;   // 今天申请人数
    monCount:number;  // 本月申请人数
    allCount:number;  // 海王总数
}
const Status = [
    '申请中',
    '处理中',
    '开通成功',
    '开通失败'
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
        btn1:'',
        btn2:'开始处理',
        applyIdList:[],
        searPhone:'',
        dayCount:0,
        monCount:0,
        allCount:0
    };

    public create() {
        super.create();
        this.getData();
    }

    // 切换tab
    public changeTab(num:number) {
        this.props.activeTab = num;
        if (num === 2) {
            this.props.btn1 = '';
            this.props.btn2 = '';
        } else if (num === 1) {
            this.props.btn1 = '拒绝开通';
            this.props.btn2 = '同意开通';
        } else {
            this.props.btn1 = '';
            this.props.btn2 = '开始处理';
        }
        this.props.showDataList = [];
        this.props.applyIdList = [];
        this.props.datas.forEach(t => {
            const v = deepCopy(t);
            if (t[5] === Status[num] || (num === 2 && t[5] === Status[3])) {
                this.props.applyIdList.push(v.shift());
                this.props.showDataList.push(v);
            }
        });
        this.paint();
    }

    // 获取数据
    public getData() {
        getHwangTotal().then(r => {
            this.props.dayCount = r.day_count;
            this.props.monCount = r.month_count;
            this.props.allCount = r.haiw_count;
            this.paint();
        });
        getHWangApply().then(r => {
            if (r.value && r.value.length > 0) {
                this.props.datas = r.value.map(item => {
                    return [
                        item[0],    // 记录id
                        item[1],    // 用户uid
                        unicode2Str(item[3]),  // 姓名
                        item[2],     // 电话
                        unicode2Str(item[4]),     // 地址
                        Status[item[5]]  // 状态
                    ];
                });
                this.changeTab(this.props.activeTab);
            }
            this.paint();
        });
    }

    // 查询手机号输入
    public phoneChange(e:any) {
        this.props.searPhone = e.value;
    }

    // 处理数据
    public async dealWith(e:any) {
        const id = this.props.applyIdList[e.num];
        const uid = this.props.showDataList[e.num][0];
        if (id && uid) {
            if (e.fg === 1) {
                await changeHWangState(id, uid, 3);  // 拒绝
            } else {
                await changeHWangState(id, uid, this.props.activeTab + 1);  // 处理中 同意
            }
        }
        popNewMessage('处理完成');
        this.getData();
        
    }

    public search() {
        if (this.props.searPhone) {
            const ids = [];
            const list = [];
            for (const i in this.props.showDataList) {
                const v = this.props.showDataList[i];
                if (v[2] === this.props.searPhone) {
                    ids.push(this.props.applyIdList[i]);
                    list.push(v);
                }
            }
            this.props.showDataList = list;
            this.props.applyIdList = ids;
            this.paint();
        } else {
            this.changeTab(this.props.activeTab);
        }
    }
}