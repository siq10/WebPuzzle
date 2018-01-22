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
	<title>Monster Party</title>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../style/gamemode.css" rel="stylesheet">
</head>

<body>
    <div class="title">
        <h2>Choose your Destiny!</h2>
    </div>
    <div class="gamemenu">
        <div class="logoleft">
            <a href="single.php"><img src="../resources/singleplayer.png" height="100%" width="100%" alt="single"></a>
            <hr>
        </div>

        <div class="logoright">
            <a href="coop.php"><img src="../resources/multyplayer.png" height="100%" width="100%" alt="multi"></a>
            <hr>
        </div>
        <div class="arrow"></div>

    </div>
</body>

</html>
