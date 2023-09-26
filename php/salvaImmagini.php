<?php

$nome = $_POST["nome"]; // Assuming "nome" is the key sent from JavaScript
$imgData = $_POST["img"];

// Perform any necessary processing here

// For example, you can save the base64 image data to a file
$imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $imgData));
   
   if (!file_exists($_SERVER['DOCUMENT_ROOT'] . "/img")) {
       mkdir($_SERVER['DOCUMENT_ROOT'] . "/img", 0777, true);
   }
   
   $file = $_SERVER['DOCUMENT_ROOT'] . "/img/".$nome.'.png';
   
   $success = file_put_contents($file, $imageData);
   print $success ? $file.' saved.' : 'Unable to save the file.';
