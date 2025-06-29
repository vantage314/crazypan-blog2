import PostCard from "@/components/PostCard"
import { mockPosts } from "@/lib/mock-data"

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">欢迎来到我的博客</h1>
        <p className="text-lg text-white/80">你的时间花在哪里，你的收获就在哪里__lisir</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {mockPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
