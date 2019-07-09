// tslint:disable-next-line:missing-jsdoc
import { notify } from '../../../pi/widget/event';
import { Widget } from '../../../pi/widget/widget';
import { mallImagPre } from '../../config';
import { addGroup, delGroup } from '../../net/pull';
import { popNewMessage } from '../../utils/logic';

interface Props {
    currentData:any;// 当前数据
    addClass:boolean;  // 添加新的二级分类
    mallImagPre:string;// 图片路径
    firstName:string;  // 一级分类名字
    secondName:string; // 二级分类名字
    secondImg:string;  // 二级分类图片
}
// 图片类型枚举
export enum ImageType {
    THUMBNAIL = 1,   // 缩略图
    MAIN = 2,       // 主图
    DETAIL = 3,      // 详情图
    ICON = 4          // 小图 图标
}
/**
 * 添加分类
 */
// tslint:disable-next-line:completed-docs
export class AddClass extends Widget {
    public props:Props = {
        currentData:{
            name:'',
            children:[]
        },
        addClass:false,
        mallImagPre:mallImagPre,
        firstName:'',
        secondName:'',
        secondImg:''
    };
    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        this.props.firstName = props.currentData.name;
    }

    // 输入一级分类
    public firstNameChange(e:any) {
        this.props.firstName = e.value;
    }

    // 输入二级分类
    public secondNameChange(e:any) {
        this.props.secondName = e.value;
    }

    // 上传图片
    public secondImgUpload(e:any) {
        this.props.secondImg = 'aaaa';
    }

    // 添加一个二级分类编辑
    public addBtn() {
        this.props.addClass = true;
        this.paint();
    }

    // 添加二级分类编辑
    public delBtn() {
        this.props.addClass = false;
        this.paint();
    }

    // 添加一级分类
    public addClass(e:any) {
        if (!this.props.firstName) {
            popNewMessage('一级分类名称不能为空');

        } else if (this.props.addClass) {
            popNewMessage('请先保存二级分类');

        } else {
            const data = this.props.currentData.children.map(r => r.id);
            addGroup(this.props.firstName, [], data).then(r => {
                popNewMessage('保存成功');
                this.goBack(e);
            }).catch(r => {
                popNewMessage('保存失败');
            });

        }
    }

    // 添加二级分类
    public addSecondClass() {
        if (!this.props.secondName || !this.props.secondImg) {
            popNewMessage('二级分类信息未填写完整');

        } else {
            addGroup(this.props.secondName,[[this.props.secondImg, ImageType.THUMBNAIL,1]],[]).then(r => {
                this.props.currentData.children.push({
                    id:r,
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

    // 删除二级分类
    public delSecondClass(ind:number) {
        this.props.currentData.children.splice(ind,1);
        this.paint();
    }

    // 删除一级分类
    public delClass() {
        delGroup(this.props.currentData.id).then(r => {
            popNewMessage('删除成功');
        }).catch(r => {
            if (r.type === 2141) {
                popNewMessage('分组被使用不能删除');
            } else {
                popNewMessage('删除失败');
            }
        });
    }

    public goBack(e:any) {
        notify(e.node,'ev-detail-back',{});
    }
}