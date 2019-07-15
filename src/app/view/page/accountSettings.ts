import { popNew } from '../../../pi/ui/root';
import { Widget } from '../../../pi/widget/widget';
import { getAllUser, removeUser } from '../../net/pull';
import { popNewMessage } from '../../utils/logic';
import { exportExcel } from '../../utils/tools';

// tslint:disable-next-line:missing-jsdoc
interface Props {
    showDataList:any;// 表格数据
    showTitleList:any;// 表格标题
    sum:number;// 数据条数
    dataList:any;// 全部数据
    perPage:number;// 每页显示多少个
}
// 每页多少数据
const perPage = [20,50,100];
/**
 * 账号管理
 */
export class AccountSetting extends Widget {
    public props:Props = {
        showDataList:[],
        showTitleList:['账号','账号类型'],
        sum:0,
        dataList:[],
        perPage:perPage[0]
    };

    public create() {
        super.create();
        this.init();
    }

    // 初始化
    public init() {
        getAllUser().then(r => {
            this.props.dataList = r;
            this.props.sum = r.length;
            this.props.showDataList = this.props.dataList.slice(0,this.props.perPage);
            this.paint();
        });
    }
    // 分页变化
    public pageChange(e:any) {
        console.log(e.value);
        this.props.showDataList = this.props.dataList.slice(e.value * this.props.perPage,(e.value + 1) * this.props.perPage);
        console.log('当前页数据：',this.props.showDataList);
        this.paint();
    }
    // 每页展示多少数据
    public perPage(e:any) {
        this.props.perPage = perPage[e.value];
        this.init();     
    }
    // 导出全部数据
    public exportUser() {
        
        getAllUser().then(r => {
            const jsonHead = this.props.showTitleList;
            const aoa = [jsonHead];
            const jsonData = r;
            for (const v of jsonData) {
                for (let i = 0;i < v.length;i++) {
                    if (v[i]) {
                        v[i] = v[i].toString();
                    }  
                }
                aoa.push(v);
            }
            console.log(aoa);
            exportExcel(aoa,`账号管理.xlsx`);
        });
    }
        // 表格操作按钮
    public goDetail(e:any) {
        if (e.fg === 1) {
            // 编辑
            popNew('app-components-addUser',{ title:'编辑账号',currentData:e.value,sureText:'修改',style:false },() => {
                this.init();
            });
        } else {
            popNew('app-components-modalBox',{ content:`确认删除账号“<span style="color:#1991EB">${e.value[0]}</span>”` }, () => {
                this.remove(e.value[0]);
            },() => {
                popNewMessage('你已经取消操作！');
            });
        }
    
    }
    // 添加账号
    public addUser() {
        popNew('app-components-addUser',{ title:'添加账号' },() => {
            this.init();
        });
    }

    // 删除账号
    public remove(user:string) {
        removeUser(user).then(r => {
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
}