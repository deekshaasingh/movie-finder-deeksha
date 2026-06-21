import "./globals.css";
import Link from "next/link";
import Footer from "../components/Footer";

export const metadata = {
  title: "Reel — Find your next obsession",
  description: "Browse, search, and save shows worth staying in for.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header className="site-header">
          <div className="container inner">
            <Link href="/" className="brand">
              Reel<span>.</span>
            </Link>
            <nav className="nav-links">
              <Link href="/">Browse</Link>
              <Link href="/favorites">Favorites</Link>
            </nav>
          </div>
        </header>

        <main className="container">{children}</main>

        <Footer />
      </body>
    </html>
  );
}