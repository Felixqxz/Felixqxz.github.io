import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://felixqxz.github.io",
  ),
  title: "Xingzhi Qian — Efficient, Grounded & Self-Improving Agents",
  description:
    "Xingzhi Qian is a UCL doctoral researcher studying context management, grounding, efficiency, and self-improvement for LLM agents.",
  keywords: [
    "Xingzhi Qian",
    "large language models",
    "LLM agents",
    "agent efficiency",
    "recursive self-improvement",
    "agent harness optimization",
    "program analysis",
    "malware analysis",
    "reliable AI",
    "UCL",
  ],
  authors: [{ name: "Xingzhi Qian" }],
  openGraph: {
    title: "Xingzhi Qian — Efficient, Grounded & Self-Improving Agents",
    description: "Designing agents that reason, adapt, and improve.",
    type: "website",
    images: [{ url: "/og-agents.png", width: 1727, height: 911, alt: "Xingzhi Qian — Efficient, Grounded & Self-Improving Agents" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xingzhi Qian — Efficient, Grounded & Self-Improving Agents",
    description: "Designing agents that reason, adapt, and improve.",
    images: ["/og-agents.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
