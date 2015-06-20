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

    
        $query = "INSERT INTO $listingType VALUES ($textbookName, $author, $edition, $class1, $class2, $class3, $class4, $class5, $price, $accpetingOffers, $sellerName, $description, $contactInfo, $password, $date, NULL);"; 
        echo $query;
    } elseif ($listingType =="accessories") {

            //accessory exclusive fields
            @$accessoryName = $request->accessoryName;

            $query = "INSERT INTO $listingType VALUES ($accessoryName, $price, $accpetingOffers, $sellerName, $description, $contactInfo, $password, $date, NULL);"; 
            echo $query;
        } 
    else {
            echo "This is a service listing";
    };

    //do query
    $result = mysqli_query($query);

    echo "bitch";
    echo $listingType;
    echo "bitch2";


?>  