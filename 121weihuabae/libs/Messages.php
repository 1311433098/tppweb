<?php
	class Messages
	{
		/*
		*静态方法用来被动回复消息
		*/
		public static function bSendTextMessage($ToUserName,$FromUserName,$Content){
			$str =  '<xml>
			<ToUserName><![CDATA['.$ToUserName.']]></ToUserName>
			<FromUserName><![CDATA['.$FromUserName.']]></FromUserName>
			<CreateTime>'.time().'</CreateTime>
			<MsgType><![CDATA[text]]></MsgType>
			<Content><![CDATA['.$Content.']]></Content>
			</xml>';
			echo $str;
			die();
		}
	}
?>