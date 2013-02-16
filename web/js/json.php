<?php
   $json = $_POST['json'];
   echo "Hello";
   if (json_decode($json) != null) { /* sanity check */
     $file = fopen('json20.json','w+');
     fwrite($file, $json);
     fclose($file);
   } else {
     // handle error 
   }
?>