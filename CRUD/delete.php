<?php
include "config.php";

if (isset($_GET["nim"])) {
    $nim = $_GET["nim"];
    $sql = "DELETE FROM table_mahasiswa WHERE nim = '$nim'";

    if ($conn->query($sql)) {
        header("Location: index.php");
        exit();
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
