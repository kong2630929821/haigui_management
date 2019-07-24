import { notify } from '../../../pi/widget/event';
import { Widget } from '../../../pi/widget/widget';
import { perPage } from '../../components/pagination';
import { getAmountDetail } from '../../net/pull';

interface Props {
    title:string;
    sureText:string;
    cancelText:string;
    uid:number;
    curShowDataList:any[];// 表格数据
    showTitleList:any[];// 表格标题
    fundDetails:any[];// 资金明细
    seaShell:any[];// 海贝
    integral:any[];// 积分
    activeTab:number;
    showDataList:any[];
    curPage:number;// 当前页数
    perPage:number;// 每页多少条数据
    perPageIndex:number;// 每页显示多少个的下标
    expandIndex:boolean;// 分页下拉显示
}

const dataTitle = [
    ['时间','类型','金额'],
    ['时间','类型','海贝'],
    ['时间','类型','积分']
];
/**
 * 模态框
 * {title:"提示",content:"温馨提示",sureText:"sure",cancelText:"cancel",itype:"text"}
 * title：标题
 * sureText:确认按钮名称
 * cancelText：取消按钮名称
 */
export class SubordinateFundDetails extends Widget {
    public props: Props = {
        title:'',
        sureText:'确认',
        cancelText:'取消',
        uid:0,
        curShowDataList:[],
        showTitleList:dataTitle[0],
        fundDetails:[],
        seaShell:[],
        integral:[],
        activeTab:0,
        showDataList:[],
        curPage:0,
        perPage:perPage[0],
        perPageIndex:0,
        expandIndex:false

    };
    public ok: () => void;
    public cancel: () => void;   // fg为false表示退出APP(或点击取消)，true表示忘记密码
    public setProps(props:any) {
        this.props = { 
            ...this.props,
            ...props
        };
        super.setProps(this.props); 
        // 获取当前用户资金明细
        getAmountDetail(this.props.uid,1).then(r => {
            this.props.fundDetails = r;
            this.changeTab(0);
            this.paint();
        });
        // 获取当前用户海贝明细
        getAmountDetail(this.props.uid,2).then(r => {
            this.props.seaShell = r;
            this.paint();
        });
        // 获取当前用户积分明细
        getAmountDetail(this.props.uid,3).then(r => {
            this.props.integral = r;
            this.paint();
        });
    }
    // 切换
    public changeTab(num:number) {
        this.props.activeTab = num;
        switch (num) {
            case 0:// 资金 
                this.props.showDataList = this.props.fundDetails;
                this.props.showTitleList = dataTitle[num];
                break;
            case 1:// 海贝 
                this.props.showDataList = this.props.seaShell;
                this.props.showTitleList = dataTitle[num];
                break;
            case 2:// 积分 
                this.props.showDataList = this.props.integral;
                this.props.showTitleList = dataTitle[num];
                break;
            default:
        }
        this.props.curPage = 0;
        this.changePage({ value:0 });
    }

      // 查看某一页数据
    public changePage(e:any) {
        this.props.curPage = e.value;
        this.props.curShowDataList = this.props.showDataList.slice(e.value * this.props.perPage,e.value * this.props.perPage + this.props.perPage);
        this.paint();
    }
    
    // 返回
    public goBack(e:any) {
        notify(e.node,'ev-userDetail-back',{});
    }

        // 每页展示多少数据
    public perPage(e:any) {
        this.props.perPage = e.value;
        this.props.expandIndex = false;
        this.props.perPageIndex = e.index;
        this.changePage({ value:0 });  
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
    
}