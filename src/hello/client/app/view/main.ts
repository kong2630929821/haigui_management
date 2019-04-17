/**
 * 项目首页面
 */
import { Widget } from '../../../../pi/widget/widget';
import { helloWorld } from '../../../server/data/test.p';
import { clientRpcFunc } from '../net/init';

export class Main extends Widget {
    public props:any = {
        res:''    
    };

    public doClick() {
        clientRpcFunc(helloWorld,'123',(r) => {
            this.props.res = r;
            this.paint();
        });
    }
}
