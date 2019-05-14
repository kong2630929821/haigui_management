import { Widget } from '../../../pi/widget/widget';

/**
 * 开通海王
 */
export class OpenHWang extends Widget {
    public props:any = {
        showDataList:[
            ['123456','张三','15534429570','四川省成都市金牛区XX街道XX小区XX','申请中'],
            ['123456','张三','15534429570','四川省成都市金牛区XX街道XX小区XX','申请中'],
            ['123456','张三','15534429570','四川省成都市金牛区XX街道XX小区XX','申请中'],
            ['123456','张三','15534429570','四川省成都市金牛区XX街道XX小区XX','申请中']
        ],
        showTitleList:['用户ID','姓名','手机号','地址信息','受理状态'],
        activeTab:0
    };

    // 切换tab
    public changeTab(num:number) {
        this.props.activeTab = num;
        this.paint();
    }

    // 处理数据
    public dealWith(e:any) {
        console.log(e.fg);
    }
}