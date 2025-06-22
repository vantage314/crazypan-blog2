"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Save, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import AdminLayout from "@/components/AdminLayout"
import { mockPosts } from "@/lib/mock-data"
import dynamic from "next/dynamic"

// 动态导入 Markdown 编辑器，避免 SSR 问题
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

interface EditPostPageProps {
  params: Promise<{ slug: string }>
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter()
  const [slug, setSlug] = useState<string>("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    params.then(({ slug: paramSlug }) => {
      setSlug(paramSlug)
      if (paramSlug === "new") {
        // 新建文章
        setTitle("")
        setDescription("")
        setContent("# 新文章\n\n开始编写您的内容...")
        setTags([])
      } else {
        // 编辑现有文章
        const post = mockPosts.find((p) => p.slug === paramSlug)
        if (post) {
          setTitle(post.title)
          setDescription(post.description)
          setContent(post.content || "")
          setTags(post.tags)
        }
      }
    })
  }, [params])

  const handleSave = () => {
    setIsLoading(true)
    // 模拟保存操作
    console.log("保存文章:", {
      slug,
      title,
      description,
      content,
      tags,
    })

    setTimeout(() => {
      setIsLoading(false)
      alert("文章保存成功！")
      router.push("/admin/posts")
    }, 1000)
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <AdminLayout title={slug === "new" ? "新建文章" : "编辑文章"}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "保存中..." : "保存文章"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 文章信息 */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>文章信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">标题</Label>
                  <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div>
                  <Label htmlFor="description">描述</Label>
                  <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div>
                  <Label>标签</Label>
                  <div className="flex space-x-2 mb-2">
                    <Input
                      placeholder="添加标签"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                    />
                    <Button onClick={addTag} size="sm">
                      添加
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Markdown 编辑器 */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>内容编辑</CardTitle>
              </CardHeader>
              <CardContent>
                <div data-color-mode="light" className="dark:data-color-mode-dark">
                  <MDEditor value={content} onChange={(val) => setContent(val || "")} height={600} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
