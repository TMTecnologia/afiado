import Providers from "~/lib/provider";
import "~/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers><body>{children}</body></Providers>
    </html>
  )
}
