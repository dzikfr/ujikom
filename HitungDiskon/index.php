<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hitung Diskon</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>

<body class="bg-light">

    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow-lg p-4">
                    <h3 class="text-center mb-4">Hitung Diskon</h3>
                    <form method="POST">
                        <div class="mb-3">
                            <label for="harga" class="form-label">Masukkan Harga:</label>
                            <input type="number" class="form-control" id="harga" name="harga" required>
                        </div>
                        <button type="submit" class="btn btn-dark w-100">Hitung</button>
                    </form>

                    <?php
                    if ($_SERVER["REQUEST_METHOD"] == "POST") {
                        $harga = (int)$_POST["harga"];
                        $diskon = 0;

                        if ($harga >= 100000) {
                            $diskon = 10;
                        } elseif ($harga >= 50000) {
                            $diskon = 6;
                        }

                        $potongan = ($diskon / 100) * $harga;
                        $hargaAkhir = $harga - $potongan;

                        echo "<div class='mt-4 alert alert-info text-center'>";
                        echo "<p><strong>Harga Awal:</strong> Rp " . number_format($harga, 0, ',', '.') . "</p>";
                        echo "<p><strong>Diskon:</strong> $diskon% (Rp " . number_format($potongan, 0, ',', '.') . ")</p>";
                        echo "<p><strong>Harga Setelah Diskon:</strong> Rp " . number_format($hargaAkhir, 0, ',', '.') . "</p>";
                        echo "</div>";
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>

</body>

</html>