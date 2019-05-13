import { notify } from '../../../pi/widget/event';
import { Widget } from '../../../pi/widget/widget';

/**
 * 会员详情查看
 */
export class VipDetail extends Widget {
    public props:any = {
        titles:['用户ID','姓名','手机号','地址信息','ta的本月收益','ta的总收益'],
        datas: ['123456','张三','15534429570','四川省成都市金牛区XX街道XX小区XX','￥1200','￥1200'],
        showDataList:[
            ['123456','张三','15534429570','四川省成都市金牛区XX街道XX小区XX','￥1200','￥1200'],
            ['123456','张三','15534429570','四川省成都市金牛区XX街道XX小区XX','￥1200','￥1200'],
            ['123456','张三','15534429570','四川省成都市金牛区XX街道XX小区XX','￥1200','￥1200'],
            ['123456','张三','15534429570','四川省成都市金牛区XX街道XX小区XX','￥1200','￥1200'],
            ['123456','张三','15534429570','四川省成都市金牛区XX街道XX小区XX','￥1200','￥1200']
        ],
        showTitleList:['用户ID','姓名','手机号','地址信息','ta的本月收益','ta的总收益'],
        activeTab:0
    };

    public changeTab(num:number) {
        this.props.activeTab = num;
        this.paint();
    }

    public goBack(e:any) {
        notify(e.node,'ev-detail-back',{});
    }
}