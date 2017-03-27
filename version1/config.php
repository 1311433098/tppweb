<?php 

defined('MY_CHECK_ROOT') OR exit('not allowed ');

/**
 * 采用建议全局配置数组形式 可在全局范围内使用
 */
//------------------------------------------------------ 

//TODO 之后考虑独立配置读取和写入函数进行统一管理
 
$cofig_arr = array();


$config['csrf_protection'] = TRUE;		//是够开启 暂时保留
$config['csrf_token_name'] = 'wy100_csrf_token';
$config['csrf_cookie_name'] = 'wy100_csrf_cookie';
$config['csrf_expire'] = 7200;			//过期时间



//待完善
//......................................................