<?php 
// +----------------------------------------------------------------------
// + 安全过滤文件
// +-----------------------------------------------------------------------
// + @time: 2017-03-13
// +----------------------------------------------------------------------

//-------------------------------------------------------------------------
/**
 * @notice：
 *  
 * 使用时只需导入此入口文件即可，详细说明文档待补充
 */

define("MY_CHECK_ROOT", "./"); 

//TRUE表示开启，false表示关闭
define("MY_CHECK_USE",true);	

/** 没有自动加载机制 需手动导入核心类文件 **/
require_once( MY_ROOT.'core/SecurityCheck.php');
require_once( MY_ROOT.'function.php');

