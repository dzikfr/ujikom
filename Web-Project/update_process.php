<?php
include "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nim_lama = $_POST["nim"]; 
    $nim_baru = $_POST["nim_update"]; 
    $nama = $_POST["nama"];
    $gender = $_POST["gender"];
    $jurusan = $_POST["jurusan"];

    $sql = "UPDATE table_mahasiswa SET nim='$nim_baru', nama='$nama', gender='$gender', jurusan='$jurusan' WHERE nim='$nim_lama'";

    if ($conn->query($sql)) {
        header("Location: index.php");
        exit();
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
