<?php
/**
 * ��ȡ�滻�����е�ͼƬ·��
 * @param string $xstr ����
 * @param string $keyword ������Ƭ���ļ���
 * @param string $oriweb ��ַ
 * @return string
 * 
 */
function replaceimg ($xstr, $keyword, $oriweb)
{ 
    // ����·��
    $d = date('Ymd', time());
    //$dirslsitss = '/var/www/weblist/uploads/' . $keyword . '/' . $d; //�����Ƿ����
    $dirslsitss = './uploads'; 
    if (!is_dir($dirslsitss))
    {
        @mkdir($dirslsitss, 0777);
    } 
    // ƥ��ͼƬ��src
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
            // ����ͼƬ��������
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


//��ȡ����
$pattern_zw = "/<div class=\"rich_media_content \" id=\"js_content\">[\s|\S]*?<\/div>/";//����

$str = file_get_contents(str_replace("&amp;","&",$url));

replaceimg()