<?php 
include ("../config.php");
$conn = OpenCon();
   session_start();
  // $fn  = $_POST['score'];
  // var_dump($fn);
   //$file = fopen("try.txt","w");
   //echo fwrite($file,$fn);
   //fclose($file);

   $score = mysqli_real_escape_string($conn,$_POST['score']);
   

   $sql = "INSERT INTO user_map(user_id, map_id, score, time, attempts, completed) VALUES(111,3, $score,  '00:01:20', 
   1,0)";
   mysqli_query($conn, $sql);
?>