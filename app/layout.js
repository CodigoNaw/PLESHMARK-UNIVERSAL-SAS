import "./globals.css";

export const metadata = {
  title: "Pleshmark", 
  icons: {
    icon: "/Logo.png", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head /> 
      <body>{children}</body>
    </html>
  );
}
