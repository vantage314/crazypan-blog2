"use client"

import { useState } from "react"
import { Edit, Trash2, Plus, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AdminLayout from "@/components/AdminLayout"
import { mockPosts } from "@/lib/mock-data"
import Link from "next/link"

export default function AdminPostsPage() {
  const [posts, setPosts] = useState(mockPosts)

  const handleDelete = (slug: string) => {
    setPosts(posts.filter((post) => post.slug !== slug))
  }

  return (
    <AdminLayout title="文章管理">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">文章列表</h2>
          <Link href="/admin/posts/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              新建文章
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>标题</TableHead>
                  <TableHead>标签</TableHead>
                  <TableHead>发布日期</TableHead>
                  <TableHead>阅读量</TableHead>
                  <TableHead>点赞数</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.slug}>
                    <TableCell className="font-medium max-w-xs">
                      <div className="truncate">{post.title}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{post.date}</TableCell>
                    <TableCell>{post.views}</TableCell>
                    <TableCell>{post.likes}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Link href={`/posts/${post.slug}`}>
                          <Button variant="ghost" size="sm" title="预览">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/posts/${post.slug}/edit`}>
                          <Button variant="ghost" size="sm" title="编辑">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" title="删除" onClick={() => handleDelete(post.slug)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
