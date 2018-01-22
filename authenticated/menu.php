
<?php
include ("../session.php");

?>

<html>

	<head>
		<title>Monster Party</title>
		<meta charset="UTF-8">
		<link rel="stylesheet" type="text/css" href="../style/style.css">
		<link rel="stylesheet" type="text/css" href="../style/button.css">
		<link rel="stylesheet" type="text/css" href="../style/mainmenu.css">
		<style>


		</style>
	</head>

	<body class="bg">
		<div class="logo"><img src="../resources/logo_monster.png" alt="logo">
	    <h1 class="welcome">Welcome <?php echo $login_session; ?></h1> 
	    </div>
		<div class="floater">
		
		<div class="juan">
			<img src="../resources/Juan_monster.png"  height="532" width="252" alt="juan">
		</div>
			<div class="container">
			<div class="space"><a class="btn" href="gamemode.php">Start Game</a></div>
			<div class="space"><a class="btn" href="profile.php">My Profile</a></div>
			<div class="space"><a class="btn" href="../howto_page.html">How To</a></div>
			<div class="space"><a class="btn" href="../score_page.html">Top</a></div>
			<div class="space"><a class="btn" href="../main_page.php">Logout</a></div>

		</div>
		<div class="roby">
			<img src="../resources/robi_monster.png"  height="532" width="252" alt="robi">
		</div>
		</div>
	</body>

</html>

