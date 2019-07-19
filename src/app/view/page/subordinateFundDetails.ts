import { notify } from '../../../pi/widget/event';
import { Widget } from '../../../pi/widget/widget';
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
}
// 每页多少数据
const perPage = [20,50,100];
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
        showTitleList:['时间','类型','金额'],
        fundDetails:[],
        seaShell:[],
        integral:[],
        activeTab:0,
        showDataList:[],
        curPage:0,
        perPage:perPage[0]

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
                break;
            case 1:// 海贝 
                this.props.showDataList = this.props.seaShell;
                break;
            case 2:// 积分 
                this.props.showDataList = this.props.integral;
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
        this.props.perPage = perPage[e.value];
        this.props.curShowDataList = this.props.showDataList.slice(this.props.curPage * this.props.perPage,this.props.curPage * this.props.perPage + this.props.perPage);   
        this.paint(); 
    }
    
}