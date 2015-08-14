<?php // query.php 
require_once 'login.php'; 
$db_server = mysqli_connect($db_hostname, $db_username, $db_password);
if (!$db_server) die("Unable to connect to MySQL: " . mysqli_error());
mysqli_select_db($db_server, $db_database) or die("Unable to select database: " . mysqli_error($db_server));

//$myuser_id = 2;
$myuser_id = $_POST['my_user_id_from_javascript'];
$password_from_javascript = $_POST['passwd'];
//$myuser_id =1;
//$password_from_javascript = "finger4886";
//echo $myuser_id;

$query = "SELECT user_id, password FROM vis_boot_users WHERE user_id = '$myuser_id'";
//echo 'starting query' . '<br />';
$result = mysqli_query($db_server, $query);

if (!$result) die ("Database access failed: " . mysqli_error($db_server)); 

$numrows = mysqli_num_rows($result);
//$numrows = 1;

$passwordMatch = 0;

if ($numrows!=0)
{
//while loop
  while ($row = mysqli_fetch_assoc($result))
  {
    $dbusername = $row['user_id'];
    $dbpassword = $row['password'];
//   if (strcmp($dbusername, $myuser_id)=="0")&(strcmp($dbpassword, $password)=="0")&($passwordMatch=="0")
   if (strcmp((string)$dbpassword, (string)$password_from_javascript)==0)
    //if (strcmp((string)$dbpassword, "finger4886")==0)
    {
     $passwordMatch = 1;
    }
  }
}

//echo 1;
echo $passwordMatch;

?>
