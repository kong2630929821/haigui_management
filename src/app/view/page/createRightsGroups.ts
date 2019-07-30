import { popNew } from '../../../pi/ui/root';
import { Widget } from '../../../pi/widget/widget';
import { perPage } from '../../components/pagination';
import { getAllUser, getAllUserType, removeRightsGroup, removeUser } from '../../net/pull';
import { deepCopy } from '../../store/memstore';
import { popNewMessage } from '../../utils/logic';
import { exportExcel, rippleShow } from '../../utils/tools';

// tslint:disable-next-line:missing-jsdoc
interface Props {
    showDataList:any;// 表格数据
    showTitleList:any;// 表格标题
    sum:number;// 数据条数
    dataList:any;// 全部数据
    perPage:number;// 每页显示多少个
    currentIndex:number;
    expandIndex:boolean;
    perPageIndex:number;// 分页的下标
    oldDataList:any;// 原始数据
}
/**
 * 账号管理
 */
export class CreateRightsGroups extends Widget {
    public props:Props = {
        showDataList:[],
        showTitleList:['账号类型','权限'],
        sum:0,
        dataList:[],
        perPage:perPage[0],
        currentIndex:0,
        expandIndex:false,
        perPageIndex:0,
        oldDataList:[]
    };

    public create() {
        super.create();
        this.init();
    }

    // 初始化
    public init() {
        getAllUserType().then(r => {
            this.props.dataList = r[1];
            this.props.sum = r[1].length;
            this.props.oldDataList = r[2];
            this.props.showDataList = this.props.dataList.slice(0,this.props.perPage);
            this.paint();
        });
    }
    // 分页变化
    public pageChange(e:any) {
        this.props.currentIndex = e.value;
        this.props.expandIndex = false;
        console.log(e.value);
        this.props.showDataList = this.props.dataList.slice(e.value * this.props.perPage,(e.value + 1) * this.props.perPage);
        console.log('当前页数据：',this.props.showDataList);
        this.paint();
    }
    // 每页展示多少数据
    public perPage(e:any) {
        this.props.perPage = e.value;
        this.props.perPageIndex = e.index;
        this.props.expandIndex = false;
        this.pageChange({ value:0 });   
    }
    // 导出全部数据
    public exportUser() {
        
        const jsonHead = this.props.showTitleList;
        const aoa = [jsonHead];
        const jsonData = this.props.dataList;
        for (const v of jsonData) {
            for (let i = 0;i < v.length;i++) {
                if (v[i]) {
                    v[i] = v[i].toString();
                }  
            }
            aoa.push(v);
        }
        console.log(aoa);
        exportExcel(aoa,`所有账号类型.xlsx`);
    
    }
        // 表格操作按钮
    public goDetail(e:any) {
        if (e.fg === 1) {
            // 编辑
            popNew('app-components-addRightsGroup',{ title:'编辑账号类型',currentData:deepCopy(this.props.oldDataList[e.num]),sureText:'修改',status:false },() => {
                this.init();
            });
        } else {
            let del = false;
            getAllUser().then(r => {
                r.forEach(v => {
                    if (v[1] === e.value[0]) {
                        del = true;

                        return;
                    }
                });
                if (del) {
                    popNewMessage('该账户类型正被使用');
                } else {
                    popNew('app-components-modalBox',{ content:`确认删除账号类型“<span style="color:#1991EB">${e.value[0]}</span>”` }, () => {
                        this.remove(e.value[0]);
                    },() => {
                        popNewMessage('你已经取消操作！');
                    });
                }
                
            });
            
        }
    
    }
    // 添加账号
    public addUser() {
        popNew('app-components-addRightsGroup',{ title:'添加账号类型' },() => {
            this.init();
        });
    }

    // 删除账号
    public remove(user:string) {
        removeRightsGroup(user).then(r => {
            if (r.result === 1) {
                popNewMessage('删除成功');
                this.init();
            } else {
                popNewMessage('删除失败');
            }
        }).catch(e => {
            popNewMessage('删除失败');
        });
    }

    // 过滤器
    public expand(e:any) {
        this.props.expandIndex = e.value;
        this.paint();
    }

    // 页面点击
    public close() {
        this.props.expandIndex = false;
        this.paint();
    }
        // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }
}