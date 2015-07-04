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
    @$sellerName = mysqli_real_escape_string($db_server, $request->sellerName);
    @$description = mysqli_real_escape_string($db_server, $request->description);
    @$contactInfo = mysqli_real_escape_string($db_server, $request->contactInfo);
    @$password = mysqli_real_escape_string($db_server, $request->password);
    @$date = $request->date;
    @$images = json_encode($request->images);

    

    if ($listingType == "textbooks") {

        //textbook exclusive fields
        @$textbookName = mysqli_real_escape_string($db_server, $request->textbookName);
        @$author = mysqli_real_escape_string($db_server, $request->author);
        @$edition = mysqli_real_escape_string($db_server, $request->edition);
        @$class1 = mysqli_real_escape_string($db_server, $request->class1);
        @$class2 = mysqli_real_escape_string($db_server, $request->class2);
        @$class3 = mysqli_real_escape_string($db_server, $request->class3);
        @$class4 = mysqli_real_escape_string($db_server, $request->class4);
        @$class5 = mysqli_real_escape_string($db_server, $request->class5);

        @$textbook_id = (int)$request->textbook_id;

        $query = "SELECT price FROM $listingType WHERE textbook_id=$textbook_id;";
        $result = mysqli_query($db_server, $query) or die("Error in Selecting " . mysqli_error($db_server));

        if (mysqli_num_rows($result) > 0) {
        //if a listing with the passed in id exists, update instead of insert

            $query = "UPDATE $listingType SET textbookName='$textbookName', author='$author', edition='$edition', class1='$class1', class2='$class2', class3='$class3', class4='$class4', class5='$class5', price='$price', acceptingOffers='$acceptingOffers', sellerName='$sellerName', description='$description', contactInfo='$contactInfo', password='$password', date='$date', images='$images' WHERE textbook_id=$textbook_id;";

        } else {
        //this is a new listing, so use insert into

            $query = "INSERT INTO $listingType VALUES ('$textbookName', '$author', '$edition', '$class1', '$class2', '$class3', '$class4', '$class5', '$price', '$acceptingOffers', '$sellerName', '$description', '$contactInfo', '$password', '$date', '$images', NULL);";

        };

        $query2 = "SELECT textbook_id FROM $listingType WHERE date='$date' and sellerName='$sellerName';";

    } elseif ($listingType =="accessories") {

            //accessory exclusive fields
            @$accessoryName = mysqli_real_escape_string($db_server, $request->accessoryName);

            @$accessory_id = (int)$request->accessory_id;

            $query = "SELECT price FROM $listingType WHERE accessory_id=$accessory_id;";
            $result = mysqli_query($db_server, $query) or die("Error in Selecting " . mysqli_error($db_server));

            if (mysqli_num_rows($result) > 0) {
            //if a listing with the passed in id exists, update instead of insert

                $query = "UPDATE $listingType SET accessoryName='$accessoryName', price='$price', acceptingOffers='$acceptingOffers', sellerName='$sellerName', description='$description', contactInfo='$contactInfo', password='$password', date='$date', images='$images' WHERE accessory_id=$accessory_id;";


            } else {
            //this is a new listing, so use insert into

                $query = "INSERT INTO $listingType VALUES ('$accessoryName', '$price', '$acceptingOffers', '$sellerName', '$description', '$contactInfo', '$password', '$date', '$images', NULL);";
                echo $query;
            };

            $query2 = "SELECT accessory_id FROM $listingType WHERE date='$date' and sellerName='$sellerName';";

        }
    elseif ($listingType =="services") {

            //service exclusive fields
            @$serviceName = mysqli_real_escape_string($db_server, $request->serviceName);

            @$service_id = (int)$request->service_id;

            $query = "SELECT price FROM $listingType WHERE service_id=$service_id;";
            $result = mysqli_query($db_server, $query) or die("Error in Selecting " . mysqli_error($db_server));

            if (mysqli_num_rows($result) > 0) {
            //if a listing with the passed in id exists, update instead of insert

                $query = "UPDATE $listingType SET serviceName='$serviceName', price='$price', acceptingOffers='$acceptingOffers', sellerName='$sellerName', description='$description', contactInfo='$contactInfo', password='$password', date='$date', images='$images' WHERE service_id=$service_id;";


            } else {
            //this is a new listing, so use insert into

                $query = "INSERT INTO $listingType VALUES ('$serviceName', '$price', '$acceptingOffers', '$sellerName', '$description', '$contactInfo', '$password', '$date', '$images', NULL);";

            };

            $query2 = "SELECT service_id FROM $listingType WHERE date='$date' and sellerName='$sellerName';";

        }

    //do query
    $result = mysqli_query($db_server, $query);

    //eventually we might echo the listing id. get the listing id by selecting from the table where date = $date and so on
    $result2 = mysqli_query($db_server, $query2);
    $row = mysqli_fetch_row($result2);
    echo (int)$row[0];
?>
