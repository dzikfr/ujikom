<?php
include "config.php"; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $no = (int) $_POST["no"];
    $nama_merk = $_POST["nama_merk"];
    $warna = $_POST["warna"];
    $jumlah = (int) $_POST["jumlah"];

    // Cek apakah nomor sudah ada di database
    $cekQuery = "SELECT * FROM printer WHERE no = $no";
    $cekResult = $conn->query($cekQuery);

    if ($cekResult->num_rows > 0) {
        echo "<div class='alert alert-danger'>Nomor ini sudah digunakan!</div>";
    } elseif (!empty($no) && !empty($nama_merk) && !empty($warna) && $jumlah > 0) {
        // Insert data ke database
        $sql = "INSERT INTO printer (no, nama_merk, warna, jumlah) VALUES ($no, '$nama_merk', '$warna', $jumlah)";
        if ($conn->query($sql) === TRUE) {
            echo "<div class='alert alert-success'>Data berhasil ditambahkan!</div>";
        } else {
            echo "<div class='alert alert-danger'>Error: " . $conn->error . "</div>";
        }
    } else {
        echo "<div class='alert alert-warning'>Semua kolom harus diisi!</div>";
    }
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah Data Printer</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body class="bg-light">

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow-lg p-4">
                <h3 class="text-center mb-4">Tambah Data Printer</h3>
                <form method="POST">
                    <div class="mb-3">
                        <label for="no" class="form-label">Nomor:</label>
                        <input type="number" class="form-control" id="no" name="no" required>
                    </div>
                    <div class="mb-3">
                        <label for="nama_merk" class="form-label">Nama Merk:</label>
                        <input type="text" class="form-control" id="nama_merk" name="nama_merk" required>
                    </div>
                    <div class="mb-3">
                        <label for="warna" class="form-label">Warna:</label>
                        <input type="text" class="form-control" id="warna" name="warna" required>
                    </div>
                    <div class="mb-3">
                        <label for="jumlah" class="form-label">Jumlah:</label>
                        <input type="number" class="form-control" id="jumlah" name="jumlah" required min="1">
                    </div>
                    <button type="submit" class="btn btn-dark w-100">Tambah</button>
                </form>
            </div>
        </div>
    </div>
</div>

</body>
</html>
