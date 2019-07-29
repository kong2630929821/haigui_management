import { Widget } from '../../pi/widget/widget';
import { addRightsGroups, changeRightsGroups, getAllUserType } from '../net/pull';
import { popNewMessage } from '../utils/logic';
import { rippleShow } from '../utils/tools';
import { RightsGroups, RightsGroupsShow } from '../view/base/home';

interface Props {
    cancelText:string;// 取消
    sureText:string;// 确定
    title:string;// 标题
    showDataList:any;// 展示的所有权限
    dataList:any;// 权限值数组
    checkedList:any;// 选择
    name:string;// 名字
    status:boolean;// true为添加 false修改
    currentData:any;// 当前传来的值
    rightGroups:any;// 已有的权限组
}

/**
 * 添加权限
 */
export class AddRightsGroup extends Widget {

    public props:Props = {
        title:'',
        sureText:'确定',
        cancelText:'取消',
        showDataList:[],
        dataList:[],
        checkedList:[],
        name:'',
        status:true,
        currentData:[],
        rightGroups:[]
    };

    public ok:() => void;
    public cancel:() => void;

    public setProps(props:Props) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        this.init();
    }

    // 初始化数据
    public init() {
        for (const key in RightsGroupsShow) {
            this.props.showDataList.push(RightsGroupsShow[key]);
            this.props.checkedList.push(false);
            this.props.dataList.push(RightsGroups[key]);
        }

        // 处理修改的数据
        if (!this.props.status) {
            this.props.name = this.props.currentData[0];
            const data = this.props.currentData[1];
            this.props.dataList.forEach((v,i) => {
                data.forEach(item => {
                    if (v === item) {
                        this.props.checkedList[i] = true;
                    }
                });
            });
        }

        // 已有的权限组
        getAllUserType().then(r => {
            this.props.rightGroups = r[0];
            this.paint();
        });
    }
    // 取消
    public cancelBtnClick() {
        this.cancel && this.cancel();
    }

    // 保存修改
    public okBtnClick() {
        const name = this.props.name;
        const group = [];
        this.props.checkedList.forEach((v,i) => {
            if (v) {
                group.push(this.props.dataList[i]);
            }
        });
        if (this.props.rightGroups.indexOf(name) !== -1) {
            popNewMessage('该名字已存在');

            return;
        }
        if (!name) {
            popNewMessage('请输入名字');

            return;
        }
        if (!group.length) {
            popNewMessage('请选择一种权限');

            return;
        }
        if (this.props.status) {
            // 新增
            addRightsGroups(JSON.stringify(group),name).then(r => {
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
            // 修改
            changeRightsGroups(JSON.stringify(group),name).then(r => {
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

    // 输入权限名字
    public nameChange(e:any) {
        this.props.name = e.value;
    }
    
    // 选中某个权限
    public check(index:number) {
        this.props.checkedList[index] = !this.props.checkedList[index];
        this.paint();
    }
}
