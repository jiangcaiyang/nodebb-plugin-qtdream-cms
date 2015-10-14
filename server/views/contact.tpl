<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport"    content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<meta name="author"      content="Jiang caiyang ( qtdream.com )">
	
	<title>联系 - Qt Dream</title>

	<link rel="shortcut icon" href="{publicDir}/assets/images/gt_favicon.png">
	
	<link rel="stylesheet" media="screen" href="http://font.useso.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="{publicDir}/assets/css/bootstrap.min.css">
	<link rel="stylesheet" href="{publicDir}/assets/css/font-awesome.min.css">

	<!-- Custom styles for our template -->
	<link rel="stylesheet" href="{publicDir}/assets/css/bootstrap-theme.css" media="screen" >
	<link rel="stylesheet" href="{publicDir}/assets/css/main.css">

	<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
	<script src="{publicDir}/assets/js/html5shiv.js"></script>
	<script src="{publicDir}/assets/js/respond.min.js"></script>
	<![endif]-->
</head>

<body>
	<!-- IMPORT include/navbar.tpl -->

	<header id="head" class="secondary"></header>

	<!-- container -->
	<div class="container">

		<ol class="breadcrumb">
			<li><a href="/home/index">首页</a></li>
			<li class="active">联系</li>
		</ol>

		<div class="row">
			
			<!-- Article main content -->
			<article class="col-sm-9 maincontent">
				<header class="page-header">
					<h1 class="page-title">联系我们</h1>
				</header>
				
				<p>
					我们希望与您一同分享成功的喜悦，也希望倾听您的声音。您对我们的工作有什么意见和建议，或是您有意与我们一起工作成长，那么请填写以下表格，我们将尽快与您联系。
				</p>
				<br>
					<form>
						<div class="row">
							<div class="col-sm-4">
								<input class="form-control" type="text" placeholder="姓名">
							</div>
							<div class="col-sm-4">
								<input class="form-control" type="text" placeholder="电子邮箱">
							</div>
							<div class="col-sm-4">
								<input class="form-control" type="text" placeholder="电话号码">
							</div>
						</div>
						<br>
						<div class="row">
							<div class="col-sm-12">
								<textarea placeholder="在这儿输入您想说的话……" class="form-control" rows="9"></textarea>
							</div>
						</div>
						<br>
						<div class="row">
							<!--<div class="col-sm-6">
								<label class="checkbox"><input type="checkbox"> Sign up for newsletter</label>
							</div>-->
							<div class="col-sm-6 text-right">
								<input class="btn btn-action" type="submit" value="发送消息">
							</div>
						</div>
					</form>
			</article>
			<!-- /Article -->
			
			<!-- Sidebar -->
			<aside class="col-sm-3 sidebar sidebar-right">

				<div class="widget">
					<h4>联系地址</h4>
					<address>
						中国上海市浦东新区传奇广场三楼浦东创客中心
					</address>
					<h4>联系电话</h4>
					<address>
						+8613661787941
					</address>
					<p>请在联系之前以短信通知之</p>
				</div>

			</aside>
			<!-- /Sidebar -->

		</div>
	</div>	<!-- /container -->
	
	<section class="container-full top-space">
		<div id="map"></div>
	</section>

	<!-- IMPORT include/footer.tpl -->

	<!-- JavaScript libs are placed at the end of the document so the pages load faster -->
	<script src="http://cdn.bootcss.com/jquery/1.10.2/jquery.min.js"></script>
	<script src="http://cdn.bootcss.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
	<script src="{publicDir}/assets/js/headroom.min.js"></script>
	<script src="{publicDir}/assets/js/jQuery.headroom.min.js"></script>
	<script src="{publicDir}/assets/js/template.js"></script>
	
	<!-- Google Maps -->
	<script src="https://maps.googleapis.com/maps/api/js?key=&amp;sensor=false&amp;extension=.js"></script> 
	<script src="{publicDir}/assets/js/google-map.js"></script>
	

</body>
</html>