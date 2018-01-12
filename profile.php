<?php
include ("../session.php");

?>
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
			
			<?php
			$conn = mysqli_connect("localhost","root","","monster_party");
			
			$sql = "SELECT user.Id, sum(user_map.score) FROM user
					LEFT JOIN user_map ON user_map.USER_ID = user.id
					WHERE user.username like '%".$login_session."%'
					GROUP BY user.id";
				
			
			$result = mysqli_query($conn,$sql);
			if (!$result) {
				printf("Error: %s\n", mysqli_error($conn));
				exit();
			}
			
			while($row = mysqli_fetch_array($result,MYSQLI_BOTH)){
				$user_id = $row[0];
				if($row[1]!=null){
					$score = $row[1];
				}
				else{
					$score = 0;
				}
			}
			mysqli_free_result($result);
			
			$sql = "SELECT count(map.Id) from map where Lower(Type) like 'singleplayer'";
			
			$result = mysqli_query($conn,$sql);
			if (!$result) {
				printf("Error: %s\n", mysqli_error($conn));
				exit();
			}
			
			while($row = mysqli_fetch_array($result,MYSQLI_BOTH)){
				if($row[0]!=null){
					$maxSingleMaps = $row[0];
				}
				else{
					$maxSingleMaps = 0;
				}
			}
			
			mysqli_free_result($result);
			
			$sql = "SELECT count(map.Id) from map 
					where Lower(Type) like 'multiplayer'";
			
			$result = mysqli_query($conn,$sql);
			if (!$result) {
				printf("Error: %s\n", mysqli_error($conn));
				exit();
			}
			
			while($row = mysqli_fetch_array($result,MYSQLI_BOTH)){
				if($row[0]!=null){
					$maxMultiMaps = $row[0];
				}
				else{
					$maxMultiMaps = 0;
				}
			}
			mysqli_free_result($result);
			
			
			$sql = "SELECT count(user_map.Id),sum(user_map.score) from user_map
				    LEFT JOIN user ON user_map.USER_ID = user.id
					LEFT JOIN map ON map.Id=user_map.map_Id
					where Upper(map.Type) like 'SINGLEPLAYER'
					and user.username like '%".$login_session."%'";
			
			$result = mysqli_query($conn,$sql);
			if (!$result) {
				printf("Error: %s\n", mysqli_error($conn));
				exit();
			}
			
			while($row = mysqli_fetch_array($result,MYSQLI_BOTH)){
				if($row[0]!=null){
					$playedSingleMaps = $row[0];
				}
				else{
					$playedSingleMaps = 0;
				}
				if($row[1]!=null){
					$singleScore = $row[1];
				}
				else{
					$singleScore = 0;
				}
				
				
			}
			mysqli_free_result($result);
			
			$sql = "SELECT count(map.Id),sum(user_map.score) from map 
					left join user_map on user_map.map_Id=map.Id
					left join user on user.id=user_map.User_ID
					where Lower(map.Type) like 'multiplayer'
					and user.Id=".$user_id."";
			
			$result = mysqli_query($conn,$sql);
			if (!$result) {
				printf("Error: %s\n", mysqli_error($conn));
				exit();
			}
			
			while($row = mysqli_fetch_array($result,MYSQLI_BOTH)){
				if($row[0]!=null){
					$playedMultiMaps = $row[0];
				}
				else{
					$playedMultiMaps = 0;
				}
				if($row[1]!=null){
					$multiScore = $row[1];
				}
				else{
					$multiScore = 0;
				}
				
			}
			mysqli_free_result($result);
			
		?>
		
			
			<div  class="middle-column">
					<h1> Name: <?php echo $login_session?> </h1>
					<h1> Score: <?php echo $score?> </h1>
					<h1> Maps Single-Player Played: <?php echo $playedSingleMaps;?>/<?php echo $maxSingleMaps;?> </h1>
					<h1> Score Single-Player Total: <?php echo $singleScore;?></h1>
					<h1> Maps Multi-Player Played: <?php echo $playedMultiMaps;?>/<?php echo $maxMultiMaps?> </h1>
					<h1> Score Multi-Player Total: <?php echo $multiScore; ?></h1>
			</div>
			
			<div  class="right-column">
				<img src="../resources/RightHand.png" width="40%" height="80%" alt="RightHand">
			</div>
			</div>
		
</body>

</html>
