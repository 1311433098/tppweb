<?php
	$daili = '190.147.98.147:80';
	
	curl_string('http://www.wy100.com',$daili);
	
	function curl_string($url ,$proxy){
		
		$user_agent = "Mozilla/5.0(Windows;U;Windows NT 5.1;zh-CN;rv;1.9.0.5)Gecko/2008120122Firefox/3.0.5FirePHP0.2.1";
		
		$ch = curl_init();
		
		curl_setopt($ch,CURLOPT_PROXY,$proxy);
	}