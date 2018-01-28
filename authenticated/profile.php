
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
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Monster Party</title>
    <link href="../style/profile.css" rel="stylesheet">
</head>


<body class="bg" >
    <?php
		$conn = mysqli_connect("localhost","root","","monster_party");
		
		$sql0= "SELECT count(id) from map where type like '%SINGLE%'";
		$result0 = mysqli_query($conn,$sql0);
		$nrSingleMaps=0;
		if (!$result0) {
			printf("Error: %s\n", mysqli_error($conn));
			exit();
		}
		else{
			while($row = mysqli_fetch_array($result0,MYSQLI_BOTH)){
				if($row['count(id)']!=null){
					$nrSingleMaps=$row['count(id)'];
				}
				
			}
		}
		
		$sql1 = "SELECT count(id) from map where type like '%COOP%'";
		$result1 = mysqli_query($conn,$sql1);
		$nrCoopMaps=0;
		if (!$result1) {
			printf("Error: %s\n", mysqli_error($conn));
			exit();
		}
		else{
			while($row = mysqli_fetch_array($result1,MYSQLI_BOTH)){
				if($row['count(id)']!=null){
					$nrCoopMaps=$row['count(id)'];
				}
				
			}
		}
		
		$sql2= "SELECT count(user_map.id) from user_map 
				left join map on user_map.map_id=map.id
				join user on user.id=user_map.user_id
				where user.username like '".$login_session."'
				and map.type like '%SINGLE%'";
		$result2 = mysqli_query($conn,$sql2);
		$nrMapsSinglePlayed=0;
		if (!$result2) {
			printf("Error: %s\n", mysqli_error($conn));
			exit();
		}
		else{
			while($row = mysqli_fetch_array($result2,MYSQLI_BOTH)){
				if($row['count(user_map.id)']!=null){
					$nrMapsSinglePlayed=$row['count(user_map.id)'];
				}
				
			}
		}
		
		$sql3= "SELECT count(user_map.id) from user_map 
				left join map on user_map.map_id=map.id
				left join user on user.id=user_map.user_id
				where user.username like '".$login_session."'
				and map.type like '%COOP%'";
		$result3 = mysqli_query($conn,$sql3);
		$nrMapsCoopPlayed=0;
		if (!$result3) {
			printf("Error: %s\n", mysqli_error($conn));
			exit();
		}
		else{
			while($row = mysqli_fetch_array($result3,MYSQLI_BOTH)){
				if($row['count(user_map.id)']!=null){
					$nrMapsCoopPlayed=$row['count(user_map.id)'];
				}
				
			}
		}
		
		$sql4= "SELECT sum(user_map.score) from user_map 
				left join map on user_map.map_id=map.id
				left join user on user.id=user_map.user_id
				where user.username like '".$login_session."'
				and map.type like '%SINGLE%'";
		$result4 = mysqli_query($conn,$sql4);
		$poinstOnSingle=0;
		if (!$result4) {
			printf("Error: %s\n", mysqli_error($conn));
			exit();
		}
		else{
			while($row = mysqli_fetch_array($result4,MYSQLI_BOTH)){
				if($row['sum(user_map.score)']!=null){
					$poinstOnSingle=$row['sum(user_map.score)'];
				}
				
			}
		}
		
		$sql5= "SELECT sum(user_map.score) from user_map 
				left join map on user_map.map_id=map.id
				left join user on user.id=user_map.user_id
				where user.username like '".$login_session."'
				and map.type like '%COOP%'";
		$result5 = mysqli_query($conn,$sql5);
		$poinstOnCoop=0;
		if (!$result5) {
			printf("Error: %s\n", mysqli_error($conn));
			exit();
		}
		else{
			while($row = mysqli_fetch_array($result5,MYSQLI_BOTH)){
				if($row['sum(user_map.score)']!=null){
					$poinstOnCoop=$row['sum(user_map.score)'];
				}
				
			}
		}
		
		$totalScore=$poinstOnCoop+$poinstOnSingle;
	?>
	<input id="myscore" value='<?php echo $totalScore;?>' type='hidden' >
    <div id="fb-root"></div>
    <script>(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11&appId=1777396169233011&autoLogAppEvents=1';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>

            <script>
            function shareScore() {
                var scor = document.getElementById('myscore').value;
				console.log(scor);
        FB.init({
            appId: '1777396169233011',
            xfbml: true,
            version: 'v2.11'
        });

        FB.login(function() {
            FB.api('/me/feed', 'post', {
                message: "My Monster Party Score is: " + scor + "!",
                link: "http://www.publicdomainpictures.net/pictures/160000/velka/blue-monster.jpg"
            });
        }, {scope: 'publish_actions' });
    }
            </script>
    
		<div class="top-div">
		<a href="menu.php">
			<div class="logo"></div>
		</a>
		</div>
			<div class="container">
			<div class="left-column">
				<img src="../resources/LeftHand.png" width="40%" height="80%" alt="LeftHand">
			</div>
			
			<div  class="middle-column">
					<h1> Name: <?php echo $login_session;?> </h1>
					<h1> Total Score: <?php echo $totalScore;?> </h1>
					
					<h1> Maps Single-Player Played: <?php echo $nrMapsSinglePlayed;?>/<?php echo $nrSingleMaps;?> </h1>
					<h1> Score Single-Player Total: <?php echo $poinstOnSingle;?></h1>
					
					<h1> Maps Multi-Player Played: <?php echo $nrMapsCoopPlayed;?>/<?php echo $nrCoopMaps;?> </h1>
					<h1> Score Multi-Player Total: <?php echo $poinstOnCoop;?></h1>
            						                       <input type="button" style="background:	#3b5998;color:#dfe3ee;min-width:10rem;height:3rem;font-size:16px;border:none;cursor:pointer" onclick="shareScore()"  value=" Share My Awesomly Awesome Score! "/>
			</div>
			
			<div  class="right-column">
				<img src="../resources/RightHand.png" width="40%" height="80%" alt="RightHand">
			</div>
			</div>
		
</body>

</html>
