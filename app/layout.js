import Navbar from "@/component/navbar";
import "./globals.css";

export const metadata = {
  title: "Katalog Kendaraan",
  description: "Aplikasi latihan Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}