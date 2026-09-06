"use client";

import { useState } from "react";

export default function Calculator({ harga = 0 }) {
  const [lamaSewa, setLamaSewa] = useState(1);

  // Menghitung total biaya: harga per hari * jumlah hari
  const totalBiaya = harga * lamaSewa;

  return (
    <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
      <h4 className="font-semibold text-xs uppercase text-gray-500 mb-2">
        Hitung Biaya Sewa
      </h4>

      <div className="flex items-center gap-2 mb-2">
        <label className="text-xs text-gray-600 font-medium">Lama sewa:</label>
        <input
          type="number"
          min="1"
          value={lamaSewa}
          onChange={(e) => setLamaSewa(Math.max(1, Number(e.target.value) || 1))}
          className="w-16 border border-gray-300 rounded px-2 py-1 text-sm text-center font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <span className="text-xs text-gray-600">hari</span>
      </div>

      <div className="pt-2 border-t flex justify-between items-center text-xs">
        <span className="text-gray-500">Total ({lamaSewa} hari):</span>
        <span className="text-sm font-bold text-blue-600">
          Rp{totalBiaya.toLocaleString("id-ID")}
        </span>
      </div>
    </div>
  );
}

