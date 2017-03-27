<?php
/**
 * 获取替换文章中的图片路径
 * @param string $xstr 内容
 * @param string $keyword 创建照片的文件名
 * @param string $oriweb 网址
 * @return string
 * 
 */
function replaceimg ($xstr, $keyword, $oriweb)
{ 
    // 保存路径
    $d = date('Ymd', time());
    //$dirslsitss = '/var/www/weblist/uploads/' . $keyword . '/' . $d; //分类是否存在
    $dirslsitss = './uploads'; 
    if (!is_dir($dirslsitss))
    {
        @mkdir($dirslsitss, 0777);
    } 
    // 匹配图片的src
    preg_match_all('#<img.*?src="([^"]*)"[^>]*>#i', $xstr, $match);
 
    foreach($match[1] as $imgurl)
    {
        $imgurl = $imgurl;
 
        if (is_int(strpos($imgurl, 'http')))
        {
            $arcurl = $imgurl;
        } 
        else
        {
            $arcurl = $oriweb . $imgurl;
        } 
        $img = file_get_contents($arcurl);
 
        if (!empty($img))
        { 
            // 保存图片到服务器
            $fileimgname = time() . "-" . rand(1000, 9999) . ".jpg";
            $filecachs = $dirslsitss . "/" . $fileimgname;
            $fanhuistr = file_put_contents($filecachs, $img);
            //$saveimgfile = "/uploads/$keyword" . "/" . $d . "/" . $fileimgname;
            $saveimgfile = "/uploads/" . $fileimgname;
 
            $xstr = str_replace($imgurl, $saveimgfile, $xstr);
        } 
    } 
    return $xstr;
}

$url = "http://mp.weixin.qq.com/s?src=3&timestamp=1465375557&ver=1&signature=SXP2iTnTtSO4fdkpnZdLIOcxCGCehVAjYHIkhhJaYiu8eW9larKBAqkk6LJLhQS2Rv6Ipqk3OeWR2LakuVDX5kaDPoF8FZtv-AAh1SFYG9-s7eMvJfWG7*HMcpRDJyku*WB9yNLb3gVU7lsIlz4ncVCfexPxSTXWdlta1l5mK58=";


//截取正文
$pattern_zw = "/<div class=\"rich_media_content \" id=\"js_content\">[\s|\S]*?<\/div>/";//正则

$str = file_get_contents(str_replace("&amp;","&",$url));

replaceimg()