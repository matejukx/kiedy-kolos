<?php
header("Access-Control-Allow-Origin: *");
$servername = "srv2.zetohosting.pl";
$username = "aleksand_admin";
$password = "Rakoczego19";
$dbname = "aleksand_sps";

$connection = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($connection, 'utf8'); 
$date = $_GET['date'];

// Check connection
if ($connection -> connect_errno) {
  echo "Failed to connect to MySQL: " . $connection -> connect_error;
  exit();
}


$sql = "SELECT events.id, events.date, events.description, year_group.name as group_name, course.name
        FROM events
        INNER JOIN year_group ON events.year_group_fk=year_group.id
        INNER JOIN course ON events.course_fk=course.id
        WHERE events.date='$date'";
$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

//create an array
$emparray = array();
while($row =mysqli_fetch_assoc($result))
{
    $emparray[] = $row;
}
echo json_encode($emparray);

mysqli_close($connection);
?>