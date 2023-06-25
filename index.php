<?php

ini_set('display_errors', 'On');

require "lib/qrlib.php";

$ecc = "Q";
$text = "";


if (isset($_GET['type'])) {

    switch ($_GET['type']) {

        case "qr_text":

            $text  = $_GET['text'];
            break;

        case "qr_epc":

            $text = "BCD\n001\n2\nSCT\n";
            $text = $text.$_GET['bic']."\n";
            $text = $text.str_replace("_"," ", $_GET['empfaenger'])."\n";
            $text = $text.$_GET['iban']."\n";
            if (isset($_GET['betrag'])) {
                $text = $text.$_GET['betrag'];
            }
            $text = $text."\n";
            $text = $text."\n\n";
            $text = $text.str_replace("_"," ",$_GET['zweck'])."\n";

            $ecc = "M";

            break;
        

    }

    QRcode::png($text, false, $ecc, 4, 2);

}

else {
    
    $status = 303;
    $answer = "<!DOCTYPE html>\n<html>\n<head>\n<meta http-equiv=\"Refresh\" content=\"0; URL='https://github.com/steedalot/phoenixapi'\">\n</head>\n<body></body>\n</html>";
    http_response_code($status);
    echo $answer;

}

?>