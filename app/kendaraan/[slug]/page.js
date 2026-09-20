import Link from "next/link";
import { notFound } from "next/navigation";
import { getVehicle } from "@/lib/api";

export default async function DetailPage({ params }) {
  const { slug } = await params;          // Next.js 16: await dulu
  const item = await getVehicle(slug);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/kendaraan" className="text-sm text-gray-600">Kembali ke katalog</Link>
      <img src={item.foto?.[0]} alt={item.nama} className="w-full h-72 object-cover rounded-xl mt-4 bg-gray-100" />
      <h1 className="text-3xl font-bold mt-5">{item.nama}</h1>
      <p className="text-gray-600">{item.jenis} · {item.transmisi} · {item.kapasitas} orang</p>
      <p className="text-2xl font-semibold mt-2">Rp{item.harga_harian.toLocaleString("id-ID")}/hari</p>
      <p className="text-gray-700 mt-3">{item.deskripsi}</p>
    </div>
  );
}