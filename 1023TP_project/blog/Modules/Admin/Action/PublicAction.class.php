<?php
	
	class PublicAction extends Action{
		//验证码
		public function captcha(){
		
			//加载验证码类
			// import("ORGUtil.Image");


			// Image::buildImageVerify();
			
			
			import('ORG.Util.Image');
			Image::buildImageVerify(1,1,'png',145,36);


			
		}
		
		//显示登录界面
		public function login(){
		
			C('LAYOUT_ON',false);//不用布局
			$this->display('login');
		
		}
		
		//判断是否登录
		public function doLogin(){
		/*
		1、实例化model
		2、压入数据
		3验证数据
		4执行登录
		*/			
			$usermodel = D('User');
			
			if($usermodel->create()){//成功会返回数组，失败返回false
				//存入session信息
				session('username',$_POST['username']);
				session('isLogin',1);
				
				$this->success('登录成功',U('Index/index'));
			}else{
				
				//输出登录失败信息
				
				 $this->error($usermodel->getError(),U('Public/login'));
			}
					
		}
		
		public function logout(){
		
			echo 123123;
		}
		
	}