<?php
session_start();

if (!$_SESSION['login_user'])  
{  
    header('location: ../login_page.php');  
    exit;  
}
?>
<html> 
<head> 
    <meta charset="utf-8"> 
    <meta name="viewport" content="width=device-width"> 
    <title>Lv2</title> 
    <link rel="stylesheet" type="text/css" href="../style/Lv1.css">
</head> 
<body > 
	<div class="logo"><img src="../resources/logo_monster.png"></div>
	
	<input id="usrname" value="<?php echo $login_session;?>" type="hidden"> 
	
	<div class="center">
		<script  src="../JS/Lv2.js"  type="text/javascript"></script>
	</div>
	<br>
	<div class="center">
		<p> Player1 : W-Up | A-Left | S-Down | D-Right </p>
	</div>
		
	<div class="center">
		<p> Player2 : I-Up | J-Left | K-Down | L-Right </p>
	</div>
	<div class="center">
		<p id="score"></p>
	</div>
	<!--<div class="center">
		<p id="position1"></p>
	</div>
	<div class="center">
		<p id="position2"></p>
	</div>-->
	<div class="center">
		<div id="status"></div>
	</div>

	
</body> 
</html>