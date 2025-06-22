import type { Post, Comment } from "./types"

export const mockPosts: Post[] = [
  {
    title: "深入理解大模型提示词工程",
    slug: "prompt-engineering",
    description: "从 ChatGPT 到 Midjourney，提示词工程怎么玩？探索AI时代的新技能。",
    content: `# 深入理解大模型提示词工程
  
  提示词工程（Prompt Engineering）是与大语言模型交互的艺术和科学。在这篇文章中，我们将深入探讨如何编写有效的提示词，以提升模型输出的质量和可控性。
  
  ---
  
  ## 什么是提示词工程？
  
  提示词工程是指设计和优化输入给 AI 模型的文本提示，以获得期望输出结果的过程。
  
  这不仅仅是“怎么问”，更是“怎么设计上下文、目标、风格”。
  
  ---
  
  ## 核心原则
  
  1. **明确性**  
     提示词应该清晰具体，避免歧义。
  
  2. **具体性**  
     尽量给出详细上下文，例如角色、场景、风格。
  
  3. **结构化**  
     使用结构化格式（如列表、步骤、Markdown）有助于模型理解意图。
  
  ---
  
  ## 实践技巧
  
  - 🧠 **角色扮演**：让模型以特定身份（如医生、诗人）回答问题
  - 📄 **提供范例**：给出输入与输出示例，提升输出一致性
  - 🪜 **分步骤引导**：将复杂任务拆分为多个明确步骤
  - 🚫 **设置限制**：通过“不得包含…”、“必须包括…”提高可控性
  
  ---
  
  ## 示例
  
  **普通提示：**
  
  > 给我一段关于人工智能的介绍。
  
  **优化后提示：**
  
  > 你是一名科技记者，请用简洁易懂的语言，撰写一段 150 字的人工智能科普介绍，使用 Markdown 格式，面向中学生。
  
  ---
  
  ## 总结
  
  提示词工程不仅是与 AI 模型交流的“语言艺术”，更是一种全新的交互范式。  
  通过不断练习和实验，我们可以把 AI 当作一个有力的创作和工作助手，释放无限潜力。`,
    tags: ["AI", "Prompt", "技术"],
    date: "2025-06-22",
    views: 1234,
    likes: 89,
    category: "ai"
  },
  
  {
    title: "Next.js 15 新特性深度解析",
    slug: "nextjs-15-features",
    description: "探索 Next.js 15 带来的革命性变化，包括 App Router 的完善和性能优化。",
    content: `# Next.js 15 新特性深度解析

Next.js 15 带来了许多令人兴奋的新特性和改进。

## 主要更新

### 1. App Router 稳定版
App Router 现在已经完全稳定，提供了更好的开发体验。

### 2. 性能优化
- 更快的构建速度
- 优化的运行时性能
- 改进的缓存策略

### 3. 开发者体验
- 更好的错误提示
- 改进的热重载
- 增强的调试工具

这些更新让 Next.js 成为构建现代 Web 应用的首选框架。`,
    tags: ["Next.js", "React", "前端"],
    date: "2025-06-20",
    views: 856,
    likes: 67,
    category: "tech",
  },
  {
    title: "个人理财入门指南",
    slug: "personal-finance-guide",
    description: "从零开始学习个人理财，建立正确的金钱观念和投资策略。",
    content: `# 个人理财入门指南

理财是每个人都应该掌握的重要技能。

## 基础概念

### 1. 预算管理
学会制定和执行个人预算是理财的第一步。

### 2. 应急基金
建立3-6个月的生活费作为应急基金。

### 3. 投资组合
分散投资，降低风险。

## 实用建议

- 记录每一笔支出
- 定期审视财务状况
- 学习基本的投资知识
- 保持长期投资心态

理财是一个长期的过程，需要耐心和坚持。`,
    tags: ["理财", "投资", "生活"],
    date: "2025-06-18",
    views: 642,
    likes: 45,
    category: "finance",
  },
  {
    title: "我的音乐发现之旅",
    slug: "music-discovery-journey",
    description: "分享最近发现的好音乐，从古典到电子，从民谣到摇滚。",
    content: `# 我的音乐发现之旅

音乐是生活中不可缺少的调味剂。

## 最近的发现

### 古典音乐
最近迷上了巴赫的《哥德堡变奏曲》，每个变奏都有独特的魅力。

### 电子音乐
Aphex Twin 的作品总是能带来意想不到的听觉体验。

### 民谣
Bob Dylan 的歌词深度令人着迷。

## 推荐清单

1. Bach - Goldberg Variations
2. Aphex Twin - Selected Ambient Works
3. Bob Dylan - Blood on the Tracks

音乐让生活更加丰富多彩。`,
    tags: ["音乐", "生活", "推荐"],
    date: "2025-06-15",
    views: 423,
    likes: 32,
    category: "music",
  },
  {
    title: "2024年度剧集推荐",
    slug: "tv-shows-2024",
    description: "盘点2024年最值得观看的电视剧，从科幻到悬疑，精彩不容错过。",
    content: `# 2024年度剧集推荐

2024年有很多优秀的电视剧作品。

## 科幻类

### 《三体》
刘慈欣原著改编，视觉效果震撼。

## 悬疑类

### 《真探》第四季
延续了前作的高质量。

## 喜剧类

### 《熊餐厅》第三季
温暖治愈的职场喜剧。

## 总结

这些剧集都有各自的特色，值得花时间观看。`,
    tags: ["电视剧", "推荐", "娱乐"],
    date: "2025-06-12",
    views: 789,
    likes: 56,
    category: "tvshows",
  },
]

export const mockComments: Comment[] = [
  {
    id: 1,
    name: "张三",
    content: "博客很棒，内容很有深度！期待更多精彩文章。",
    time: "2025-06-21 14:03",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "李四",
    content: "关于AI的文章写得很好，学到了很多东西。",
    time: "2025-06-21 10:15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "王五",
    content: "希望能看到更多关于前端技术的分享！",
    time: "2025-06-20 16:42",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "赵六",
    content: "音乐推荐很棒，已经加入我的播放列表了。",
    time: "2025-06-20 09:28",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "匿名用户",
    content: "支持博主，继续加油！💪",
    time: "2025-06-19 20:11",
  },
]
