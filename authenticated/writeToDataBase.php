<?php 
session_start();
//include ("../config.php");
//$conn = OpenCon();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "monster_party";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
else{
    $score = mysqli_real_escape_string($conn,$_POST['score']);
    $map = mysqli_real_escape_string($conn,$_POST['map']);
	$usrname = $_SESSION['login_user'];
	
	$sql1 = "SELECT id FROM user WHERE username like '".$usrname."'";
	
	$result1 = mysqli_query($conn, $sql1);
	$id = 0;
	
	if (mysqli_num_rows($result1) > 0) {
		while($row = mysqli_fetch_assoc($result1)) {
			if (isset($row['id'])) {
				$id = $row['id'];
			}
		}
	}
	
	$sql2 = "SELECT count(id),max(attempts),max(score) FROM user_map where user_id=".$id." and map_id=".$map;
	$result2 = mysqli_query($conn, $sql2);
	$exist = 0;
	$attempts=0;
	$score_until_now=0;
	
	if (mysqli_num_rows($result2) > 0) {
		while($row = mysqli_fetch_assoc($result2)) {
			if (isset($row['count(id)'])) {
				$exist = $row['count(id)'];
			}
			if (isset($row['max(attempts)'])) {
				$attempts = $row['max(attempts)'];
			}
			if (isset($row['max(score)'])) {
				$score_until_now = $row['max(score)'];
			}
		}
	}
	

	if($exist==0){
		
		$sql3 = "SELECT max(id) FROM user_map";
		$result3 = mysqli_query($conn, $sql3);
		$max_id_reg = 0;
	
		if (mysqli_num_rows($result3) > 0) {
			while($row = mysqli_fetch_assoc($result3)) {
				if (isset($row['max(id)'])) {
					$max_id_reg = $row['max(id)'];
				}
			}
		}
	
		$max_id_reg += 1;
		$sql4 = "INSERT INTO user_map(id,user_id, map_id, score, time, attempts, completed) VALUES($max_id_reg, $id, $map, $score,  '00:00:00', 1,1)";
		mysqli_query($conn, $sql4);
	}
	else{
		$attempts+=1;
		$best_score=$score;
		if($score_until_now>$best_score)
			$best_score = $score_until_now;
		$sql5 = "UPDATE user_map SET attempts=".$attempts.", score=".$best_score." WHERE user_id=".$id." and map_id=".$map;
		mysqli_query($conn, $sql5);
	}
	
	mysqli_close($conn);
}
?>