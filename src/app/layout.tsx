
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // O la fuente que uses (ej: Geist)
import "./globals.css"; // Asegúrate que globals.css exista y tenga la base de CSS
import Sidebar from "./components/Sidebar"; // Importar Sidebar
import Header from "./components/Header";   // Importar Header
import layoutStyles from './layout.module.css';    // Importar estilos del layout

const inter = Inter({ subsets: ["latin"] }); // O GeistSans, etc.

export const metadata: Metadata = {
  title: "Portal Proveedores", // Título general
  description: "Portal de gestión para proveedores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es"> {/* Lenguaje español */}
      <body className={inter.className}> {/* Aplicar fuente */}
        <div className={layoutStyles.appContainer}>
          {/* Sidebar Fijo */}
          <Sidebar />
          {/* Placeholder para ocupar el espacio del sidebar fijo */}
          <div className={layoutStyles.sidebarPlaceholder}></div>

          {/* Contenedor Principal (Header Fijo + Contenido Página) */}
          <div className={layoutStyles.mainContentWrapper}>
            {/* Header Fijo */}
            <Header />
             {/* Placeholder para ocupar el espacio del header fijo */}
            <div className={layoutStyles.headerPlaceholder}></div>

            {/* Área donde se renderiza el contenido de cada página */}
            <main className={layoutStyles.pageContent}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}