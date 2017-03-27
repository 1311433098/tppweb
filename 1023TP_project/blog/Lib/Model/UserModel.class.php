<?php
	class UserModel extends Model{
	
		
	
		//编写验证规则	
		protected $_validate = array(
			//用户名不能为空
			array('username','require','用户名不能为空',1,'',3),
			//密码不能为空
			array('password','require','密码不能为空',1,'',3),
			//验证码错误
			array('captcha','checkCaptcha','验证码错误',1,'callback',3),
			
			array('password','checkPass','用户名或密码错误',1,'callback',3),
			
		
		);
		//自定义验证码规则
		public function checkCaptcha(){
		
			if(session('verify') != md5($_POST['captcha'])){
				//验证码不正确
					echo 'dd';
				return false;
			
			}else{
			echo 'cc';
				return true;
			}
			
			
		}
		
		public function checkPass(){
			$username = $_POST['username'];
			$password = md5($_POST['password']);
			$data = $this->where("username='$username' and password='$password'")->find();
			dump($data);
			if(is_null($data)){
				return false;
			}
			return true;
		}
		
		/*
		//自定义检查用户名密码错误规则
		public function checkPass(){
			//接受数据
			$username = $_POST['username'];
			$password = $_POST['password'];
			//查数据库
			// $data = $this->where("username='$username' and password='$password'")->find();
			$data = $this->where("username='$username' and password='$password'")->find();
				echo 123;
			var_dump($data);
			echo 456;
			
		}
		*/
		
	
	}