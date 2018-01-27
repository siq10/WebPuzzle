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
        <link rel="stylesheet" type="text/css" href="../style/card.css">
    </head>
    <body>
		<a href="menu.php">
			<div class="logo"><img src="../resources/logo_monster.png"></div>
		</a>
        <div class="title">
            <h1>List of SinglePlayer maps</h1>
        </div>
		<?php 
		
			$conn = mysqli_connect("localhost","root","","monster_party");
			
			$maxScore=500;
			$type="";
			$difficulty="";
			$sql0= "SELECT type, dificulty from map where id=1";
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
					AND user_map.MAP_ID=1";
					
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
            <h1>Map1_Single</h1>
            <img src="../resources/Lv1SINGLE.png" width=30%> 
            <div><a href="Lv1.php">Start</a></div>
            <div class="flex">
                <div class="f1">
                    <h2>Type: <?php echo $type;?></h2>
                    <h2>Difficulty:  <?php echo $difficulty;?>  </h2>
                    <h2>Max Score: <?php echo $maxScore;?></h2>
                </div>
                <div class="f3"><hr></div>
                <div class="f2">
                    <h2>Solved: <?php echo $Solved;?></h2>
                    <h2 class>Your Score: <?php echo $Score;?></h2>
                    <h2>Attempted: <?php echo $attempts;?></h2>
                </div>
            </div>
        </div>
        
		<?php 
		
			$maxScore=400;
			$type="";
			$difficulty="";
			
			$sql2= "SELECT type, dificulty from map where id=4";
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
					AND user_map.MAP_ID=4";
					
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
            <h1>Map2_Single</h1>
            <img src="../resources/Lv2SINGLE.png" width=30%> 
            <div><a href="newBestLevel.php">START</a></div>
            <div class="flex">
                <div class="f1">
                    <h2>Type: <?php echo $type;?></h2>
                    <h2>Difficulty:  <?php echo $difficulty;?></h2>
                    <h2>Max Score: <?php echo $maxScore;?></h2>
                </div>
                <div class="f3"><hr></div>
                <div class="f2">
                    <h2>Solved: <?php echo $Solved;?></h2>
                    <h2 >Your Score: <?php echo $Score;?></h2>
                    <h2 >Attempted: <?php echo $attempts;?></h2>
                </div>
            </div>
        
        </div>
		
        <div class="overlay">
            <h1>Map3_Single</h1>
            <img src="../resources/labyrinth.png" width=30%> 
            <div><a>Not Ready Yet</a></div>
            <div class="flex">
                <div class="f1">
                    <h2>Type: SINGLE</h2>
                    <h2>Difficulty:  HARD   </h2>
                    <h2>Max Score: ?</h2>
                </div>
                <div class="f3"><hr></div>
                <div class="f2">
                    <h2>Solved: NO</h2>
                    <h2 class="grayzone">Your Score: 0   </h2>
                    <h2 class="grayzone">Attempted: 0</h2>
                </div>
            </div>
        
        </div>
        
    </body>
</html>