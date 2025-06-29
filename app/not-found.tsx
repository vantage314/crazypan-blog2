import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-white/80 mb-6">抱歉，您访问的页面不存在</p>
      <Button asChild>
        <Link href="/">返回首页</Link>
      </Button>
    </div>
  )
}
