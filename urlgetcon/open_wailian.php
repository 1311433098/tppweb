<?php 
$p=$_GET['p']; 
$pics=file_get_contents($p); 
for($i=0;$i< count($pics);$i++) 
{ 
	echo $pics[$i]; 
} 
?> 