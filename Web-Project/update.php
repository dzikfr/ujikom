<?php
    include "config.php";

    $nim    = $_GET["nim"];
    $result = $conn->query("SELECT * FROM table_mahasiswa WHERE nim = '$nim'");
    $data   = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Mahasiswa</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body class="bg-light">

<div class="container mt-5">
    <h2 class="text-center mb-4">Edit Mahasiswa</h2>
    <form action="update_process.php" method="POST">
        <input type="hidden" name="nim" value="<?php echo $data['nim']?>">
        <div class="mb-3">
            <label class="form-label">NIM:</label>
            <input type="number" name="nim_update" class="form-control" value="<?php echo $data['nim']?>" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Nama:</label>
            <input type="text" name="nama" class="form-control" value="<?php echo $data['nama']?>" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Gender:</label>
            <select name="gender" class="form-control" required>
                <option value="Laki-Laki" <?php echo $data['gender'] == "Laki-Laki" ? "selected" : ""?>>Laki-Laki</option>
                <option value="Perempuan" <?php echo $data['gender'] == "Perempuan" ? "selected" : ""?>>Perempuan</option>
            </select>
        </div>
        <div class="mb-3">
            <label class="form-label">Jurusan:</label>
            <select name="jurusan" class="form-control" required>
                <option value="Teknik Informatika" <?php echo $data['jurusan'] == "Teknik Informatika" ? "selected" : ""?>>Teknik Informatika</option>
                <option value="Sistem Informasi" <?php echo $data['jurusan'] == "Sistem Informasi" ? "selected" : ""?>>Sistem Informasi</option>
                <option value="Teknik Elektro" <?php echo $data['jurusan'] == "Teknik Elektro" ? "selected" : ""?>>Teknik Elektro</option>
            </select>
        </div>

        <button type="submit" class="btn btn-warning w-100">Update</button>
    </form>
</div>

</body>
</html>
