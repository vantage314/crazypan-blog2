import { Github, Mail, Twitter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <div className="relative h-32 w-32 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-white/80">
          <Image
            src="/yhw.png"
            alt="我的头像"
            fill
            sizes="128px"
            className="object-cover"
            priority={false} // 如首页就展示，建议设为 true
          />
        </div>
        <h1 className="text-3xl font-bold mb-4">关于我</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed mb-6">你好！我是杨瀚文 大家可以叫我PIG_YANG</p>

            
            {/* 工作描述省略 */}

            <h3 className="text-xl font-semibold mb-3">关于个人优秀事迹</h3>
            <p className="mb-4">以下内容，是二十多年以来做的优秀事迹</p>
            <li>往独臂老人胳膊上撒痒痒粉</li>
              <li>在殡仪馆门口发喜糖</li>
              <li>告诉老人微信步数可以提现</li>
              <li>给盲人手枪说是吹风机</li>
              <li>给盲人吃玻璃渣说是跳跳糖</li>

            <h3 className="text-xl font-semibold mb-3">兴趣爱好</h3>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li>sing</li>
              <li>jump</li>
              <li>baskball</li>
              <li></li>
              <li></li>
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
