import { Widget } from '../../pi/widget/widget';
import { addAccount, addUserToUserType, changeUser, getAllUserType } from '../net/pull';
import { popNewMessage } from '../utils/logic';

// tslint:disable-next-line:missing-jsdoc
interface Props {
    title:string;// 标题
    account:string;// 账号
    password:string;// 密码
    userTypes:any;// 账号类型
    userTypesActiveIndex:number;// 下标
    expandIndex:number;
    cancelText:string;// 取消
    sureText:string;// 确定
    currentData:any;// 当前账户数据
    style:boolean;// 状态  true为添加 false 修改
}

/**
 * 添加账号
 */
export class AddUser extends Widget {
    public props:Props = {
        title:'',
        account:'',
        password:'',
        userTypes:[
            {
                status:0,
                text:'普通'
            },{
                status:1,
                text:'客服'
            }
        ],
        userTypesActiveIndex:0,
        expandIndex:-1,
        cancelText:'取消',
        sureText:'确定',
        currentData:[],
        style:true
    };
    public ok:() => void;
    public cancel:() => void;
 
    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        // 获取所有账号类型
        getAllUserType().then(r => {
            const userType = [];
            if (r.length) {
                r.forEach((v,i) => {
                    userType.push({ status:i,text:v });
                });
                this.props.userTypes = userType;
            }
            // 编辑状态时赋值默认初始值
            if (props.style === false) {
                userType.forEach((item,index) => {
                    if (item.text === props.currentData[1]) {
                        this.props.userTypesActiveIndex = index;
                    }
                });
                // 获取用户信息
                this.props.account = props.currentData[0];
            }
            this.paint();
        }); 
        
    }

    // 账号
    public userAccount(e:any) {
        this.props.account = e.value;
        this.paint;
    }

    // 密码
    public userPassWord(e:any) {
        this.props.password = e.value;
        this.paint();
    }

    // 账户类型切换
    public filterUserTypes(e:any) {
        this.props.userTypesActiveIndex = e.activeIndex;
        this.paint();
    }

    // 取消
    public cancelBtnClick() {
        this.cancel && this.cancel();
    }

    // 保存修改
    public okBtnClick() {
        const name = this.props.account;
        const pass = this.props.password;
        const userType = this.props.userTypes[this.props.userTypesActiveIndex].text;
        if (this.props.style) {
            // 添加
            if (!name) {

                popNewMessage('请填写账号');
    
                return;
            }
            if (!pass) {
    
                popNewMessage('请填写密码');
    
                return;
            }
            addAccount(name,pass).then(r => {
                if (r.result === 1) {
                    addUserToUserType(name,userType).then(res => {
                        if (res.result === 1) {
                            popNewMessage('添加成功');
                            this.ok && this.ok();
                        } else {
                            popNewMessage('绑定账号类型失败');
                        }
                    }).catch(e => {
                        popNewMessage('绑定账号类型失败');
                    });
                }
            }).catch(e => {
                popNewMessage('添加失败');
            });
        } else {
            // 修改账号信息
            if (pass) { 
                changeUser(name,pass).then(r => {
                    if (r.result === 1) {
                        popNewMessage('修改账号成功');
                        this.ok && this.ok();
                    } else {
                        popNewMessage('修改账号失败');
                    }
                }).catch(e => {
                    popNewMessage('修改账号失败');
                });
            }
            // 修改账号权限
            if (this.props.currentData[1] !== userType) {
                addUserToUserType(name,userType).then(res => {
                    if (res.result === 1) {
                        popNewMessage('修改账号类型成功');
                        this.ok && this.ok();
                    } else {
                        popNewMessage('绑定账号类型失败');
                    }
                }).catch(e => {
                    popNewMessage('绑定账号类型失败');
                });
            }

        }
    }
}