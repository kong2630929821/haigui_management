import { popNew } from '../../../pi/ui/root';
import { deepCopy } from '../../../pi/util/util';
import { notify } from '../../../pi/widget/event';
import { Widget } from '../../../pi/widget/widget';
import { GroupsLocation } from '../../config';
import { addGroup, updateGroup, updateLocation } from '../../net/pull';
import { getStore, GroupInfo, ImageType } from '../../store/memstore';
import { popNewMessage } from '../../utils/logic';
import { rippleShow } from '../../utils/tools';

interface Props {
    locations: any[]; // 展示位置
    addClass:boolean;  // 添加新的二级分类
    activeLoc:number;  // 当前选择的位置
    currentData:GroupInfo;// 当前编辑的数据
    secondName:string;  // 新增二级分类名称
    secondImg:string;  // 二级分类图片
    addNewClass:boolean;  // 新增一级分组
    selGoodsIndex:number;    // 去选择商品的二级分类下标
    goodsId:number[];   // 已选择的商品ID
    isSoloPart:boolean;  // 是否当前选择的单链专区
    isMallHome:boolean;  // 是否商城首页分类设置
    expandIndex:boolean;
}

/**
 * 商城配置编辑详情
 */
export class MallSettingEdit extends Widget {
    public groupIDs:number[];  // 原始跟分组下的所有分组ID
    public props: Props = {
        locations: [
            { text: '不可见', status: 0 },   // 不可见分类 不属于商城首页
            { text: '头部banner1', status: GroupsLocation.FIRST },
            { text: '小图标位置2', status: GroupsLocation.SECOND },
            { text: '聚合区位置3', status: GroupsLocation.THIRD },
            { text: '聚合区位置4', status: GroupsLocation.FOUR },
            { text: '聚合区位置5', status: GroupsLocation.FIVE },
            { text: '聚合区位置6', status: GroupsLocation.SIX },
            { text: '聚合区位置7', status: GroupsLocation.SEVEN },
            { text: '聚合区位置8', status: GroupsLocation.EIGHT },
            { text: '聚合区位置9', status: GroupsLocation.NINE },
            { text: '聚合区位置10', status: GroupsLocation.TEN },
            { text: '聚合区位置11', status: GroupsLocation.ELEVEN },
            { text: '聚合区位置12', status: GroupsLocation.TWLEVE },
            { text: '聚合区位置13', status: GroupsLocation.THIRTEEN },
            { text: '单链专区位置14', status: GroupsLocation.FOURTEEN },
            { text: '单链专区位置15', status: GroupsLocation.FIFTEEN },
            { text: '单链专区位置16', status: GroupsLocation.SIXTEEN },
            { text: '单链专区位置17', status: GroupsLocation.SEVENTEEN }
        ],
        addClass:false,
        activeLoc:0,
        currentData:{
            id: 0,
            name: '',
            groupType: true,    // 是否有子分组
            isShow: true,       // 是否展示分组
            imgs: [],
            detail: '',
            children: [],    // 二级分组  商品ID
            time: '',   // 最后更新时间
            localId: GroupsLocation.FIRST 
        },
        secondName:'',
        secondImg:'',
        addNewClass:false,
        selGoodsIndex:-1,
        goodsId:[],
        isSoloPart:false,
        isMallHome:true,
        expandIndex:false
    };

    public setProps(props:any) {
        this.props = {
            ...this.props,
            ...props
        };
        super.setProps(this.props);
        const index = this.props.locations.findIndex(r => r.status === this.props.currentData.localId);
        this.props.activeLoc = index > -1 ? index :0;
        this.props.isSoloPart = index > 13;

        const locations = getStore('locations',[]);
        const num = locations.findIndex(r => r.location === this.props.currentData.localId); 
        this.groupIDs = num > -1 ? locations[num].children :[];
        console.log('!!!!!!!!!!!!!!!!!!!!!MallSettingEdit',this.props);
    }
    public goBack(e: any) {
        notify(e.node, 'ev-detail-back', {});
    }

    // 选择展示位置
    public selLocation(e:any) {
        this.props.activeLoc = e.activeIndex;
        this.props.expandIndex = false;
        if (this.props.activeLoc > 13) {
            this.props.addClass = false;
            this.props.isSoloPart = true;
            popNewMessage('单链专区不能添加二级分类');
        } else {
            this.props.isSoloPart = false;
        }
        this.paint();

    }

