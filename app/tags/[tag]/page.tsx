import { notFound } from "next/navigation"
import PostCard from "@/components/PostCard"
import { mockPosts } from "@/lib/mock-data"

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const filteredPosts = mockPosts.filter((post) => post.tags.includes(decodedTag))

  if (filteredPosts.length === 0) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">标签: {decodedTag}</h1>
        <p className="text-muted-foreground">找到 {filteredPosts.length} 篇相关文章</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
