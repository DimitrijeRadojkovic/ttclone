import type { Metadata } from "next";
import { myFont } from "@/app/ui/fonts";
import '@/app/ui/globals.css';
import BottomNav from "@/app/ui/bottom-nav";

export const metadata: Metadata = {
  title: {
    template: "%s | TikTok Clone",
    default: "TikTok Clone",
  },
  description: "future prosjak made this shit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${myFont.className} antialiased m-0 h-screen`}
      >
          {children}
          <BottomNav />
      </body>
    </html>
  );
}
