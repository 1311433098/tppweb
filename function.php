<?php 
defined('MY_CHECK_ROOT') OR exit('not allowed ');

/**
 *  公共函数文件
 */
//--------------------------------------------------

if ( ! function_exists('form_sub'))
{
	/**
	 * 构造表单提交隐藏域
	 * @return String input隐藏域
	 */
	function form_sub(){
		$form = "";
		if(MY_CHECK_USE === TRUE){
			$security = SecucityCheck::getInstance();
			$hidden = $security->setHash();

			if (is_array($hidden))
			{
				foreach ($hidden as $name => $value)
				{
					$form .= '<input type="hidden" name="'.$name.'" value="'.($value).'" style="display:none;" />'."\n";
				}
			}
		}
		return $form;	
	}
}


if ( ! function_exists('form_check'))
{
	/**
	 * 待完善
	 * @return [type] [description]
	 */
	function form_check(){
			
	}
}