<?php
    require_once 'login.php';
    //open connection to mysql db
    $db_server = mysqli_connect($db_hostname, $db_username, $db_password);
    if (!$db_server) die("Unable to connect to MySQL: " . mysqli_error());
    mysqli_select_db($db_server, $db_database) or die("Unable to select database: " . mysqli_error($db_server));

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$listingType = $request->listingType;
    @$comments = json_encode($request->comments);
       

    if ($listingType == "textbooks") {

        @$textbook_id = (int)$request->textbook_id;
        //update comments field only
        $query = "UPDATE $listingType SET comments='$comments' WHERE textbook_id=$textbook_id;";

    } elseif ($listingType =="accessories") {

        @$accessory_id = (int)$request->accessory_id;

        $query = "UPDATE $listingType SET comments='$comments' WHERE accessory_id=$accessory_id;";


    } elseif ($listingType =="services") {
           
        @$service_id = (int)$request->service_id;

        $query = "UPDATE $listingType SET comments='$comments' WHERE service_id=$service_id;";
    }

    //do query
    $result = mysqli_query($db_server, $query);
    // $result2 = mysqli_query($db_server, $query2);
    // $row = mysqli_fetch_row($result2);
    // echo (int)$row[0];
?>