    // 添加一个二级分类编辑 (如果是单链专区则是去选择商品)
    public addBtn() {
        if (this.props.isSoloPart) {
            this.props.selGoodsIndex = 0;
            this.props.goodsId = deepCopy(this.props.currentData.children);
            this.props.addClass = false;
        } else {
            this.props.addClass = true;
        }
        this.paint();
    }
    
    // 删除二级分类编辑
    public delBtn() {
        this.props.addClass = false;
        this.paint();
    }

    // 输入一级分类名称
    public firstNameChange(e:any) {
        this.props.currentData.name = e.value;
    }

    // 输入二级分类
    public secondNameChange(e:any,i:number) {
        if (i === -1) {
            this.props.secondName = e.value;
        } else {
            this.props.currentData.children[i].name = e.value;
            this.props.currentData.children[i].isChange = true;
        }
    }

    // 修改专区图片
    public imgUpload(e:any,ind:number) {
        const style = ind ? ImageType.MAIN :ImageType.THUMBNAIL;
        this.props.currentData.imgs[ind] = [e.src,style,1];
        this.paint();
    }

    // 上传二级分类图片
    public secondImgUpload(e:any,i:number) {
        if (i === -1) {
            this.props.secondImg = e.src;
        } else {
            this.props.currentData.children[i].imgs[0] = [e.src,1,1];
            this.props.currentData.children[i].isChange = true;
        }
        this.paint();
    }

    // 保存一级分类
    public addClass(e:any) {
        if (!this.props.currentData.name) {
            popNewMessage('一级分类名称不能为空');

            return;
        } 
        if (this.props.isMallHome && this.props.currentData.imgs.length < 2) {
            popNewMessage('请先上传专区图片');
            
            return;
        }
        if (this.props.addClass) {
            popNewMessage('请先保存二级分类');

            return;
        } 
        const curData = this.props.currentData;
        let ids = curData.children.map(r => r.id);
        if (this.props.isSoloPart && ids.length > 0) {
            popNewMessage('单链专区不能添加二级分类');

            return;
        }
        if (this.props.isSoloPart && this.props.goodsId.length !== 1) {
            popNewMessage('单链专区只能且必须选择一个商品');
            
            return;
        } 
        if (this.props.isSoloPart) {
            ids = this.props.goodsId;   // 单链专区的下级为商品ID
        }

        if (this.props.addNewClass) {  // 新增一级分组
            addGroup(curData.name, curData.imgs, ids, JSON.stringify(!this.props.isSoloPart)).then(r => {
                this.initLocation(e,r.id[0],true);
            }).catch(r => {
                popNewMessage('保存失败');
            });

        } else {  // 修改一级分类
            updateGroup(curData.id, curData.name, curData.imgs, ids, JSON.stringify(!this.props.isSoloPart)).then(r => {
                this.initLocation(e,curData.id,false);

            }).catch(r => {
                popNewMessage('保存失败');
            });
        }
        
    }

    // 更新位置信息 isNew 新增分组
    public async initLocation(e:any,groupId:number,isNew:boolean) {
        let newId = 0;
        if (this.props.isMallHome) {
            // 商城首页 当前选择的新位置
            newId = this.props.locations[this.props.activeLoc].status;
        } else {
            // 分类汇总页
            newId = GroupsLocation.CLASSIFICATION;
        }
        const orgId = this.props.currentData.localId;  // 原位置
        const locations = getStore('locations',[]);
        const index = locations.findIndex(r => r.location === newId); 
        const newGroups = index > -1 ? locations[index].children :[];   // 新位置下的分组
        
        const orgInd = this.groupIDs.findIndex(r => r === groupId);   // 原位置是否存在该分组
        const newInd = newGroups.findIndex(r => r === groupId);   // 新位置是否存在该分组

        try {
            // 切换位置 先从原位置删除
            if (!isNew && orgInd > -1) {
                if (orgId === newId) {   // 没有切换则直接退出
                    popNewMessage('保存成功');
                    this.goBack(e);

                    return;
                }

                this.groupIDs.splice(orgInd,1);
                await updateLocation(orgId, this.groupIDs);
            }

            // 新位置没有该分组 添加到新位置
            if (newInd === -1) {
                newGroups.push(groupId);
                await updateLocation(newId, newGroups);  // 将分组绑定到新位置
            }
            popNewMessage('保存成功');
            this.goBack(e);

        } catch (err) {
            popNewMessage('保存失败了');
        }
        
    }

