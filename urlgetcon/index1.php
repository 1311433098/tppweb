<?php
echo time();
$url = 'http://weixin.sogou.com/weixin?oq=&query=%E5%8D%A7%E5%AE%A4&_sug_type_=1&sut=0&lkt=0%2C0%2C0&ri=4&_sug_=n&type=2&sst0=1465199943997&page=5&ie=utf8&p=40040108&dp=1&w=01015002&dr=1';

$pattern = "/<a href=\"(http:\/\/mp.weixin\b.*?)\".*?>(.*?)<\/a>/i";//正则获取标题链接

// $pattern1 = '/<div id="page-content">(.*?)<\/div>/i';//正则

$str = file_get_contents($url);

preg_match_all ($pattern,$str,$arr);

// var_dump($arr);
foreach($arr as $k=>$v){
	
	foreach($v as $key=>$val){
		
		if($k==2){//获取标题
			$article[$key]['title'] =  strip_tags($val);
		}
		
		if($k==1){	//获取内容
			$article[$key]['con'] = $val;
		}
		
		$article[$key]['post_date'] = time();
	}
}

var_dump($article);