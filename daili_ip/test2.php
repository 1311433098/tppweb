<?php
	$t1 = microtime(true);
	$url1 = 'http://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=%E4%B9%B0%E9%93%BE%E5%90%A7&oq=%E4%B9%B0%E9%93%BE%E5%90%A7&rsv_pq=c18606d50017952e&rsv_t=558cxcXDhN69f1%2F%2BDU8pR22lPSr7DnEhO2ZXGUV9tQ3jkXVXkxASDwxyZ7c&rqlang=cn&rsv_enter=0&rsv_sug3=70&rsv_sug1=74&rsv_sug7=000&rsv_sug2=0&inputT=5&rsv_sug4=1457&rsv_sug=1';
	for($i=0;$i<=100;$i++){
		$res = vspider_get($url1);
	}
	echo  '运行时间：'.( microtime(true) - $t1 )."秒".'<br />';
	echo $res;
	//echo mb_convert_encoding($res, 'gb2312', 'utf-8');
	
	function vspider_get($url){
		$ch2 = curl_init();
		$user_agent = "Baiduspider+(+http://www.baidu.com/search/spider.htm)";//这里模拟的是百度蜘蛛
		curl_setopt($ch2, CURLOPT_URL, $url);
		curl_setopt($ch2, CURLOPT_HEADER, false);
		curl_setopt($ch2, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch2, CURLOPT_REFERER, 'http://www.baidu.com');//这里写一个来源地址，可以写要抓的页面的首页
		curl_setopt($ch2, CURLOPT_USERAGENT, $user_agent);
		$temp=curl_exec($ch2);
		return $temp;
	}
	