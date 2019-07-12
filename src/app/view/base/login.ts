import { popNew } from '../../../pi/ui/root';
import { Widget } from '../../../pi/widget/widget';
import { getVipMember, login } from '../../net/pull';
import { getStore, setStore } from '../../store/memstore';
import { popNewMessage, unicode2ReadStr } from '../../utils/logic';
import { addressFormat } from '../../utils/tools';
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
                                UserLabel[item[5]]       // 标签
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
                                UserLabel[item[5]]       // 标签
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
                                UserLabel[item[5]]       // 标签
                            ];
                        });
                    }
                });
                setStore('vipTotal',vipTotal);

            }).catch(() => {
                popNewMessage('账号密码错误','error');
            });
        } else {
            popNewMessage('请输入账号密码','warn');
        }
    }
}