import kendaraan from "./data";

function KartuKendaraan({ nama, jenis, harga = "-", status, gambar }) {
  return (
    <div className="rounded-lg border p-4 mb-3 bg-blue-100 shadow-sm">
      {gambar && (
        <img
          src={gambar}
          alt={nama}
          className="w-full h-48 object-cover rounded-md mb-3 bg-gray-100"
        />
      )}
      <h2 className="font-semibold text-lg">{nama}</h2>
      {jenis && <p className="text-sm text-gray-600">Jenis: {jenis}</p>}
      <p className="text-sm font-medium">Harga: {harga}</p>
      {status && (
        <p
          className={`text-xs font-semibold mt-2 inline-block px-2 py-1 rounded ${
            status.toUpperCase() === "TERSEDIA"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
}

function Kotak({ children }) {
  return <div className="rounded-lg border p-4 mb-4 bg-gray-50">{children}</div>;
}

export default function BerandaPage() {
  const tersedia = true;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl text-purple-600 font-bold mb-6 text-center">DAFTAR KENDARAAN</h1>

      {/* Kotak Promo */}
      <Kotak>
        <h2 className="font-bold text-lg">Promo</h2>
        <p className="text-gray-600">Diskon spesial minggu ini!</p>
        <div className="mt-2 text-sm">
          Status Promo:{" "}
          {tersedia ? (
            <span className="text-green-600 font-medium">Ready stock & Bisa dibeli</span>
          ) : (
            <span className="text-red-500 font-medium">Habis</span>
          )}
        </div>
      </Kotak>

      {/* Daftar Kartu Kendaraan dari data.js */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kendaraan.map((item) => (
          <KartuKendaraan
            key={item.id}
            nama={item.nama}
            jenis={item.jenis}
            harga={`Rp${item.harga.toLocaleString("id-ID")}`}
            status={item.status}
            gambar={item.gambar}
          />
        ))}
      </div>
    </div>
  );
}