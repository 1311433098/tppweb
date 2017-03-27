<?php 
defined('MY_CHECK_ROOT') OR exit('not allowed ');
/**
 * 安全类文件(待完善)
 *
 * @time: 2017-03-13
 * @qq: 657978106@qq.com
 */
//---------------------------------------------------------------------------------------

/**
 * @notice:
 * 没有使用命名空间，请自行解决命名冲突问题
 */
 
class SecucityCheck{
	private static $_instance = null;


	private $_config = array();
	private $_csrf_hash = "";
	

    public static function getInstance() {
        if (is_null ( self::$_instance ) || self::$_instance === null) {
            self::$_instance = new self ($url);
        }
        return self::$_instance; 
    }
	
	public function __construct(){
		$this->_getConfig();
	}

	/**
	 * 获取指定配置文件
	 * @return [type] [description]
	 */
	private function _getConfig(){
		if(empty($this-_config)){
			$file_path = MY_CHECK_ROOT.'config.php';
			if(is_file($file_path)){
				require($file_path);
				$this->_config = $config
			}
		}
		return $this->_config;
	}

	/**
	 * [setHash description]
	 */
	public function setHash(){
		empty($this->_config) || return FALSE;

		$arr = array();
		//设置开启csrf验证
		if($this->_config['csrf_protection']){
			$hash = $this->_getHashString();

		}

		return false;
	}

	/**
	 * 获取hash 不是写入
	 * @return [type] [description]
	 */
	private function _getHashString(){
		if(empty($this->_csrf_hash)){

			if (isset($_COOKIE[$this->_config['csrf_cookie_name']) && preg_match('#^[0-9a-f]{32}$#iS', $_COOKIE[$this-> ]) === 1)
            {
                return $this->_csrf_hash = $_COOKIE[$this->_config['csrf_cookie_name'];
            }

            $this->_csrf_hash = md5(uniqid(rand(), TRUE));
            $this->_setHashCookie();
		}
		return $this->_csrf_hash;
	}

	/**
	 * [_setHashCookie description]
	 * 待完善
	 * 用来写入cookie
	 */
	private function _setHashCookie(){
		if($this->_csrf_hash){
			setcookie(
            $this->_config['csrf_cookie_name'],
            $this->_csrf_hash,
            $this->_config['csrf_expire'],
            "/");
		}

	}

	
	
	
}


