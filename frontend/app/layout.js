// frontend/app/layout.js
import './globals.css'; // Pastikan ini ada untuk mengimpor Tailwind
import Script from 'next/script';

export const metadata = {
  title: "Royal Ambarrukmo Object QR",
  description: "An Easy Way to Access Royal Ambarrukmo Object Detail.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,100;1,200;1,300;1,400&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
