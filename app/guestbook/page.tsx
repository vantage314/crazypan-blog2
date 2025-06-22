import CommentBoard from "@/components/CommentBoard"
import { mockComments } from "@/lib/mock-data"

export default function GuestbookPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">留言墙</h1>
        <p className="text-muted-foreground">欢迎在这里留下您的想法和建议</p>
      </div>

      <CommentBoard comments={mockComments} />
    </div>
  )
}
