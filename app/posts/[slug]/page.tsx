import { notFound } from "next/navigation"
import { Calendar, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { mockPosts } from "@/lib/mock-data"
import LikeButton from "@/components/LikeButton"
import ViewCounter from "@/components/ViewCounter"

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = mockPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <article>
        {/* 文章头部 */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/80 mb-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <ViewCounter slug={post.slug} />
            <LikeButton initialLikes={post.likes} />
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="glass">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* 文章内容 */}
        <Card>
          <CardContent className="pt-6">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed">{post.content}</div>
            </div>
          </CardContent>
        </Card>
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  return mockPosts.map((post) => ({
    slug: post.slug,
  }))
}
