import PostCard from "@/components/PostCard"
import { mockPosts } from "@/lib/mock-data"

export default function TVShowsPage() {
  const tvPosts = mockPosts.filter((post) => post.category === "tvshows")

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">剧集专栏</h1>
        <p className="text-white/80">推荐优质影视作品与观后感</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {tvPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {tvPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/80">暂无相关文章</p>
        </div>
      )}
    </div>
  )
}
