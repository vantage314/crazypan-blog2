import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { author, content } = body

    if (!author || !content) {
      return NextResponse.json({ success: false, error: "字段不能为空" }, { status: 400 })
    }

    const commentsPath = path.join(process.cwd(), "server/data/comments.json")
    
    // 确保目录存在
    const dir = path.dirname(commentsPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    // 读取现有评论或创建新文件
    let comments = []
    if (fs.existsSync(commentsPath)) {
      const fileContent = fs.readFileSync(commentsPath, "utf-8")
      comments = JSON.parse(fileContent)
    }

    const newComment = {
      id: String(Date.now()),
      author,
      content,
      createdAt: new Date().toISOString(),
      approved: true
    }

    comments.push(newComment)
    fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2))

    return NextResponse.json({ success: true, comment: newComment })
  } catch (error) {
    console.error("保存留言时出错:", error)
    return NextResponse.json({ success: false, error: "服务器内部错误" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const commentsPath = path.join(process.cwd(), "server/data/comments.json")
    
    if (!fs.existsSync(commentsPath)) {
      return NextResponse.json({ success: true, comments: [] })
    }

    const fileContent = fs.readFileSync(commentsPath, "utf-8")
    const comments = JSON.parse(fileContent)
    
    return NextResponse.json({ success: true, comments })
  } catch (error) {
    console.error("读取留言时出错:", error)
    return NextResponse.json({ success: false, error: "服务器内部错误" }, { status: 500 })
  }
} 