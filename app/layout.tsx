import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crazypan 个人博客",
  description: "你的时间花在哪里，你的收获就在哪里___lisir",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* ✅ 引入外部背景动画脚本 */}
        <Script src="/js/BlurGradientBg.min.js" strategy="beforeInteractive" />
      </head>
      <body className={`${inter.className} text-white`}>
        {/* ✅ 背景动画容器 */}
        <div
          id="color-bg-box"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: -1,
          }}
        ></div>

        {/* ✅ 初始化动画 + 空格键控制逻辑 */}
        <Script id="color-bg-init" strategy="afterInteractive">
          {`
            const bg = new Color4Bg.BlurGradientBg({
              dom: "color-bg-box",
              colors: ["#11694E", "#48BF91", "#8FD9A8", "#15997A"],
              loop: true
            });

            let paused = false;
            const hintEl = document.createElement("div");
            hintEl.innerHTML = "<span id='bg-control-btn'>⏸ 暂停</span> <kbd>空格键</kbd>";
            Object.assign(hintEl.style, {
              position: "fixed",
              bottom: "10px",
              left: "10px",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
              color: "#fff",
              padding: "8px 12px",
              borderRadius: "12px",
              fontSize: "14px",
              zIndex: "9999",
              border: "1px solid rgba(255,255,255,0.2)",
            });
            document.body.appendChild(hintEl);

            document.addEventListener("keydown", (e) => {
              if (e.code === "Space") {
                e.preventDefault();
                paused = !paused;
                if (paused) {
                  bg.pause();
                  document.getElementById("bg-control-btn").innerText = "▶ 播放";
                } else {
                  bg.play();
                  document.getElementById("bg-control-btn").innerText = "⏸ 暂停";
                }
              }
            });
          `}
        </Script>

        {/* ✅ 页面内容区域 */}
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
