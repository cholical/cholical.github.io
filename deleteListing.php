<?php
    require_once 'login.php'; 
    //open connection to mysql db
    $db_server = mysqli_connect($db_hostname, $db_username, $db_password);
    if (!$db_server) die("Unable to connect to MySQL: " . mysqli_error());
    mysqli_select_db($db_server, $db_database) or die("Unable to select database: " . mysqli_error($db_server));

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$listingType = $request->listingType;

    if ($listingType == "textbooks") {

        @$textbook_id = (int)$request->textbook_id;

        $query = "DELETE FROM $listingType WHERE textbook_id=$textbook_id;";
        
    } elseif ($listingType =="accessories") {

            @$accessory_id = (int)$request->accessory_id;

            $query = "DELETE FROM $listingType WHERE accessory_id=$accessory_id;";

   } else {
        //this is a service listing most likely unless ronald was stupid and passed in something other than services
    
    };

    //do query
    $result = mysqli_query($db_server, $query);
    
?>  