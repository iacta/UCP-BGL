import "./globals.css";
import { inter } from "./fonts";
import { Toaster } from "@/components/ui/Toaster";


export const metadata = {
  title: "UCP",
  description: "UCP User",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-950 text-white`}>{children}
        <Toaster />
      </body>
    </html>
  );
}
