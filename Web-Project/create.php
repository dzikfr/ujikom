<?php include "config.php"; ?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah Mahasiswa</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body class="bg-light">

<div class="container mt-5">
    <h2 class="text-center mb-4">Tambah Mahasiswa</h2>
    <form action="create_process.php" method="POST">
        <div class="mb-3">
            <label class="form-label">NIM:</label>
            <input type="number" name="nim" class="form-control" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Nama:</label>
            <input type="text" name="nama" class="form-control" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Gender:</label>
            <select name="gender" class="form-control" required>
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
            </select>
        </div>
        <div class="mb-3">
            <label class="form-label">Jurusan:</label>
            <select name="jurusan" class="form-control" required>
                <option value="Teknik Informatika">Teknik Informatika</option>
                <option value="Sistem Informasi">Sistem Informasi</option>
                <option value="Teknik Elektro">Teknik Elektro</option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary w-100">Simpan</button>
    </form>
</div>

</body>
</html>
