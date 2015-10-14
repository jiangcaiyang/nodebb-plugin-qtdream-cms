<!-- Fixed navbar -->
<div class="navbar navbar-inverse navbar-fixed-top headroom" >
    <div class="container">
        <div class="navbar-header">
            <!-- Button for smallest screens -->
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
            <a class="navbar-brand" href="index"><img src="{publicDir}/assets/images/logo.png" alt="Progressus HTML5 template"></a>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav pull-right">
                <li class="active"><a href="/">首页</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">产品<b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a href="/home/take-medicine">吃药了</a></li>
                        <li><a href="/home/ten-days-lay-ghost">十日驱鬼记</a></li>
                        <li><a href="/category/7">一号项目</a></li>
                    </ul>
                </li>
                <li><a href="/category/6">博客</a></li>
                <li><a href="/home/about">关于</a></li>
                <li><a href="/home/contact">联系</a></li>
                <!-- IF userName -->
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">{userName}<b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="/category/6">发表文章</a></li>
                            <li><a href="/categories">转到论坛</a></li>
                        </ul>
                    </li>
                <!-- ENDIF userName -->
                <!-- IF !userName -->
                <li><a href="/categories">论坛</a></li>
                <!-- ENDIF !userName -->
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</div>
<!-- /.navbar -->