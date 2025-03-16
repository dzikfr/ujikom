<?php
include "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nim = $_POST["nim"];
    $nama = $_POST["nama"];
    $gender = $_POST["gender"];
    $jurusan = $_POST["jurusan"];

    $sql = "INSERT INTO table_mahasiswa (nim, nama, gender, jurusan) VALUES ('$nim', '$nama', '$gender', '$jurusan')";

    if ($conn->query($sql)) {
        header("Location: index.php");
        exit();
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
