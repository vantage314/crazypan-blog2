"use client"

import { useState } from "react"
import { Trash2, User, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AdminLayout from "@/components/AdminLayout"
import { mockComments } from "@/lib/mock-data"

export default function AdminCommentsPage() {
  const [comments, setComments] = useState(mockComments)

  const handleDelete = (id: number) => {
    setComments(comments.filter((comment) => comment.id !== id))
  }

  return (
    <AdminLayout title="留言管理">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">留言列表 ({comments.length})</h2>
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{comment.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {comment.name}
                        </span>
                        <span className="text-xs text-white/80 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {comment.time}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(comment.id)} className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {comments.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-white/80">暂无留言</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
