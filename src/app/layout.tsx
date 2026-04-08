import "./globals.css"
import { QueryProvider } from "@/providers/query-provider"
import { Navbar } from "@/components/layout/navbar"
import { ThemeProvider } from "next-themes"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <main className="pb-20 md:pt-20 max-w-md mx-auto min-h-screen">
              {children}
            </main>
            <Navbar />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}