"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogOut, FileText, MessageSquare, BarChart3, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { isAuthenticated, logout } from "@/lib/auth"

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isAuthenticated()) {
      router.push("/admin")
    }
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/admin")
  }

  if (!mounted) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated()) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 顶部导航 */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              <Home className="h-4 w-4 inline mr-1" />
              返回前台
            </Link>
            <span className="text-muted-foreground">|</span>
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            退出登录
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 侧边栏 */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Link href="/admin/dashboard">
                    <Button variant="ghost" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      仪表盘
                    </Button>
                  </Link>
                  <Link href="/admin/posts">
                    <Button variant="ghost" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      文章管理
                    </Button>
                  </Link>
                  <Link href="/admin/comments">
                    <Button variant="ghost" className="w-full justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      留言管理
                    </Button>
                  </Link>
                  <Link href="/admin/stats">
                    <Button variant="ghost" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      数据统计
                    </Button>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* 主内容区 */}
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  )
}
