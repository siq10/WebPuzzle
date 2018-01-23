<?php
	include ("../session.php");
?>
<html> 
<head> 
    <meta charset="utf-8"> 
    <!--<meta name="viewport" content="width=device-width"> -->
    <title>Lv1</title> 
    <link rel="stylesheet" type="text/css" href="../style/Lv1.css">
</head> 
<body style="background-color:magenta;"> 
	<div  class="middle-column">
	<center>
		<input id="usrname" value="<?php echo $login_session;?>" type="hidden"> 
		<br>
		<br>
		
		<p id="score" style="color:white"></p>
		
		<p id="position" style="color:white"></p>
		
		<div id="status"></div>
		
		<script src="../JS/Lv1.js" type="text/javascript"></script> 
	</center>
</div>

	
</body> 
</html>