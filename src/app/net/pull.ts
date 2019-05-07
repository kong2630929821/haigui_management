import { GoodsDetails, Level1Groups, Level2Groups, MallImages, setStore } from '../store/memstore';

/**
 * 通信接口
 */

 // 获取分组信息
export const getGroups = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            const groups = new Map<number, Level1Groups>();
            console.time('getGroups');
            for (let i = 0;i < 40;i++) {
                const childs = new Map<number, Level2Groups>();
                for (let j = 0;j < 10;j++) {
                    const goods = [];
                    for (let k = 0;k < 10;k++) {
                        const goodsId = Math.floor(Math.random() * 100000);
                        const good:GoodsDetails = {
                            id:goodsId,
                            name:`商品${goodsId}`,
                            pay_type:1,
                            cost:1000,
                            tax:0,
                            origin:1200,
                            discount:1100,
                            images:[`a${goodsId % 4 + 1}.png`],
                            intro:`商品${goodsId}的详细介绍`,
                            labels:undefined,
                            brand:undefined,
                            area:undefined,
                            supplier:undefined,
                            weight:undefined,
                            spec:undefined,
                            detail:undefined,
                            out:undefined,
                            total_out:undefined,
                            in:undefined
                        };
                        goods.push(good);
                    }

                    const l2id = Math.floor(Math.random() * 100000);
                    const image:MallImages = {
                        path:`a${l2id % 4 + 1}.png`,
                        type:1,
                        style:1
                    };
                    const level2Groups:Level2Groups = {
                        id:l2id,
                        name:`分组${l2id}`,
                        type:false,
                        images:[image],
                        detail:`这是分组${l2id}的描述`,
                        goods
                    };
                    childs.set(l2id,level2Groups);
                }
                
                const l1id = Math.floor(Math.random() * 100000);
                const image:MallImages = {
                    path:`a${l1id % 4 + 1}.png`,
                    type:1,
                    style:1
                };
                const level1Groups:Level1Groups = {
                    id:l1id,
                    name:`分组${l1id}`,
                    type:true,
                    images:[image],
                    detail:`这是分组${l1id}的描述`,
                    location:Math.floor(Math.random() * 10) % 3 + 1,
                    childs
                };
                groups.set(l1id,level1Groups);
            }
            console.timeEnd('getGroups');
            setStore('mall/groups',groups);
            resolve(groups);
        },100);
    });
};