<?php
session_start();


if (!$_SESSION['login_user'])  
{  
    header('location: ../login_page.php');  
    exit;  
}
?>

<!DOCTYPE html>
<html>
<head>

<link rel="stylesheet" type="text/css" href="../style/actual_game.css">
<link rel="stylesheet" type="text/css" href="../style/button.css">
<script src="../JS/new_best_level.js"></script>
<style>
div#memory_board{
	background:#CCC;
	border:#999 1px solid;
	width:800px;
	height:540px;
	padding:24px;
	margin:0px auto;
}
div#memory_board > div{
	background: url(../resources/rsz_2puzzle.png) no-repeat;
    background-size: cover;
	border:#000 1px solid;
	width:71px;
	height:71px;
	float:left;
	margin:10px;
	padding:20px;
	font-size:64px;
	cursor:pointer;
	text-align:center;
}
</style>

</head>
<body class="bg">
</br> </br>
<div id="memory_board"></div>


<div id="topMargin">
			<span>&nbsp;</span>

			<!--<div class="image">
				<img src="../resources/Labyrinth.jpg" alt="labirint">
			</div> -->
			<div class="help">
			    <h1> Attepts: <span id="score"> </span> </h1>
				<h1> Turn over one monster tile and then try to find a matching monster tile </h1>
				
				<div id="status"></div>
				
				
			</div>
		</div>
<script>newBoard();</script>
</body>
</html>