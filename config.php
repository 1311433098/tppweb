<?php 

defined('MY_CHECK_ROOT') OR exit('not allowed ');

/**
 * ���ý���ȫ������������ʽ ����ȫ�ַ�Χ��ʹ��
 */
//------------------------------------------------------ 

//TODO ֮���Ƕ������ö�ȡ��д�뺯������ͳһ����
 
$cofig_arr = array();


$config['csrf_protection'] = TRUE;		//�ǹ����� ��ʱ����
$config['csrf_token_name'] = 'wy100_csrf_token';
$config['csrf_cookie_name'] = 'wy100_csrf_cookie';
$config['csrf_expire'] = 7200;			//����ʱ��



//������
//......................................................