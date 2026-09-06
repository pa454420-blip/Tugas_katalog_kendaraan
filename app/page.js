function KartuKendaraan({ nama, tahun, harga = "-" }) {
  return (
    <div className="rounded-lg border p-4 mb-3">
      <h2 className="font-semibold">{nama}</h2>
      <p>Tahun: {tahun}</p>
      <p>Harga: {harga}</p>
    </div>
  );
}


export default function BerandaPage() {
  return (
    <div>
        
      <h1 className="text-5xl font-bold mb-3 p-6 max-w-2xl mx-auto">DAFTAR KENDARAAN</h1>
      <KartuKendaraan nama="Toyota Avanza" tahun={2022} harga="Rp220jt" />
      <KartuKendaraan nama="Avanza" tahun={2022} harga="Rp220jt" />
      <KartuKendaraan nama="Brio" tahun={2023} harga="Rp180jt" />
      <KartuKendaraan nama="Motor listrik" tahun={2024} harga = "Rp500jt" />
    </div>
  );
}
function Kotak({ children }) {
  return <div className="rounded-lg border p-4">{children}</div>;
}
<Kotak>
  <h2 className="font-bold">Promo</h2>
  <p>Diskon spesial minggu ini!</p>
</Kotak>
const tersedia = true;

{tersedia ? <span>Ready stock</span> : <span>Habis</span>}

{tersedia && <span className="text-green-600">Bisa dibeli</span>}