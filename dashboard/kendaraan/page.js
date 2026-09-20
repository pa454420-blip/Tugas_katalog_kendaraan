"use client";
import { useEffect, useState } from "react";
import { fetchAuth, fetchUpload } from "@/lib/auth";

const KOSONG = { nama: "", slug: "", jenis: "mobil", transmisi: "matic", harga_harian: "", kapasitas: "", status: "tersedia", deskripsi: "" };

export default function KendaraanPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(KOSONG);
  const [berkas, setBerkas] = useState([]);   // File[] buat diupload
  const [editId, setEditId] = useState(null);

  async function load() {
    const data = await fetchAuth("/vehicles");
    setItems(data.data ?? data);
  }
  useEffect(() => { load(); }, []);

  const set = (k, v) => setForm({ ...form, [k]: v });

  function mulaiEdit(k) {
    setEditId(k.id);
    setForm({ nama: k.nama, slug: k.slug, jenis: k.jenis, transmisi: k.transmisi, harga_harian: k.harga_harian, kapasitas: k.kapasitas, status: k.status, deskripsi: k.deskripsi ?? "" });
  }
  function batal() { setEditId(null); setForm(KOSONG); setBerkas([]); }

  async function simpan(e) {
    e.preventDefault();
    const body = JSON.stringify({ ...form, harga_harian: Number(form.harga_harian), kapasitas: Number(form.kapasitas) });
    // 1) simpan data kendaraan (JSON) — POST kalau baru, PATCH kalau edit
    const v = editId
      ? await fetchAuth(`/vehicles/${editId}`, { method: "PATCH", body })
      : await fetchAuth("/vehicles", { method: "POST", body });
    // 2) kalau ada foto dipilih, upload (multipart) ke id kendaraannya
    const id = editId ?? v.id;
    if (berkas.length) {
      const fd = new FormData();
      berkas.forEach((file) => fd.append("files", file));   // field name: "files"
      await fetchUpload(`/vehicles/${id}/photos`, fd);
    }
    batal();
    load();
  }

  async function hapus(id) {
    if (!confirm("Hapus kendaraan ini?")) return;
    await fetchAuth(`/vehicles/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Kendaraan</h1>

      <form onSubmit={simpan} className="mb-8 grid max-w-lg gap-3 rounded-xl border p-4">
        <input placeholder="Nama" value={form.nama} onChange={(e) => set("nama", e.target.value)} className="rounded border px-3 py-2" />
        <input placeholder="Slug (mis. toyota-avanza-2022)" value={form.slug} onChange={(e) => set("slug", e.target.value)} className="rounded border px-3 py-2" />
        <select value={form.jenis} onChange={(e) => set("jenis", e.target.value)} className="rounded border px-3 py-2">
          <option value="mobil">Mobil</option>
          <option value="motor">Motor</option>
        </select>
        <select value={form.transmisi} onChange={(e) => set("transmisi", e.target.value)} className="rounded border px-3 py-2">
          <option value="matic">Matic</option>
          <option value="manual">Manual</option>
        </select>
        <input type="number" placeholder="Harga per hari" value={form.harga_harian} onChange={(e) => set("harga_harian", e.target.value)} className="rounded border px-3 py-2" />
        <input type="number" placeholder="Kapasitas (orang)" value={form.kapasitas} onChange={(e) => set("kapasitas", e.target.value)} className="rounded border px-3 py-2" />
        <select value={form.status} onChange={(e) => set("status", e.target.value)} className="rounded border px-3 py-2">
          <option value="tersedia">Tersedia</option>
          <option value="disewa">Disewa</option>
        </select>
        <textarea placeholder="Deskripsi" value={form.deskripsi} onChange={(e) => set("deskripsi", e.target.value)} className="rounded border px-3 py-2" />
        <input type="file" multiple accept="image/*" onChange={(e) => setBerkas([...e.target.files])} className="rounded border px-3 py-2" />
        <div className="flex gap-2">
          <button className="rounded-full bg-black px-5 py-2 font-semibold text-white">{editId ? "Simpan Perubahan" : "Tambah Kendaraan"}</button>
          {editId && <button type="button" onClick={batal} className="rounded-full border px-5 py-2">Batal</button>}
        </div>
      </form>

      <ul className="space-y-2">
        {items.map((k) => (
          <li key={k.id} className="flex items-center gap-3 rounded-lg border p-3">
            {k.foto?.[0] && <img src={k.foto[0].url ?? k.foto[0]} alt={k.nama} className="h-12 w-16 rounded object-cover" />}
            <span className="flex-1">{k.nama} · {k.jenis} · Rp{k.harga_harian?.toLocaleString("id-ID")}/hari</span>
            <div className="flex gap-3 text-sm">
              <button onClick={() => mulaiEdit(k)} className="text-blue-600">Edit</button>
              <button onClick={() => hapus(k.id)} className="text-red-600">Hapus</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
