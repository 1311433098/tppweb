<?php
$str = "http://mp.weixin.qq.com/s?src=3&timestamp=1465375557&ver=1&signature=SXP2iTnTtSO4fdkpnZdLIOcxCGCehVAjYHIkhhJaYiu8eW9larKBAqkk6LJLhQS2Rv6Ipqk3OeWR2LakuVDX5kaDPoF8FZtv-AAh1SFYG9-s7eMvJfWG7*HMcpRDJyku*WB9yNLb3gVU7lsIlz4ncVCfexPxSTXWdlta1l5mK58=";

/******�����ġ� PHP��cURL http://www.chinaz.com/program/2010/0119/104346.shtml*******/
$ch = curl_init();
// 2. ����ѡ�����URL
curl_setopt($ch, CURLOPT_URL, $str);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch,CURLOPT_HTTPHEADER,array ("Content-Type: text/xml; charset=utf-8","Expect: 100-continue"));
// 3. ִ�в���ȡHTML�ĵ�����
$output = curl_exec($ch);
$output = str_replace("data-src","src",$output);
echo $output;
// var_dump($output);
// 4. �ͷ�curl���
curl_close($ch);
preg_match_all("/(href|src)=([\"|']?)([^ \"'>]+\.($ext))\\2/i", $output, $gonten); 
 //preg_match_all("/<img.*src\s*=\s*[\"|\']?\s*([^>\"\'\s]*)/i",$output, $gonten);
 var_dump($gonten);
 exit;
    $picurl = $gonten[1]; //�õ�������
	 $content = file_get_contents($picurl);
   
    echo $content;
