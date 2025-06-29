"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AdminLayout from "@/components/AdminLayout"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

export default function AdminStatsPage() {
  // Mock 数据
  const likesData = [
    { name: "提示词工程", likes: 89 },
    { name: "Next.js 15", likes: 67 },
    { name: "理财指南", likes: 45 },
    { name: "音乐发现", likes: 32 },
    { name: "剧集推荐", likes: 56 },
  ]

  const viewsData = [
    { name: "1月", views: 1200 },
    { name: "2月", views: 1900 },
    { name: "3月", views: 3000 },
    { name: "4月", views: 2800 },
    { name: "5月", views: 3900 },
    { name: "6月", views: 4300 },
  ]

  const categoryData = [
    { name: "AI", count: 15 },
    { name: "理财", count: 8 },
    { name: "音乐", count: 12 },
    { name: "剧集", count: 6 },
    { name: "技术", count: 20 },
  ]

  return (
    <AdminLayout title="数据统计">
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 文章点赞数统计 */}
          <Card>
            <CardHeader>
              <CardTitle>文章点赞数排行</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={likesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="likes" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 月度阅读量趋势 */}
          <Card>
            <CardHeader>
              <CardTitle>月度阅读量趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* 分类文章数量统计 */}
        <Card>
          <CardHeader>
            <CardTitle>分类文章数量统计</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="count" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 统计摘要 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-sm text-white/80">总文章数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">289</div>
              <div className="text-sm text-white/80">总点赞数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">3,456</div>
              <div className="text-sm text-white/80">总阅读量</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">12</div>
              <div className="text-sm text-white/80">总留言数</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
