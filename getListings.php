<?php
    require_once 'login.php'; 
    //open connection to mysql db
    $db_server = mysql_connect($db_hostname, $db_username, $db_password);
    if (!$db_server) die("Unable to connect to MySQL: " . mysql_error());
    mysql_select_db($db_database) or die("Unable to select database: " . mysql_error());

    $listingType = $_POST['listingType'];
    //fetch table rows from mysql db
    $query = "SELECT * from '$listingType'";
    $result = mysqli_query($db_server, $query) or die("Error in Selecting " . mysqli_error($db_server));

    //create an array
    $rows[] = array();
    while($row =mysqli_fetch_assoc($result))
    {
        $rows[] = $row;
    }
    
    //remove the comment below to just echo the json arrow
    //echo json_encode($rows);

    //comment out the code below to stop file writing
    //write to json file
    $fp = fopen("json/"+$listingType+".json", 'w');
    fwrite($fp, json_encode($rows));
    fclose($fp);


    //close the db connection
    mysqli_close($db_server);
?>