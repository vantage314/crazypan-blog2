"use client"

import type React from "react"

import { useState } from "react"
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return

    const newComment: Comment = {
      id: Date.now(),
      name: name.trim(),
      content: content.trim(),
      time: new Date().toLocaleString("zh-CN"),
    }

    setComments([newComment, ...comments])
    setName("")
    setContent("")
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
            <Input placeholder="请输入您的昵称" value={name} onChange={(e) => setName(e.target.value)} required />
            <Textarea
              placeholder="写下您的留言..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
            />
            <Button type="submit" className="w-full sm:w-auto">
              <Send className="h-4 w-4 mr-2" />
              发送留言
            </Button>
          </form>
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
                    <span className="text-xs text-muted-foreground">{comment.time}</span>
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
