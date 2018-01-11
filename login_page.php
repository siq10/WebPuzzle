

<?php
include ("config.php");
$conn = OpenCon();
session_start();

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $username = mysqli_real_escape_string($conn,$_POST['username']);
    $password = mysqli_real_escape_string($conn,$_POST['password']); 
    var_dump($username);
    $sql = "SELECT id FROM user WHERE username = '$username' and password = '$password'";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
    $active = $row['active'];
    $error = "";
    
    $count = mysqli_num_rows($result);
    
    // If result matched $myusername and $mypassword, table row must be 1 row
      
    if($count == 1) {
       
       $_SESSION['login_user'] = $username;
       
       header("location: ./authenticated/menu.php");
    }else {
       $error = "Your Login Name or Password is invalid";
    }
}
?>

 
<html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
     <title>Monster Party Login</title>
     <link rel="stylesheet" type="text/css" href="style/style_login.css">
    </head>

    <body>
        <h1 class="title">Give me your</h1>
        <h1  class="title1" >name:</h1>
        
        <div class="kid">
            <img  class="kid-img" src="resources/scared_kid.png" alt="Kid image"  height="432" width="252">
        </div>

        <div class="woman">
                <img  class="woman-img" src="resources/scared_woman.png" alt="Woman image"  height="432" width="252">
        </div>
   

     <div class="form-container">
         
        <form method = "post">
          <label for="fname">Name:</label>
          <input type="text" id="username" name="username" placeholder="Your name..">
      
          <label for="passwd">Password:</label>
          <input type="text" id="password" name="password" placeholder="Password..">
      
         
        
         <input type="submit" value="Submit" > 
        </form>
        
      
      </div>
  
    </body>
</html>

