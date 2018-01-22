<?php
session_start();


if (!$_SESSION['login_user'])  
{  
    header('location: ../login_page.php');  
    exit;  
}
?>

<!DOCTYPE HTML>
<html>
    <head>
		<title>Monster Party</title>
		<meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="../style/card.css">
    </head>
    <body>
        <div class="logo"><img src="../resources/logo_monster.png" alt="Logo"></div>
        <div class="title">
            <h1>List of MultiPlayer maps</h1>
        </div>
        <div class="card">
            <h1>_hellofriend.agr</h1>
            <img src="../resources/labyrinth.png" width="30%" alt="logo"> 
            <div><a href="actual_game.html">Start</a></div>
            <div class="flex">
                <div class="f1">
                    <h2>Type: Cooperative</h2>
                    <h2>Difficulty:  Easy   </h2>
                    <h2>Finished: 9001</h2>
                </div>
                <div class="f3"><hr></div>
                <div class="f2">
                    <h2>Solved: Yes</h2>
                    <h2 class="grayzone">Score:  10   </h2>
                    <h2>Attempted: 3</h2>
                </div>
            </div>
        
        </div>
        
                <div class="card">
            <h1>_ones-and-zer0es.agr</h1>
            <img src="../resources/labyrinth.png" width="30%" alt="labirint"> 
            <div><a href="actual_game.html">Start</a></div>
            <div class="flex">
                <div class="f1">
                    <h2>Type: Cooperative</h2>
                    <h2>Difficulty:  Easy   </h2>
                    <h2>Finished: 9001</h2>
                </div>
                <div class="f3"><hr></div>
                <div class="f2">
                    <h2>Solved: Yes</h2>
                    <h2>Score:  7   </h2>
                    <h2>Attempted: 1</h2>
                </div>
            </div>
        
        </div>
        
                <div class="card">
            <h1>_m1rr0r1ng.agr</h1>
            <img src="../resources/labyrinth.png" width="30%" alt="labirint"> 
            <div><a href="actual_game.html">Start</a></div>
            <div class="flex">
                <div class="f1">
                    <h2>Type: Cooperative</h2>
                    <h2>Difficulty:  Easy   </h2>
                    <h2>Finished: 9001</h2>
                </div>
                <div class="f3"><hr></div>
                <div class="f2">
                    <h2>Solved: No</h2>
                    <h2 class="grayzone">Score:  0   </h2>
                    <h2>Attempted: 200</h2>
                </div>
            </div>
        
        </div>
        
                <div class="overlay">
            <h1>_zer0-day.agr</h1>
            <img src="../resources/labyrinth.png" width="30%" alt="labirint"> 
            <div><a href="actual_game.html">Locked</a></div>
            <div class="flex">
                <div class="f1">
                    <h2>Type: Cooperative</h2>
                    <h2>Difficulty:  Easy   </h2>
                    <h2>Finished: 9001</h2>
                </div>
                <div class="f3"><hr></div>
                <div class="f2">
                    <h2>Solved: No</h2>
                    <h2 class="grayzone">Score:  0   </h2>
                    <h2>Attempted: 0</h2>
                </div>
            </div>
        
        </div>
        
    </body>
</html>