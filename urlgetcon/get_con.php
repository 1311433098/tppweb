<?php
$t1 = microtime(true);
$url = "http://mp.weixin.qq.com/s?src=3&timestamp=1466413946&ver=1&signature=l1nFjDzTOT*Ohc7VHPzhd5JzUZOyPr-HP7XV2LdQ8xzYuTi7QlN-wk8vAbLwx4G2UEoPeFIUhPEyhnTNuO3z8-aUFHagx2ERNTNi12QkojWr-rutdW6iv2kQwtNeuJ7zGRjhs-UXnm9QiWrsTeCPqThaYNYbqglBR7Yb-TPfN6o=";


$dir = './img'.time().'/';

$pattern_zw = "/<div class=\"rich_media_content \" id=\"js_content\">[\s|\S]*?<\/div>/";//��ȡ����

$pattern="/<[img|IMG].*?src=[\'|\"](.*?(?:[\.gif|\.jpg|\.png]))[\'|\"].*?[\/]?>/";//��ȡͼƬ

$str = file_get_contents(str_replace("&amp;","&",$url));

preg_match($pattern_zw,$str,$arr);

$str = mb_convert_encoding($arr[0], 'gb2312', 'utf-8');

preg_match_all($pattern,$str,$match);

for($i=0;$i<count($match[1]);$i++){
	
	if($i==0){
		$str = str_replace($match[0][$i], '', $str);//ȥ����һ��ͼƬ
	}

	$img = $match[1][$i];
	
	// var_dump($match);
	
	
	
	$pic = file_get_contents($img);
	
	
	if( !file_exists($dir) ){
		
		mkdir($dir,0777,true);
	}
	$file_name = $dir.'test'.$i.'.jpg';
	
	
	if( !file_exists($file_name) ){
		file_put_contents($file_name,$pic);//��ͼƬ���ص��Լ�������
	}
	
	sleep(1);//���ӳ�ִ�У���ֹ�������ڴ�ͬһʱ��ռ�ù���
	
	$str = str_replace($img, $file_name, $str);
	
}

$str = str_replace('data-src', 'src', $str);


$str = substr($str,0,strripos($str,'��')).'</div>';//�����һ����Ž�ȡ��

echo $str;

