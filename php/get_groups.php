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

$sql = "SELECT id, name FROM year_group";
        
$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

//create an array
$emparray = array();
while($row =mysqli_fetch_assoc($result))
{
    $emparray[] = $row;
}
echo json_encode($emparray);

//close the db connection
mysqli_close($connection);

?>