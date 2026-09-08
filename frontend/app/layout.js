import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import ThemeProvider from "@/providers/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata = {
  title: "CrimeNet AI — Criminal Network Analysis Platform",
  description:
    "Surface hidden relationships across people, places, and records for criminal investigations.",
  robots: {
    index: false,
    follow: false,
  },
};

// Inline script injected into <head> BEFORE any React/Next hydration.
// Reads the stored theme preference and applies .dark to <html> synchronously
// to prevent flash of incorrect theme (FOUC).
const THEME_INIT_SCRIPT = `
(function(){
  try{
    var t=localStorage.getItem('crimenet-theme');
    if(t==='dark')document.documentElement.classList.add('dark');
  }catch(e){}
})();
`.trim();

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* FOUC-prevention: must run before paint */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
