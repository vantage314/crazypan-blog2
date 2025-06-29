"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Comment } from "@/lib/types"

interface CommentBoardProps {
  comments: Comment[]
}

export default function CommentBoard({ comments: initialComments }: CommentBoardProps) {
  const [comments, setComments] = useState(initialComments)
  const [name, setName] = useState("")
  const [content, setContent] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 加载留言数据
  useEffect(() => {
    const loadComments = async () => {
      try {
        const res = await fetch("/api/comments")
        const data = await res.json()
        if (data.success) {
          // 转换API数据格式为组件需要的格式
          const formattedComments = data.comments.map((comment: any) => ({
            id: comment.id,
            name: comment.author,
            content: comment.content,
            time: new Date(comment.createdAt).toLocaleString("zh-CN"),
            avatar: "/placeholder.svg"
          }))
          setComments(formattedComments)
        }
      } catch (error) {
        console.error("加载留言失败:", error)
      }
    }

    loadComments()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return

    setIsSubmitting(true)
    setMessage("")

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: name.trim(), content: content.trim() })
      })

      const data = await res.json()
      if (data.success) {
        // 添加新留言到列表
        const newComment: Comment = {
          id: data.comment.id,
          name: data.comment.author,
          content: data.comment.content,
          time: new Date(data.comment.createdAt).toLocaleString("zh-CN"),
          avatar: "/placeholder.svg"
        }

        setComments([newComment, ...comments])
        setName("")
        setContent("")
        setMessage("✅ 留言成功")
      } else {
        setMessage("❌ 留言失败：" + data.error)
      }
    } catch (error) {
      console.error("提交留言失败:", error)
      setMessage("❌ 网络错误，请稍后重试")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* 留言表单 */}
      <Card>
        <CardHeader>
          <CardTitle>留言板</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              placeholder="请输入您的昵称" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              disabled={isSubmitting}
            />
            <Textarea
              placeholder="写下您的留言..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
              disabled={isSubmitting}
            />
            <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? "发送中..." : "发送留言"}
            </Button>
          </form>
          {message && (
            <p className={`mt-2 text-sm ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </CardContent>
      </Card>

      {/* 留言列表 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">所有留言 ({comments.length})</h3>
        {comments.map((comment) => (
          <Card key={comment.id} className="transition-all hover:shadow-md">
            <CardContent className="pt-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{comment.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm">{comment.name}</span>
                    <span className="text-xs text-white/80">{comment.time}</span>
                  </div>
                  <p className="text-sm leading-relaxed">{comment.content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
