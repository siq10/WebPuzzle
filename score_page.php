<!DOCTYPE HTML SYSTEM>
<html>
    <head>
        <title>Monster Party</title>

        <link rel="stylesheet" type="text/css" href="style/style_score.css">
		<link rel="stylesheet" type="text/css" href="style/button.css">
		<style>

#myInput {
  
  width: 80%;
  height: 10px;
  font-size: 16px;
  padding: 12px 20px 12px 40px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
  margin-left:10%;
  border-radius: 10px;
  background-color: #161616;
    color :#fff;
}

#buttons    {
	margin-left: 30%;
	margin-top:10px;
}
input[type="button"] {
    transition: all .3s;
    border: 1px solid #ddd;
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 5px;
    font-size: 15px;
	color :#fff;
}

input[type="button"]:not(.active) {
    background-color:transparent;
}

.active {
    background-color: #161616;
    color :#fff;
}

input[type="button"]:hover:not(.active) {
    background-color: #ddd;
}
		</style>
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
			<!--	<form action="score_page.php" method="POST">
					<center>
						<input type="text" name="valueToSearch" placeholder="Search by Name">
						<input type="submit" name="search" value="Filter">
						<br>
						<br>
					</center>
			-->
						
<input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names.." title="Type in a name">
<table  id="myTable">
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
										
		$sql = "SELECT user.username,sum(user_map.score) FROM user
				LEFT JOIN user_map ON user_map.USER_ID = user.id
				GROUP BY user.id
				ORDER BY 2 DESC";
					
		$result = mysqli_query($conn,$sql);
		if (!$result) {
				printf("Error: %s\n", mysqli_error($conn));
				exit();
		}
		$rownum=0;
		while($row = mysqli_fetch_array($result,MYSQLI_BOTH)){
			if($row[0]!=null){
				$rownum++;
				if($row[1]!=null){
				echo "<tr><td>".$rownum."</td><td>".$row[0]."</td><td>".$row[1]."</td></tr>";
				}
				else{
					echo "<tr><td>".$rownum."</td><td>".$row[0]."</td><td>0</td></tr>";
				}
			}      
		}
		if($rownum==0){
			echo "<tr><td></td><td>No Player Found</td><td></td></tr>";
		}
						
		mysqli_free_result($result);
						
		?>
						
</tbody>
					
</table>
			</div>
			
			<div class="right-column">
				<div class="monster-juan"></div>
			</div>
		</div>
		
		<script type="text/javascript" src="./JS/pagination_final.js"></script> 
		
		
    </body>
</html>