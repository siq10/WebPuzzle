<?php
include ("../session.php");
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
        <link rel="stylesheet" type="text/css" href="../style/card.css">
    </head>
    <body>
		<a href="menu.php">
			<div class="logo"><img src="../resources/logo_monster.png" alt="Logo"></div>
		</a>
        <div class="title">
            <h1>List of MultiPlayer maps</h1>
        </div>
		<?php 
		
			$conn = mysqli_connect("localhost","root","","monster_party");
			
			$maxScore=500;
			$type="";
			$difficulty="";
			$sql0= "SELECT type, dificulty from map where id=2";
			$result0 = mysqli_query($conn,$sql0);
			if (!$result0) {
				printf("Error: %s\n", mysqli_error($conn));
				exit();
			}
			else{
				while($row = mysqli_fetch_array($result0,MYSQLI_BOTH)){
					if($row['type']!=null){
						$type=$row['type'];
					}
					if($row['dificulty']!=null){
						$difficulty = $row['dificulty'];
					}
				}
			}
			
			$Solved="No";
			$attempts=0;
			$Score=0;
			
			$sql1 = "SELECT COMPLETED, ATTEMPTS, SCORE FROM user_map
					LEFT JOIN user ON user.ID=user_map.USER_ID
					WHERE user.USERNAME like '%".$login_session."%'
					AND user_map.MAP_ID=2";
					
			$result1 = mysqli_query($conn,$sql1);
			if (!$result1) {
				printf("Error: %s\n", mysqli_error($conn));
				exit();
			}
			else{
				while($row1 = mysqli_fetch_array($result1,MYSQLI_BOTH)){
					if($row1['COMPLETED']!=null){
						$comp=$row1['COMPLETED'];
						if($comp==1)
							$Solved="YES";
					}
					
					if($row1['ATTEMPTS']!=null){
						$attempts=$row1['ATTEMPTS'];
					}
					
					if($row1['SCORE']!=null){
						$Score=$row1['SCORE'];
					}
				}
			}
			
		?>
        <div class="card">
            <h1>Map1_COOP</h1>
            <img src="../resources/Lv1COOP.png" width="30%" alt="logo"> 
            <div><a href="Lv2.php">Start</a></div>
            <div class="flex">
                <div class="f1">
                    <h2>Type: <?php echo $type; ?></h2>
                    <h2>Difficulty:  <?php echo $difficulty; ?>   </h2>
                    <h2>Max Score: <?php echo $maxScore; ?></h2>
                </div>
                <div class="f3"><hr></div>
                <div class="f2">
                    <h2>Solved: <?php echo $Solved; ?></h2>
                    <h2>Your Score:  <?php echo $Score; ?></h2>
                    <h2>Attempted: <?php echo $attempts; ?></h2>
                </div>
            </div>
        
        </div>
        
		<?php
			$maxScore=600;
			$type="";
			$difficulty="";
			
			$sql2= "SELECT type, dificulty from map where id=5";
			$result2 = mysqli_query($conn,$sql2);
			if (!$result2) {
				printf("Error: %s\n", mysqli_error($conn));
				exit();
			}
			else{
				while($row = mysqli_fetch_array($result2,MYSQLI_BOTH)){
					if($row['type']!=null){
						$type=$row['type'];
					}
					if($row['dificulty']!=null){
						$difficulty = $row['dificulty'];
					}
				}
			}
			
			$Solved="No";
			$attempts=0;
			$Score=0;
			
			$sql3 = "SELECT COMPLETED, ATTEMPTS, SCORE FROM user_map
					LEFT JOIN user ON user.ID=user_map.USER_ID
					WHERE user.USERNAME like '%".$login_session."%'
					AND user_map.MAP_ID=5";
					
			$result3 = mysqli_query($conn,$sql3);
			if (!$result3) {
				printf("Error: %s\n", mysqli_error($conn));
				exit();
			}
			else{
				while($row1 = mysqli_fetch_array($result3,MYSQLI_BOTH)){
					if($row1['COMPLETED']!=null){
						$comp=$row1['COMPLETED'];
						if($comp==1)
							$Solved="YES";
					}
					
					if($row1['ATTEMPTS']!=null){
						$attempts=$row1['ATTEMPTS'];
					}
					
					if($row1['SCORE']!=null){
						$Score=$row1['SCORE'];
					}
				}
			}
			
		?>
		
        <div class="card">
            <h1>Map2_COOP</h1>
            <img src="../resources/Lv2COOP.png" width="30%" alt="labirint"> 
            <div><a href="actual_game.php">Start</a></div>
            <div class="flex">
                <div class="f1">
                    <h2>Type: <?php echo $type?></h2>
                    <h2>Difficulty:  <?php echo $difficulty?></h2>
                    <h2>Max Score: <?php echo $maxScore;?></h2>
                </div>
                <div class="f3"><hr></div>
                <div class="f2">
                    <h2>Solved: <?php echo $Solved?></h2>
                    <h2>Your Score: <?php echo $Score?></h2>
                    <h2>Attempted: <?php echo $attempts?></h2>
                </div>
            </div>
        
        </div>
        
		<?php
			$maxScore=750;
			$type="";
			$difficulty="";
			
			$sql4= "SELECT type, dificulty from map where id=3";
			$result4 = mysqli_query($conn,$sql4);
			if (!$result4) {
				printf("Error: %s\n", mysqli_error($conn));
				exit();
			}
			else{
				while($row = mysqli_fetch_array($result4,MYSQLI_BOTH)){
					if($row['type']!=null){
						$type=$row['type'];
					}
					if($row['dificulty']!=null){
						$difficulty = $row['dificulty'];
					}
				}
			}
			
			$Solved="No";
			$attempts=0;
			$Score=0;
			
			$sql5 = "SELECT COMPLETED, ATTEMPTS, SCORE FROM user_map
					LEFT JOIN user ON user.ID=user_map.USER_ID
					WHERE user.USERNAME like '%".$login_session."%'
					AND user_map.MAP_ID=3";
					
			$result5 = mysqli_query($conn,$sql5);
			if (!$result5) {
				printf("Error: %s\n", mysqli_error($conn));
				exit();
			}
			else{
				while($row1 = mysqli_fetch_array($result5,MYSQLI_BOTH)){
					if($row1['COMPLETED']!=null){
						$comp=$row1['COMPLETED'];
						if($comp==1)
							$Solved="YES";
					}
					
					if($row1['ATTEMPTS']!=null){
						$attempts=$row1['ATTEMPTS'];
					}
					
					if($row1['SCORE']!=null){
						$Score=$row1['SCORE'];
					}
				}
			}
			
		?>
		
        <div class="card">
            <h1>Map3_COOP</h1>
            <img src="../resources/Lv3COOP.png" width="30%" alt="labirint"> 
            <div><a href="best_level.php">Start</a></div>
            <div class="flex">
                <div class="f1">
                    <h2>Type: <?php echo $type?></h2>
                    <h2>Difficulty:  <?php echo $difficulty?></h2>
                    <h2>Max Score: <?php echo $maxScore?></h2>
                </div>
                <div class="f3"><hr></div>
                <div class="f2">
                    <h2>Solved: <?php echo $Solved?></h2>
                    <h2>Your Score: <?php echo $Score?></h2>
                    <h2>Attempted: <?php echo $attempts?></h2>
                </div>
            </div>
        
        </div>
        
                <div class="overlay">
            <h1>Map4_COOP</h1>
            <img src="../resources/labyrinth.png" width="30%" alt="labirint"> 
            <div><a href="actual_game.html">Not Ready Yet</a></div>
            <div class="flex">
                <div class="f1">
                    <h2>Type: COOP</h2>
                    <h2>Difficulty: HARD</h2>
                    <h2>Max Score: ?</h2>
                </div>
                <div class="f3"><hr></div>
                <div class="f2">
                    <h2>Solved: No</h2>
                    <h2 class="grayzone">Your Score:  0   </h2>
                    <h2 class="grayzone">Attempted: 0</h2>
                </div>
            </div>
        
        </div>
        
    </body>
</html>