
    <div w-class="pagination">
            <ul w-class="ul">
                <li class="btnHover" w-class="prep" on-tap="prep">
                    <img w-class="btnImg" src="../res/images/arrowRight.png" alt=""/>
                </li>
                {{for i,v of it.pagesList}}
                    <li class="liHover" w-class="li {{it.currentIndex===v?'actived':''}}" on-tap="currentClick(e,{{v}})">{{v+1}}</li>
                {{end}}
                <li class="btnHover" w-class="next" on-tap="next">
                    <img w-class="btnImg" src="../res/images/ArrowRight.png" alt=""/>
                </li>
            </ul>
        </div>
    