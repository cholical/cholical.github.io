<?php
    require_once 'login.php'; 
    //open connection to mysql db
    $db_server = mysqli_connect($db_hostname, $db_username, $db_password);
    if (!$db_server) die("Unable to connect to MySQL: " . mysqli_error());
    mysqli_select_db($db_server, $db_database) or die("Unable to select database: " . mysqli_error($db_server));

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$listingType = $request->listingType;
    
    //common variables
    @$price = $request->price;
    @$acceptingOffers = $request->acceptingOffers;
    @$sellerName = $request->sellerName;
    @$description = $request->description;
    @$contactInfo = $request->contactInfo;
    @$password = $request->password;
    @$date = $request->date;

    if ($listingType == "textbooks") {

        //textbook exclusive fields
        @$textbookName = $request->textbookName;
        @$author = $request->author;
        @$edition = $request->edition;
        @$class1 = $request->class1;
        @$class2 = $request->class2;
        @$class3 = $request->class3;
        @$class4 = $request->class4;
        @$class5 = $request->class5;

        @$textbook_id = (int)$request->textbook_id;

        $query = "SELECT price FROM $listingType WHERE textbook_id=$textbook_id;";
        $result = mysqli_query($db_server, $query) or die("Error in Selecting " . mysqli_error($db_server));

        if (mysqli_num_rows($result) > 0) { 
        //if a listing with the passed in id exists, update instead of insert
           
            $query = "UPDATE $listingType SET textbookName='$textbookName', author='$author', edition='$edition', class1='$class1', class2='$class2', class3='$class3', class4='$class4', class5='$class5', price='$price', acceptingOffers='$acceptingOffers', sellerName='$sellerName', description='$description', contactInfo='$contactInfo', password='$password', date='$date' WHERE textbook_id=$textbook_id;";
     
        } else {
        //this is a new listing, so use insert into

            $query = "INSERT INTO $listingType VALUES ('$textbookName', '$author', '$edition', '$class1', '$class2', '$class3', '$class4', '$class5', '$price', '$acceptingOffers', '$sellerName', '$description', '$contactInfo', '$password', '$date', NULL);"; 

        };

        $query2 = "SELECT textbook_id FROM $listingType WHERE date='$date' and sellerName='$sellerName';";
        
    } elseif ($listingType =="accessories") {

            //accessory exclusive fields
            @$accessoryName = $request->accessoryName;

            @$accessory_id = (int)$request->accessory_id;

            $query = "SELECT price FROM $listingType WHERE accessory_id=$accessory_id;";
            $result = mysqli_query($db_server, $query) or die("Error in Selecting " . mysqli_error($db_server));

            if (mysqli_num_rows($result) > 0) { 
            //if a listing with the passed in id exists, update instead of insert
               
                $query = "UPDATE $listingType SET accessoryName='$accessoryName', price='$price', acceptingOffers='$acceptingOffers', sellerName='$sellerName', description='$description', contactInfo='$contactInfo', password='$password', date='$date' WHERE accessory_id=$accessory_id;";
                
            
            } else {
            //this is a new listing, so use insert into

                $query = "INSERT INTO $listingType VALUES ('$accessoryName', '$price', '$acceptingOffers', '$sellerName', '$description', '$contactInfo', '$password', '$date', NULL);"; 

            };

            $query2 = "SELECT accessory_id FROM $listingType WHERE date='$date' and sellerName='$sellerName';";

        } 
    else {
        //this is a service listing most likely unless ronald was stupid and passed in something other than services
    };

    //do query
    $result = mysqli_query($db_server, $query);

    //eventually we might echo the listing id. get the listing id by selecting from the table where date = $date and so on
    $result2 = mysqli_query($db_server, $query2);
    $row = mysqli_fetch_row($result2);
    echo (int) $row[0];

?>  