<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With, X-Auth-Token, Origin, Application");
$servername = "srv2.zetohosting.pl";
$username = "aleksand_admin";
$password = "Rakoczego19";
$dbname = "aleksand_sps";

$connection = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($connection, 'utf8'); 

if ($connection -> connect_errno) {
  echo "Failed to connect to MySQL: " . $connection -> connect_error;
  exit();
}

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$courseID = $input["courseID"];
$groupID = $input["groupID"];
$date = $input["date"];
$time = $input["time"];
$description = $input["description"];

$sql = "INSERT 
        INTO `events` (`id`, `date`, `time`, `description`, `course_fk`, `year_group_fk`)
        VALUES (NULL, '$date', '$time', '$description', '$courseID', '$groupID')";

$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

mysqli_close($connection);
?>