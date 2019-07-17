import { popNew } from '../../../pi/ui/root';
import { Widget } from '../../../pi/widget/widget';
import { getAllProduct, getVipMember, login } from '../../net/pull';
import { getStore, setStore } from '../../store/memstore';
import { popNewMessage, unicode2ReadStr } from '../../utils/logic';
import { addressFormat, timestampFormat } from '../../utils/tools';
const UserLabel = ['','市代理','省代理'];
/**
 * 登陆
 */
export class Login extends Widget {
    public props:any = {
        name:'',
        pwd:''
    };

    public nameChange(e:any) {
        this.props.name = e.value;
    }

    public pwdChange(e:any) {
        this.props.pwd = e.value;
    }

    public keydown(e:any) {
        if (e.value === 'Enter') {
            this.loginUser();
        }
    }

    public loginUser() {
        if (this.props.name && this.props.pwd) {
            login(this.props.name,this.props.pwd).then(r => {
                popNew('app-view-base-home');
                
                // 登录成功获取会员信息
                const vipTotal = getStore('vipTotal',{});
                getVipMember().then(r => {
                    vipTotal.hBaoNum = r.haib_count;
                    vipTotal.hWangNum = r.haiw_count;
                    vipTotal.baikNum = r.baik_count;
                    if (r.haib) {
                        vipTotal.hBaoDatas = r.haib.map(item => {
                            return [
                                item[0],           // uid
                                unicode2ReadStr(item[1]),           // 微信名
                                item[2],           // 手机号
                                addressFormat(item[3]),           // 地址信息
                                `￥${item[4] / 100}`,            // ta的总收益
                                timestampFormat(item[6]),// 注册时间
                                item[7],// 邀请人ID
                                unicode2ReadStr(item[8]),// 邀请人名字
                                UserLabel[item[5]]     // 标签
                            ];
                        });
                    }
                    if (r.haiw) {
                        vipTotal.hWangDatas = r.haiw.map(item => {
                            return [
                                item[0],           // uid
                                unicode2ReadStr(item[1]),           // 微信名
                                item[2],           // 手机号
                                addressFormat(item[3]),           // 地址信息
                                `￥${item[4] / 100}`,            // ta的总收益
                                timestampFormat(item[6]),// 注册时间
                                item[7],// 邀请人ID
                                unicode2ReadStr(item[8]),// 邀请人名字
                                UserLabel[item[5]]     // 标签
                            ];
                        });
                    }
                    if (r.baik) {
                        vipTotal.baikDatas = r.baik.map(item => {
                            return [
                                item[0],           // uid
                                unicode2ReadStr(item[1]),           // 微信名
                                item[2],           // 手机号
                                addressFormat(item[3]),           // 地址信息
                                `￥${item[4] / 100}`,            // ta的总收益
                                timestampFormat(item[6]),// 注册时间
                                item[7],// 邀请人ID
                                unicode2ReadStr(item[8]),// 邀请人名字
                                UserLabel[item[5]]     // 标签
                            ];
                        });
                    }
                    setStore('vipTotal',vipTotal);
                });
                // 登录成功获取SKU
                const skuTotal = getStore('skuTotal',{});
                const oData = new Date();
                const time = oData.setHours(23, 59, 59, 999);
                getAllProduct(0,time).then(r => {
                    skuTotal.skuNum = r[0];
                    skuTotal.skuData = r[1];
                    setStore('skuTotal',skuTotal);
                });

            }).catch(() => {
                popNewMessage('账号密码错误','error');
            });
        } else {
            popNewMessage('请输入账号密码','warn');
        }
    }
}