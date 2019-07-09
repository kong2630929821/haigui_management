import { GroupsLocation } from '../config';
import { unicode2Str } from '../utils/logic';

/**
 * 数据处理
 */
export const parseAllGroups = (location:GroupsLocation,groupsInfo:any) => {
    const groups = [];
    for (const v of groupsInfo) {
        groups.push(parseGroups(location,v));
    }

    return groups;
};

/**
 * 分组数据处理
 */
export const parseGroups = (location:GroupsLocation,info:any) => {
    const itype = info[2] === 'true' ? true : false;
    const childsOrigin = info[6];
    const childs = [];  
    let ret = {};
    if (itype) {  // 子组  
        for (const v of childsOrigin) {
            childs.push(parseGroups(location,v));
        }
    } 
   
    ret = {
        id:info[0],   // 分组id
        name:unicode2Str(info[1]),   // 分组名
        type:itype,   // 组类型，分为子组和叶组，子组可以包含任意的其它子组或叶组，叶组只允许包含商品
        is_show:info[3] === 'true' ? true : false,
        images:info[4] || [],   // 分组包含的图片列表
        detail:info[5],  // 分组详细描述
        location,  // 分组在前端的位置，例如商城首页，分类首页等
        childs       // 二级分组信息
    };

    return ret;
};