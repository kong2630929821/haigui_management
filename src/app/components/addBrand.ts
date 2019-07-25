import { popNew } from '../../pi/ui/root';
import { Widget } from '../../pi/widget/widget';
import { addBrand, changeBrand } from '../net/pull';
import { popNewMessage } from '../utils/logic';
import { rippleShow } from '../utils/tools';
interface Props {
    title:string;
    sureText:string;
    cancelText:string;
    inputValue:string;// 输入品牌名
    style:boolean;// true添加 false编辑
    textArea:string;// 描述
    path:string;// 路径
    src:any;// 图片数组
    img:string;// 图片
    data:any;// 编辑数据
    brand_goods:any;// 品牌下的商品
    brand_id:number;// 品牌ID
}
/**
 * 模态框
 * {title:"提示",content:"温馨提示",sureText:"sure",cancelText:"cancel",itype:"text"}
 * title：标题
 * sureText:确认按钮名称
 * cancelText：取消按钮名称
 */
export class ModalBox extends Widget {
    public props: Props = {
        title:'',
        sureText:'确认',
        cancelText:'取消',
        inputValue:'',
        style:true,
        textArea:'',
        path:'',
        src:[],
        img:'',
        data:[],
        brand_goods:[],
        brand_id:0
        
    };
    public ok: () => void;
    public cancel: () => void;   // fg为false表示退出APP(或点击取消)，true表示忘记密码
    public create() {
        super.create();
        const oData = new Date();
        this.props.path = `goods_brand/${oData.getFullYear()}/${oData.getMonth() + 1}/${oData.getDate()}`;
    }

    public setProps(props:any) {
        this.props = { 
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        if (props.data) {
            this.props.inputValue = this.props.data[1];
            this.props.textArea = this.props.data[3];
            this.props.src = [this.props.data[2],1,1];
            const imgList = this.props.data[2].split('/');
            imgList.pop();
            this.props.path = imgList.join('/');
            this.props.img = this.props.data[2];
            this.props.brand_goods = this.props.data[4];
            this.props.brand_id = this.props.data[0];
        }
       
    }
    // 输入品牌名
    public brandName(e:any) {
        this.props.inputValue = e.value;
    }
    // 输入描述
    public textareaChange(e:any) {
        this.props.textArea = e.value;
    }
    // 图片路径
    public inputIconChange(e:any) {
        this.props.path = e.value;
    }
    /**
     * 点击取消按钮
     */
    public cancelBtnClick() {
        this.cancel && this.cancel();
    }
    // 图片上传
    public updataImg(e:any) {
        this.props.src = [e.src,1,1];
        this.props.img = e.src;
        this.paint();  
    }
    /**
     * 点击确认按钮
     */
    public okBtnClick() {
        const name = this.props.inputValue;
        const description = this.props.textArea;
        if (!name || !description) {
            popNewMessage('请录入品牌信息');

            return;
        }
        if (!this.props.src.length) {
            popNewMessage('请上传图片');

            return;
        }
        
        if (this.props.style) {
            const arr = [[[],4,1],this.props.src,[[],2,1]];
            addBrand(name,arr,this.props.textArea).then(r => {
                if (r.result === 1) {
                    popNewMessage('添加成功');
                    this.ok && this.ok();
                } else {
                    popNewMessage('添加失败');
                }
            }).catch(e => {
                popNewMessage('添加失败');
            });
        } else {
            changeBrand(this.props.brand_id,name,[[[],4,1],this.props.src,[[],2,1]],description,this.props.brand_goods).then(r => {
                if (r.result === 1) {
                    popNewMessage('修改成功');
                    this.ok && this.ok();
                } else {
                    popNewMessage('修改失败');
                }
            }).catch(e => {
                popNewMessage('修改失败');
            });
        }
        
    }

    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }
    
}