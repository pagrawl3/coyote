<?php
   $json = $_POST['json'];
   echo "Hello";
   //print_r($json);
   if (json_encode($json) != null) { /* sanity check */
     $file = fopen('json.json','w+');
     fwrite($file, json_encode($json));
     fclose($file);
   } else {
   	  echo "error";
     // handle error 
   }
?>