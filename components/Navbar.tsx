"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "./ThemeToggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

// 更新 navigation 数组为包含子菜单的结构
const navigation = [
  { name: "首页", href: "/" },
  {
    name: "AI",
    href: "/ai",
    submenu: [
      { name: "提示词技巧", href: "/ai/prompts" },
      { name: "大模型趋势", href: "/ai/trends" },
      { name: "AI工具推荐", href: "/ai/tools" },
    ],
  },
  {
    name: "理财",
    href: "/finance",
    submenu: [
      { name: "基金投资", href: "/finance/funds" },
      { name: "股票分析", href: "/finance/stocks" },
      { name: "财富自由", href: "/finance/freedom" },
      { name: "财报分析", href: "/finance/reports" },
    ],
  },
  {
    name: "音乐",
    href: "/music",
    submenu: [
      { name: "古典音乐", href: "/music/classical" },
      { name: "电子音乐", href: "/music/electronic" },
      { name: "流行音乐", href: "/music/pop" },
      { name: "推荐歌单", href: "/music/playlists" },
    ],
  },
  {
    name: "剧集",
    href: "/tvshows",
    submenu: [
      { name: "美剧推荐", href: "/tvshows/us" },
      { name: "日剧推荐", href: "/tvshows/jp" },
      { name: "国剧推荐", href: "/tvshows/cn" },
      { name: "剧评分享", href: "/tvshows/reviews" },
    ],
  },
  { name: "留言墙", href: "/guestbook" },
  { name: "关于我", href: "/about" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
  <img src="/logo.png" alt="Crazypan Logo" className="w-8 h-8 object-cover rounded-full" />
  <span className="text-xl font-bold text-foreground">Crazypan</span>
</Link>

          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) =>
                item.submenu ? (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                      {item.name}
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link href={item.href} className="w-full">
                          查看全部
                        </Link>
                      </DropdownMenuItem>
                      {item.submenu.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link href={subItem.href} className="w-full">
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                ),
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-3 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
