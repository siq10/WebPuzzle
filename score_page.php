<!DOCTYPE HTML SYSTEM>
<html>
    <head>
        <title>Monster Party</title>

        <link rel="stylesheet" type="text/css" href="style/style_score.css">
		<link rel="stylesheet" type="text/css" href="style/button.css">
		<script>
		</script>
    </head>
    
    <body class="bg" >
	
		<div class="container">
		
			<div class="top-div">
				<div class="logo"></div>
			</div>
		
			<div class="left-column">
				<div class="monster-robi"></div>
			</div>
			
			<div class="middle-column">
				<form action="score_page.php" method="POST">
					<center>
						<input type="text" name="valueToSearch" placeholder="Search by Name">
						<input type="submit" name="search" value="Filter">
						<br>
						<br>
					</center>
						
					<table id="tableData">
						<thead>
							<tr>
								<th>Position</th>
								<th>Name</th>
								<th>Score</th>
							</tr>
						</thead>
						<tbody>
						<?php
							session_start();
							$conn = mysqli_connect("localhost","root","","monster_party");
							/*
							set @rownum=0;
							SELECT @rownum:=@rownum+1, user.username, REPLACE(sum(user_map.score),'',0) FROM user
							JOIN user_map on user_map.user_id=user.id
							ORDER BY REPLACE(sum(user_map.score),'',0) desc
							*/
							if(isset($_POST['search'])){
								$srcRez = $_POST['valueToSearch'];
								$sql = "SELECT user.username,sum(user_map.score) FROM user
										JOIN user_map ON user_map.USER_ID = user.id
										WHERE user.username like '%".$srcRez."%'
										GROUP BY user.id
										ORDER BY 2 DESC";
							}
							else{
								$sql = "SELECT user.username,sum(user_map.score) FROM user
										JOIN user_map ON user_map.USER_ID = user.id
										GROUP BY user.id
										ORDER BY 2 DESC";
							}
							$result = mysqli_query($conn,$sql);
							#$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
							if (!$result) {
								printf("Error: %s\n", mysqli_error($conn));
								exit();
							}
							$rownum=0;
							while($row = mysqli_fetch_array($result,MYSQLI_BOTH)){
								if($row[0]!=null){
									$rownum++;
									echo "<tr><td>".$rownum."</td><td>".$row[0]."</td><td>".$row[1]."</td></tr>";
								}
							}
							if($rownum==0){
								echo "<tr><td></td><td>No Player Found</td><td></td></tr>";
							}
							
							mysqli_free_result($result);
							
							?>
							
						</tbody>
						
					</table>
				</form>
			</div>
			
			<div class="right-column">
				<div class="monster-juan"></div>
			</div>
		</div>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script> 
		<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
		<script type="text/javascript" src="./JS/paging.js"></script> 
		<script type="text/javascript">
			$(document).ready(function() {
				$('#tableData').paging({limit:10});
			});
		</script>
		
    </body>
</html>