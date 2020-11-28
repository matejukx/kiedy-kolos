<?php
header("Access-Control-Allow-Origin: *");
$servername = "srv2.zetohosting.pl";
$username = "aleksand_admin";
$password = "Rakoczego19";
$dbname = "aleksand_sps";

$connection = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($connection, 'utf8'); 
// Check connection
if ($connection -> connect_errno) {
  echo "Failed to connect to MySQL: " . $connection -> connect_error;
  exit();
}

$sql = "SELECT events.id, events.date, year_group.number, course.name, course.short_name
        FROM events
        INNER JOIN year_group ON events.year_group_fk=year_group.id
        INNER JOIN course ON events.course_fk=course.id";
        
$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

//create an array
$emparray = array();
while($row =mysqli_fetch_assoc($result))
{
    $emparray[] = $row;
}
echo json_encode($emparray);

//http://aleksanderblaszkiewicz.pl/kiedykolos/get_events.php

//close the db connection
mysqli_close($connection);

?>