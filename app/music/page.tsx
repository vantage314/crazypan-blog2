import PostCard from "@/components/PostCard"
import { mockPosts } from "@/lib/mock-data"

export default function MusicPage() {
  const musicPosts = mockPosts.filter((post) => post.category === "music")

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">音乐专栏</h1>
        <p className="text-white/80">分享音乐发现与聆听感受</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {musicPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {musicPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/80">暂无相关文章</p>
        </div>
      )}
    </div>
  )
}
