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

    } elseif ($listingType =="services") {

            @$service_id = (int)$request->service_id;

            $query = "DELETE FROM $listingType WHERE service_id=$service_id;";

    } 

    //do query
    $result = mysqli_query($db_server, $query);
    
?>  