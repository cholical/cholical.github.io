<?php

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$listingType = $request->listingType;
    @$item_id = $request->item_id;
    $item_id = (string)$item_id;
    @$reason = $request->reason;
    $recipient = "admin@campuscache.org";
    $subject = "Listing Report";
    $email_content = "Report on " . $listingType . ": " . $item_id . " because: " . $reason;
    $email_headers = "REPORT";
    mail($recipient, $subject, $email_content, $email_headers);
    

?>  