<div w-class="page">
    <div w-class="content">
        <img src="../../res/images/defultUser.png" w-class="img"/>
        <div w-class="title">海龟壹号后台管理系统</div>
        <div ev-input-change="nameChange" w-class="input">
            <img src="../../res/images/account.png"/>
            <widget w-tag="app-components-input" style="flex:1 0 0;">{placeHolder:"账号",style:"padding-left:20px"}</widget>
        </div>
        <div ev-input-change="pwdChange" w-class="input">
            <img src="../../res/images/password.png"/>
            <widget w-tag="app-components-input" style="flex:1 0 0;">{placeHolder:"密码",style:"padding-left:20px",itype:"password"}</widget>
        </div>
        <div w-class="btn" on-tap="loginUser">登录</div>
    </div>
</div>