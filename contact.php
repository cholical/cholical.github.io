<?php

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);


    @$type = $request->type;
    @$senderName = $request->senderName;


    @$senderEmail = $request->senderEmail;
    @$message = $request->message;


    $recipient = "support@campuscache.org";


    $subject = "New Message from : ".$senderName;


    $email_content = $message;


    $email_headers = "Message type: ".$type.". Recieved from : ".$senderEmail;



    mail($recipient, $subject, $email_content, $email_headers);
    
    
?>  