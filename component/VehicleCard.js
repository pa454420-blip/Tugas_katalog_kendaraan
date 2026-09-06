export default function VehicleCard({ nama, year, harga, jenis, status, gambar }) {
  return (
    <div className="rounded-xl border p-4 bg-white shadow-sm">
      {gambar && (
        <img
          src={gambar}
          alt={nama}
          className="w-full h-40 object-cover rounded-lg mb-3 bg-gray-100"
        />
      )}
      <h3 className="font-bold text-lg">{nama}</h3>
      <p className="text-gray-600 text-sm">{jenis}</p>
      <p className="font-semibold mt-2">
        Rp{typeof harga === "number" ? harga.toLocaleString("id-ID") : harga}/hari
      </p>
      {status && (
        <p
          className={`text-xs font-semibold mt-2 inline-block px-2 py-1 rounded ${
            status.toLowerCase() === "tersedia"
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

