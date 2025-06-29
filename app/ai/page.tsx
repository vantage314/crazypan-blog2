import PostCard from "@/components/PostCard"
import { mockPosts } from "@/lib/mock-data"

export default function AIPage() {
  const aiPosts = mockPosts.filter((post) => post.category === "ai")

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">AI 专栏</h1>
        <p className="text-white/80">探索人工智能的前沿技术与应用</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {aiPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {aiPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/80">暂无相关文章</p>
        </div>
      )}
    </div>
  )
}