    // 删除一级分类（从根分组中移除）
    public delClass(e:any) {
        if (this.props.currentData.children.length === 0) {
            popNew('app-components-modalBox',{ content:'删除分类后，将无法找回，请谨慎操作！' },() => {
                const locId = this.props.currentData.localId;
                const index = this.groupIDs.findIndex(r => r === this.props.currentData.id); 
                index > -1 && this.groupIDs.splice(index,1);
                updateLocation(locId, this.groupIDs).then(r => {  // 将跟分组绑定到location上
                    popNewMessage('删除成功');
                    this.goBack(e);
                });
            });
        } else {
            popNewMessage('该分组下还有子分组或商品，不能删除');
        }
    }

    // 添加二级分类
    public addSecondClass() {
        if (!this.props.secondName) {
            popNewMessage('分类名称不能为空');

            return;
        } 
        if (!this.props.isMallHome && !this.props.secondImg) {
            popNewMessage('分类图片不能为空');

            return;
        }
        const imgs = [];
        if (this.props.secondImg) {
            imgs.push([this.props.secondImg, ImageType.THUMBNAIL,1]);
        }
        addGroup(this.props.secondName, imgs, [],'false').then(r => {
            this.props.currentData.children.push({
                id:r.id[0],
                name:this.props.secondName,
                imgs,
                groupType: true,    // 是否有子分组
                isShow: true,       // 是否展示分组
                detail: '',
                children: [],    // 二级分组  商品ID
                time: '',   // 最后更新时间
                localId:0 
            });
            this.props.secondName = '';
            this.props.secondImg = '';
            this.paint();
            popNewMessage('保存成功');
        }).catch(r => {
            popNewMessage('保存失败');
        });
    }

    // 去选择商品
    public chooseGoods(ind:number) {
        this.props.selGoodsIndex = ind;
        this.props.goodsId = deepCopy(this.props.currentData.children[ind].children);
        this.paint();
    }

    // 修改二级分类 
    public saveSecondClass(ind:number) {
        const res = this.props.currentData.children[ind];
        // 未做改变未选择过商品不执行请求
        if (!res.isChange && this.props.selGoodsIndex === -1) { 
            return;
        }  
        if (!res.name) {
            popNewMessage('分类名称不能为空');

            return;
        } 
        if (!this.props.isMallHome && !res.imgs[0]) {
            popNewMessage('分类图片不能为空');
            
            return;
        }
        updateGroup(res.id, res.name, res.imgs, this.props.goodsId, 'false').then(r => {
            this.props.currentData.children[ind].children = this.props.goodsId;
            this.props.secondName = '';
            this.props.secondImg = '';
            this.cancelSel();
            popNewMessage('保存成功');
        }).catch(r => {
            popNewMessage('保存失败');
        });
    }

    // 删除二级分类
    public delSecondClass(ind:number) {
        if (this.props.currentData.children[ind].children.length === 0) {   // 没有子集才能删除
            popNew('app-components-modalBox',{ content:'确认要从当前分类中移除该子分类，保存即生效' },() => {
                this.props.currentData.children.splice(ind,1);
                this.paint();
            });
        } else {
            popNewMessage('该分组下还有商品，不能删除');
        }
    }

    // 确认选择商品 并保存二级分类
    public selectGoods(e:any) {
        this.props.goodsId = e.value;
        if (this.props.isSoloPart) {  // 单链专区选择的商品不保存在二级分类
            this.props.selGoodsIndex = -1;   // 关闭选择商品页面
            this.paint();

        } else {
            this.saveSecondClass(this.props.selGoodsIndex);
        }
        
    }

    // 取消选择商品
    public cancelSel() {
        this.props.selGoodsIndex = -1;
        this.props.goodsId = [];
        this.paint();
    }

    // 动画效果执行
    public onShow(e:any) {
        rippleShow(e);
    }

    public expand(e:any) {
        this.props.expandIndex = e.value;
        this.paint();
    }

    public close() {
        this.props.expandIndex = false;
        this.paint();
    }
}