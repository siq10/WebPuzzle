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
		<title>Monster Party</title>
		<meta charset="UTF-8">
		<link rel="stylesheet" type="text/css" href="../style/actual_game.css">
		<link rel="stylesheet" type="text/css" href="../style/button.css">
		
	</head>
		
    
	<body class="bg">
		<div id="topMargin">
			<span>&nbsp;</span>
			<div class="image">
                <canvas id="game" width="800" height="800"></canvas>    
            </div>
            <h1 style="text-align: center" id="hp"></h1>
            <h2 style= "text-align:center" id="seconds"></h2>
			<div class="help">
				<h1> W | ↑: for going Up &nbsp; A | ←: for going Left </h1>
				<h1> S | ↓: for going Down &nbsp; D | →: for going Right </h1>
				<!--<div class="space"><a class="btnscreen" href="#">Full Screen</a></div>-->
<!--				<input class= "help" type="submit" value="Full Screen">-->
			</div>
			<div id="status"></div>
		</div>
		<script src="../JS/game.js"  type="text/javascript"></script>
	</body>

</html>
