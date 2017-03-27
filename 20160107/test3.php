<?php
header("content-type:text/html;charset=utf-8");
$username=$_POST['username'];
$password=$_POST['pwd'];
$autoFlog=isset($_POST['autoFlog']) ? isset($_POST['autoFlog']) : 0;
var_dump($_POST);
