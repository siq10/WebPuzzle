
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
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Monster Party</title>
    <link href="../style/profile.css" rel="stylesheet">
</head>


<body class="bg" >
		<div class="top-div">
				<div class="logo"></div>
		</div>
			<div class="container">
			<div class="left-column">
				<img src="../resources/LeftHand.png" width="40%" height="80%" alt="LeftHand">
			</div>
			<div  class="middle-column">
					<h1> Name: Robo </h1>
					<h1> E-mail: Robo@yahoo.com </h1>
					<h1> Score: 9000 </h1>
					<h1> Favorite Monster: Juan </h1>
					<h1> Maps Single-Player Played: 9/10 </h1>
					<h1> Score Single-Player Total: 6000</h1>
					<h1> Maps Multi-Player Played: 1/4 </h1>
					<h1> Score Multi-Player Total: 3000</h1>
			</div>
			
			<div  class="right-column">
				<img src="../resources/RightHand.png" width="40%" height="80%" alt="RightHand">
			</div>
			</div>
		
</body>

</html>
