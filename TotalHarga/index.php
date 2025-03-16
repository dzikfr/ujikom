<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Pemesanan Makanan</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>

<body class="bg-light">

    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow-lg p-4">
                    <h3 class="text-center mb-4">Form Pemesanan Makanan</h3>
                    <form method="POST">
                        <div class="mb-3">
                            <label for="jumlah_nasi_goreng" class="form-label">Nasi Goreng (Rp. 10.000):</label>
                            <input type="number" class="form-control" id="jumlah_nasi_goreng" name="jumlah_nasi_goreng"
                                required min="0">
                        </div>
                        <div class="mb-3">
                            <label for="jumlah_ayam_goreng" class="form-label">Ayam Goreng (Rp. 12.000):</label>
                            <input type="number" class="form-control" id="jumlah_ayam_goreng" name="jumlah_ayam_goreng"
                                required min="0">
                        </div>
                        <div class="mb-3">
                            <label for="jumlah_es_teh" class="form-label">Es Teh (Rp. 2.000):</label>
                            <input type="number" class="form-control" id="jumlah_es_teh" name="jumlah_es_teh" required
                                min="0">
                        </div>
                        <div class="mb-3">
                            <label for="jumlah_kopi" class="form-label">Kopi (Rp. 1.000):</label>
                            <input type="number" class="form-control" id="jumlah_kopi" name="jumlah_kopi" required
                                min="0">
                        </div>
                        <button type="submit" class="btn btn-dark w-100">Hitung Total Harga</button>
                    </form>

                    <?php
                    if ($_SERVER["REQUEST_METHOD"] == "POST") {
                        // Harga per item
                        $harga_nasi_goreng = 10000;
                        $harga_ayam_goreng = 12000;
                        $harga_es_teh = 2000;
                        $harga_kopi = 1000;

                        // Ambil input jumlah yang dipesan
                        $jumlah_nasi_goreng = (int) $_POST["jumlah_nasi_goreng"];
                        $jumlah_ayam_goreng = (int) $_POST["jumlah_ayam_goreng"];
                        $jumlah_es_teh = (int) $_POST["jumlah_es_teh"];
                        $jumlah_kopi = (int) $_POST["jumlah_kopi"];

                        // Hitung total harga
                        $total_harga = ($jumlah_nasi_goreng * $harga_nasi_goreng) +
                                       ($jumlah_ayam_goreng * $harga_ayam_goreng) +
                                       ($jumlah_es_teh * $harga_es_teh) +
                                       ($jumlah_kopi * $harga_kopi);

                        echo "<div class='mt-4 alert alert-info text-center'>";
                        echo "<h4>Total Harga: Rp " . number_format($total_harga, 0, ',', '.') . "</h4>";
                        echo "</div>";
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>

</body>

</html>