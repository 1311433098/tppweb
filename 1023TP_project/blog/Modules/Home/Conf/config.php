<?php
//前台配置
return array(
	//设置布局路径
	'LAYOUT_NAME'=>'layouts/home',
	
	//设置资源文件夹的路径
	'TMPL_PARSE_STRING'=>array(
		'__RES__'=>dirname($_SERVER['SCRIPT_NAME'])."/".APP_NAME."/Modules/".GROUP_NAME."/Resource",
	),


);