<?php
	include ("../session.php");
?>
<html> 
<head> 
    <meta charset="utf-8"> 
    <meta name="viewport" content="width=device-width"> 
    <title>Lv2</title> 
    <link rel="stylesheet" type="text/css" href="../style/Lv1.css">
</head> 
<body style="background-color:magenta;"> 
	<center>
	<input id="usrname" value="<?php echo $login_session;?>" type="hidden"> 
		<br>
		<br>
		<script  src="../JS/Lv2.js"  type="text/javascript"></script> 
		<p> User WASD for 1st Player</p>
		<p> User IJKL for 1st Player</p>
		<p id="score" style="color:white"></p>
		<p id="position1" style="color:white"></p>
		<p id="position2" style="color:white"></p>
		
	</center>
</body> 
</html>