/**
 * 分页
 */
// ===========================导入=================
import { notify } from '../../pi/widget/event';
import { Widget } from '../../pi/widget/widget';

// =================================导出==============
interface Props {
    currentIndex:number; // 初始页
    pagesList:number[]; // 默认页数
    pages:number; // 总共页数
}
// tslint:disable-next-line:completed-docs
export class Pagination extends Widget {
    public props:Props = {
        currentIndex:0,
        pagesList:[0,1,2,3,4],
        pages:-1
    };

    // 创建判断显示的页数
    public setProps(props:any) {
        super.setProps(props);
        this.props.pagesList = [0,1,2,3,4];
        if (this.props.pages < this.props.pagesList.length) {
            this.props.pagesList.splice(this.props.pages);
        }
        console.log('=============总页数',this.props);
    }
    // 上一页
    public prep(event:any) {
        if (this.props.currentIndex === 0) {
            return;
        } else if (this.props.currentIndex <= this.props.pagesList[0]) {
            this.props.currentIndex--;
            this.props.pagesList.pop();
            this.props.pagesList.unshift(this.props.currentIndex);
        } else {
            this.props.currentIndex--;
        }
        notify(event.node,'ev-changeCurrent',{ value:this.props.currentIndex });
        this.paint();
    }

    // 下一页
    public next(event:any) {
        if (this.props.currentIndex + 1 === this.props.pages) {
     
            return;
        } else if (this.props.currentIndex >= 4) {
            this.props.currentIndex++;
            this.props.pagesList.shift();
            this.props.pagesList.push(this.props.currentIndex);
        } else {
            this.props.currentIndex++;
        }
        notify(event.node,'ev-changeCurrent',{ value:this.props.currentIndex });
        this.paint();
        
    }

    // 点击页数
    public currentClick(event:any,index:number) {
        this.props.currentIndex = index;
        notify(event.node,'ev-changeCurrent',{ value:this.props.currentIndex });
        this.paint();
    }
}