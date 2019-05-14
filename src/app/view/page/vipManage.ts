import { Widget } from '../../../pi/widget/widget';

/**
 * 会员管理
 */
export class VipManage extends Widget {
    public props:any = {
        showDataList:[
            ['123456','张三','15534429570','四川省成都市金牛区XX街道XX小区XX','￥1200','￥1200'],
            ['123456','张三','15534429570','四川省成都市金牛区XX街道XX小区XX','￥1200','￥1200'],
            ['123456','张三','15534429570','四川省成都市金牛区XX街道XX小区XX','￥1200','￥1200'],
            ['123456','张三','15534429570','四川省成都市金牛区XX街道XX小区XX','￥1200','￥1200'],
            ['123456','张三','15534429570','四川省成都市金牛区XX街道XX小区XX','￥1200','￥1200']
        ],
        showTitleList:['用户ID','姓名','手机号','地址信息','ta的本月收益','ta的总收益'],
        showDetail:false
    };

    public goDetail() {
        this.props.showDetail = true;
        this.paint();
    }

    public detailBack() {
        this.props.showDetail = false;
        this.paint();
    }
}