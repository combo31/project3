<?php
$_POST = json_decode(file_get_contents("php://input"), true);// декодируем json
echo var_dump($_POST);
