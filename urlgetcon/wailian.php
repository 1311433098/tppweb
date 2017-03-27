<?php



$url = 'http://mp.weixin.qq.com/s?src=3&timestamp=1466047996&ver=1&signature=kfYcJ4g0OKfhumEson3vu1wcjGwI6u6MH4nXztxgLRiCcPFEBdENPOLuUUfixTPamSbivUYt9HOSB7*DfLbpDXtBNUeyNsNMcPEYjaoB-WNFPz2bqcrrlgpggZOPlTP0UB9a-e1Rv*jBRYFBMHykno3*-NWK0ibvrCu9kXVT0H4=';//这是你的微信网址
$con = file_get_contents("$url");

$pattern="/<[img|IMG].*?data-src=[\'|\"](.*?(?:[\.gif|\.jpg|\.png]))[\'|\"].*?[\/]?>/";//截取图片


$pattern_zw = "/<div class=\"rich_media_content \" id=\"js_content\">[\s|\S]*?<\/div>/";//截取正文

preg_match_all($pattern,$con,$match);


 
echo preg_replace($pattern,"<img src=\"./img/test0.jpg\" />",$con);


for($i=0;$i<count($match[1]);$i++){

	$img = $match[1][$i];
	$str_n = strpos($img,"?");
	$str = substr($img,0,$str_n);

	$pic = file_get_contents($str);
	
	if( !file_exists('./img/test'.$i.'.jpg') ){
		file_put_contents('./img/test'.$i.'.jpg',$pic);//把图片下载到自己服务器
	}
}



