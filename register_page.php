<?php
include ("config.php");
$conn = OpenCon();
session_start();

if(isset($_POST['register_btn'])) {
        $username = mysqli_real_escape_string($conn,$_POST['username']);
        $password = mysqli_real_escape_string($conn,$_POST['password']);

        $sql = "INSERT INTO user(username, password) VALUES('$username','$password')";
        mysqli_query($conn, $sql);
       
        $_SESSION['login_user'] = $username;
        header("location: ./authenticated/menu.php");

    
        
}
 ?>

<html>
        <head>
         <meta name="viewport" content="width=device-width, initial-scale=1">
         <title>Monster Party Login</title>
         <link rel="stylesheet" type="text/css" href="style/style_login.css">
        </head>
    
        <body>
            <h1 class="title">Are you sure?<h1>
            
          
        <div class="monster-robi">
                <img  class="robi-img" src="resources/robi_register.png" alt="Smiley face" >
        </div>

        <div class="monster-juan">
                <img  class="juan-img" src="resources/juan_register.png" alt="Smiley face"  >
        </div>
        
         <div class="form-container_register">

                
             
            <form method="post" action="">

              <label for="username">Name:</label>
              <input type="text" id="username" name="username" placeholder="Your name..">
          
              <label for="password">Password:</label>
              <input type="text" id="password" name="password" placeholder="Your last name..">
          
             
            
              <input type="submit" name="register_btn" value="Submit">
            </form>
          </div>
          
        </body>
</html>