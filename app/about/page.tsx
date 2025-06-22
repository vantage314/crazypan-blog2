import { Github, Mail, Twitter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <Avatar className="h-32 w-32 mx-auto mb-4">
          <AvatarImage src="/placeholder.svg?height=128&width=128" />
          <AvatarFallback className="text-2xl">CP</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold mb-4">关于我</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed mb-6">你好！我是 Crazypan</p>

            <h3 className="text-xl font-semibold mb-3">关于我的工作</h3>
           

            <h3 className="text-xl font-semibold mb-3">关于这个博客</h3>
            <p className="mb-4">这里是我分享技术心得、生活感悟和个人思考的地方。希望我的文章能对你有所帮助。</p>

            <h3 className="text-xl font-semibold mb-3">兴趣爱好</h3>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li>编程与技术研究</li>
              <li>音乐欣赏与发现</li>
              <li>电影和电视剧</li>
              <li>阅读与写作</li>
              <li>理财与投资</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">联系我</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button variant="outline" size="sm">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
