
			// URL RSS feed dari UIN Jambi
			const RSS_URL = "https://uinjambi.ac.id/feed";

// Fungsi untuk memuat dan menampilkan RSS
async function loadRSS() {
    try {
        // Memanggil API untuk mengonversi RSS ke format JSON
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`);
        const data = await response.json();

        // Cek status dari respons API
        if (data.status === "ok") {
            let content = ""; // Variabel untuk menyimpan HTML berita

            // Ambil hanya 4 berita terbaru
            data.items.slice(0, 4).forEach(item => {
                // Ambil hanya 5 kata pertama dari ringkasan
                const summary = item.description.split(" ").slice(0, 5).join(" ") + "...";

                // Bangun konten untuk setiap item berita
                content += `
                    <div class="rss-item">
                        <div class="rss-icon">📰</div>
                        <div>
                            <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                            <p>${summary}</p>
                        </div>
                    </div>
                `;
            });

            // Menampilkan konten berita di elemen dengan id 'rss-content'
            document.getElementById("rss-content").innerHTML = content;
        } else {
            // Tampilkan pesan jika tidak dapat memuat berita
            document.getElementById("rss-content").innerHTML = "Tidak dapat memuat berita.";
        }
    } catch (error) {
        // Tangani kesalahan dalam memuat RSS
        console.error("Error loading RSS:", error);
        document.getElementById("rss-content").innerHTML = "Gagal memuat RSS feed.";
    }
}

// Memuat RSS saat halaman dimuat
window.onload = loadRSS;
