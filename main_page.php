<?php
        session_start();
        session_destroy();
?>

<!DOCTYPE HTML SYSTEM>
<html>

<head>
    <title>Monster Party</title>

    <link rel="stylesheet" type="text/css" href="style/style.css">
    <link rel="stylesheet" type="text/css" href="style/button.css">
    <link rel="stylesheet" type="text/css" href="style/mainmenu.css">
    
</head>

<body class="bg">
    <!--<div class="box"></div>-->
    <div class="logo"><img src="resources/logo_monster.png" alt="Monsters"></div>
    <div class="floater">

    <div class="juan">
        <img src="resources/Juan_monster.png"  height="532" width="252" alt="Monsters">
    </div>
        <div class="container">
        <div class="space"><a class="btn" href="login_page.php">Login</a></div>
        <div class="space"><a class="btn" href="register_page.php">Register</a></div>
        <div class="space"><a class="btn" href="howto_page.html">How To</a></div>
        <div class="space"><a class="btn" href="score_page.php">Top</a></div>
    </div>
    <div class="roby">
        <img src="resources/robi_monster.png"  height="532" width="252" alt="Monsters" >
    </div>
    </div>
</body>

</html>

