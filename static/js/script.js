document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const refreshBtn = document.getElementById("refreshBtn");
    const resultEl = document.getElementById("result");
    const textArea = document.getElementById("text");

    // Logika Tombol Refresh
    if (refreshBtn) {
        refreshBtn.addEventListener("click", () => {
            textArea.value = ""; // Kosongkan input
            resultEl.innerText = ""; // Kosongkan hasil
            resultEl.style.backgroundColor = "transparent"; // Reset background jika ada
            textArea.focus(); // Fokuskan kembali ke input
        });
    }

    // Logika Form Submit (Tetap seperti sebelumnya)
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById("submitBtn");
            const text = textArea.value;

            if (!text.trim()) {
                resultEl.innerText = "Silakan masukkan teks terlebih dahulu.";
                resultEl.style.color = "#d9534f";
                return;
            }

            submitBtn.innerText = "Memproses...";
            submitBtn.disabled = true;

            try {
                let res = await fetch("/predict", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text })
                });

                let data = await res.json();
                resultEl.innerText = "Hasil: " + data.result;
                resultEl.style.color = "#CF4B00";
            } catch (error) {
                resultEl.innerText = "Gagal terhubung ke server.";
                resultEl.style.color = "#d9534f";
            } finally {
                submitBtn.innerText = "Analisis Sekarang";
                submitBtn.disabled = false;
            }
        });
    }
});