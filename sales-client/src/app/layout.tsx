import Providers from "~/lib/providers";
import "~/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-Br">
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
