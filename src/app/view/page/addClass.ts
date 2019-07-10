import { notify } from '../../../pi/widget/event';
import { Widget } from '../../../pi/widget/widget';
import { GroupsLocation, mallImagPre } from '../../config';
import { addGroup, updateGroup, updateLocation } from '../../net/pull';
import { getStore, ImageType } from '../../store/memstore';
import { popNewMessage } from '../../utils/logic';

interface Props {
    currentData:any;// 当前数据
    addClass:boolean;  // 添加新的二级分类
    mallImagPre:string;// 图片路径
    secondName:string; // 二级分类名字
    secondImg:string;  // 二级分类图片
    addNewClass:boolean;  // 新增一级分组
}

/**
 * 添加分类
 */
// tslint:disable-next-line:completed-docs
export class AddClass extends Widget {
    public groupIDs:number[];  // 当前跟分组下的所有分组ID
    public props:Props = {
        currentData:{
            id:0,
            name:'',
            children:[]
        },
        addClass:false,
        mallImagPre:mallImagPre,
        secondName:'',
        secondImg:'',
        addNewClass:true
    };
    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        const locations = getStore('locations',[]);
        const index = locations.findIndex(r => r.location === GroupsLocation.CLASSIFICATION); 
        this.groupIDs = index > -1 ? locations[index].children :[];
    }

    // 输入一级分类
    public firstNameChange(e:any) {
        this.props.currentData.name = e.value;
    }

    // 输入二级分类
    public secondNameChange(e:any) {
        this.props.secondName = e.value;
    }

    // 上传图片
    public secondImgUpload(e:any) {
        this.props.secondImg = e.src;
    }

    // 添加二级分类编辑
    public addBtn() {
        this.props.addClass = true;
        this.paint();
    }

    // 删除二级分类编辑
    public delBtn() {
        this.props.addClass = false;
        this.paint();
    }

    // 添加一级分类
    public addClass(e:any) {
        if (!this.props.currentData.name) {
            popNewMessage('一级分类名称不能为空');

        } else if (this.props.addClass) {
            popNewMessage('请先保存二级分类');

        } else if (this.props.addNewClass) {  // 新增一级分组
            const data = this.props.currentData.children.map(r => r.id);
            const locId = GroupsLocation.CLASSIFICATION;
            addGroup(this.props.currentData.name, [], data, 'true').then(r => {
                this.groupIDs.push(r.id[0]);
                updateLocation(locId, this.groupIDs).then(r => {  // 将跟分组绑定到location上
                    popNewMessage('保存成功');
                    this.goBack(e);
                });
                
            }).catch(r => {
                popNewMessage('保存失败');
            });

        } else {  // 修改一级分类
            const curData = this.props.currentData;
            const ids = curData.children.map(r => r.id);
            updateGroup(curData.id, curData.name, curData.imgs, ids, 'true').then(r => {
                popNewMessage('保存成功');
                this.goBack(e);
    
            }).catch(r => {
                popNewMessage('保存失败');
            });
        }
    }

    // 删除一级分类（从根分组中移除）
    public delClass(e:any) {
        const locId = GroupsLocation.CLASSIFICATION;
        const index = this.groupIDs.findIndex(r => r === this.props.currentData.id); 
        index > -1 && this.groupIDs.splice(index,1);
        updateLocation(locId, this.groupIDs).then(r => {  // 将跟分组绑定到location上
            popNewMessage('删除成功');
            this.goBack(e);
        });
    }

    // 添加二级分类
    public addSecondClass() {
        if (!this.props.secondName || !this.props.secondImg) {
            popNewMessage('二级分类信息未填写完整');

        } else {
            addGroup(this.props.secondName,[[this.props.secondImg, ImageType.THUMBNAIL,1]],[],'false').then(r => {
                this.props.currentData.children.push({
                    id:r.id[0],
                    name:this.props.secondName,
                    imgs:[[this.props.secondImg, ImageType.THUMBNAIL,1]]
                });
                this.props.secondName = '';
                this.props.secondImg = '';
                this.paint();
                popNewMessage('保存成功');
            }).catch(r => {
                popNewMessage('保存失败');
            });
        }
    }

     // 修改二级分类
    public upSecondClass(ind:number) {
        const res = this.props.currentData.children[ind];
        updateGroup(res.id,res.name,[],[],'false').then(r => {
            this.props.secondName = '';
            this.paint();
            popNewMessage('保存成功');
        }).catch(r => {
            popNewMessage('保存失败');
        });
    }

    // 删除二级分类
    public delSecondClass(ind:number) {
        this.props.currentData.children.splice(ind,1);
        this.paint();
    }

    public goBack(e:any) {
        notify(e.node,'ev-detail-back',{});
    }
}