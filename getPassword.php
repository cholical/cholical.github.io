<?php // query.php 
  require_once 'login.php'; 
  //open connection to mysql db
  $db_server = mysqli_connect($db_hostname, $db_username, $db_password);
  if (!$db_server) die("Unable to connect to MySQL: " . mysqli_error());
  mysqli_select_db($db_server, $db_database) or die("Unable to select database: " . mysqli_error($db_server));

  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);

  @$listingType = $request->listingType;
  @$password = mysqli_real_escape_string($db_server, $request->password); //password from angular ajax call

  if ($listingType == "textbooks") {
    @$listingID = (int)$request->textbook_id;
    $query = "SELECT password FROM $listingType WHERE textbook_id=$listingID;";
  }
  if ($listingType == "accessories"){
    @$listingID = (int)$request->accessory_id;
    $query = "SELECT password FROM $listingType WHERE accessory_id=$listingID;";
  }

  $result = mysqli_query($db_server, $query);

  if (!$result) die ("Database access failed: " . mysqli_error($db_server)); 

  $numrows = mysqli_num_rows($result);
  
  $passwordMatch = 0;

  if ($numrows!=0)
  {
    while ($row = mysqli_fetch_assoc($result))
    {
      $dbpassword = $row['password'];
      if (strcmp((string)$dbpassword, (string)$password)==0)
      {
       $passwordMatch = 1;
      }
    }
  }


  echo $passwordMatch;

?>


