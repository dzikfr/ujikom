<?php
include "config.php";

$result = $conn->query("SELECT nim, nama, gender, jurusan FROM table_mahasiswa");
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Mahasiswa</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body class="bg-light">

<div class="container mt-5">
    <h2 class="text-center mb-4">Data Mahasiswa</h2>
    <a href="create.php" class="btn btn-primary mb-3">Tambah Mahasiswa</a>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>NIM</th>
                <th>Nama</th>
                <th>Gender</th>
                <th>Jurusan</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            <?php while ($row = $result->fetch_assoc()): ?>
                <tr>
                    <td><?= $row["nim"] ?></td>
                    <td><?= $row["nama"] ?></td>
                    <td><?= $row["gender"] ?></td>
                    <td><?= $row["jurusan"] ?></td>
                    <td>
                        <a href="update.php?nim=<?= $row['nim'] ?>" class="btn btn-warning btn-sm">Edit</a>
                        <a href="delete.php?nim=<?= $row['nim'] ?>" class="btn btn-danger btn-sm" onclick="return confirm('Hapus data ini?');">Hapus</a>
                    </td>
                </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
</div>

</body>
</html>
