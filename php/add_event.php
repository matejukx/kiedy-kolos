<?php
header("Access-Control-Allow-Origin: *");
$servername = "srv2.zetohosting.pl";
$username = "aleksand_admin";
$password = "Rakoczego19";
$dbname = "aleksand_sps";

$connection = new mysqli($servername, $username, $password, $dbname);
$date = $_GET['date'];
$name = $_GET['name'];

// Check connection
if ($connection -> connect_errno) {
  echo "Failed to connect to MySQL: " . $connection -> connect_error;
  exit();
}


$sql = "SELECT id FROM course WHERE name='$name'";
$result = $connection->query($sql);
$row = mysqli_fetch_assoc($result);
$id = $row["id"];

$sql = "INSERT INTO `events` (`id`, `date`, `course_fk`, `year_group_fk`)
VALUES (NULL, '$date', '$id', '8')";
$result = $connection->query($sql);
echo "success";

mysqli_close($connection);
?>