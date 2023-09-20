<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "order_tracking";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Execute query to retrieve data from the table
$sql = "SELECT * FROM order_tracking";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        echo "Tracker_ID: " . $row["Tracker_ID"] . "<br>";
        echo "Bot_No: " . $row["Bot_No"] . "<br>";
        echo "Location: " . $row["Location"] . "<br>";
        echo "Start_Latitude: " . $row["Start_Latitude"] . "<br>";
        echo "Start_Longitude: " . $row["Start_Longitude"] . "<br>";
        echo "Stop_Latitude: " . $row["Stop_Latitude"] . "<br>";
        echo "Stop_Longitude: " . $row["Stop_Longitude"] . "<br>";
    }
} else {
    echo "No results";
}
$conn->close();

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Execute query to retrieve data from the table
$sql = "SELECT * FROM order_tracking";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        echo "Tracker_ID: " . $row["Tracker_ID"] . "<br>";
        echo "Bot_No: " . $row["Bot_No"] . "<br>";
        echo "Location: " . $row["Location"] . "<br>";
        echo "Start_Latitude: " . $row["Start_Latitude"] . "<br>";
        echo "Start_Longitude: " . $row["Start_Longitude"] . "<br>";
        echo "Stop_Latitude: " . $row["Stop_Latitude"] . "<br>";
        echo "Stop_Longitude: " . $row["Stop_Longitude"] . "<br>";
    }
} else {
    echo "No results";
}
$conn->close();
?>