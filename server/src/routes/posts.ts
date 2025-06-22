import { Router, Request, Response } from 'express';
import { storage } from '../utils/storage';
import { Post, PostMeta, ApiResponse } from '../types';
import { authMiddleware, adminMiddleware } from '../middleware/auth';
import { AuthenticatedRequest } from '../types';

const router: Router = Router();

/**
 * 获取文章列表
 * GET /api/posts
 */
router.get('/', async (_req: Request, res: Response<ApiResponse<PostMeta[]>>) => {
  try {
    const posts: Post[] = await storage.readJson('posts.json', []);
    
    // 只返回已发布的文章
    const publishedPosts: PostMeta[] = posts
      .filter(post => post.published)
      .map(post => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || '',
        tags: post.tags,
        published: post.published,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
      }));

    return res.json({
      success: true,
      data: publishedPosts,
      message: '获取文章列表成功'
    });

  } catch (error) {
    console.error('获取文章列表错误:', error);
    return res.status(500).json({
      success: false,
      error: '服务器内部错误'
    });
  }
});

/**
 * 获取所有文章（管理员）
 * GET /api/posts/all
 */
router.get('/all', authMiddleware, adminMiddleware, async (_req: Request, res: Response<ApiResponse<Post[]>>) => {
  try {
    const posts: Post[] = await storage.readJson('posts.json', []);

    return res.json({
      success: true,
      data: posts,
      message: '获取所有文章成功'
    });

  } catch (error) {
    console.error('获取所有文章错误:', error);
    return res.status(500).json({
      success: false,
      error: '服务器内部错误'
    });
  }
});

/**
 * 根据 slug 获取文章
 * GET /api/posts/:slug
 */
router.get('/:slug', async (req: Request<{ slug: string }>, res: Response<ApiResponse<Post>>) => {
  try {
    const { slug } = req.params;
    const posts: Post[] = await storage.readJson('posts.json', []);
    const post = posts.find(p => p.slug === slug);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: '文章不存在'
      });
    }

    // 检查是否为管理员请求
    const isAdmin = (req as AuthenticatedRequest).user?.role === 'admin';
    
    // 非管理员只能访问已发布的文章
    if (!post.published && !isAdmin) {
      return res.status(404).json({
        success: false,
        error: '文章不存在'
      });
    }

    return res.json({
      success: true,
      data: post,
      message: '获取文章成功'
    });

  } catch (error) {
    console.error('获取文章错误:', error);
    return res.status(500).json({
      success: false,
      error: '服务器内部错误'
    });
  }
});

/**
 * 创建或更新文章
 * POST /api/posts/:slug
 */
router.post('/:slug', authMiddleware, adminMiddleware, async (req: AuthenticatedRequest<{ slug: string }, {}, Post>, res: Response<ApiResponse<Post>>) => {
  try {
    const { slug } = req.params;
    const postData = req.body;
    const now = new Date().toISOString();

    // 验证必填字段
    if (!postData.title || !postData.content) {
      return res.status(400).json({
        success: false,
        error: '标题和内容不能为空'
      });
    }

    const posts: Post[] = await storage.readJson('posts.json', []);
    const existingPostIndex = posts.findIndex(p => p.slug === slug);

    let post: Post;

    if (existingPostIndex >= 0) {
      // 更新现有文章
      post = {
        ...posts[existingPostIndex],
        ...postData,
        slug, // 保持 slug 不变
        updatedAt: now
      };
      posts[existingPostIndex] = post;
    } else {
      // 创建新文章
      post = {
        ...postData,
        slug,
        createdAt: now,
        updatedAt: now
      };
      posts.push(post);
    }

    // 保存到文件
    await storage.writeJson('posts.json', posts);

    return res.json({
      success: true,
      data: post,
      message: existingPostIndex >= 0 ? '更新文章成功' : '创建文章成功'
    });

  } catch (error) {
    console.error('保存文章错误:', error);
    return res.status(500).json({
      success: false,
      error: '服务器内部错误'
    });
  }
});

/**
 * 删除文章
 * DELETE /api/posts/:slug
 */
router.delete('/:slug', authMiddleware, adminMiddleware, async (req: AuthenticatedRequest<{ slug: string }>, res: Response<ApiResponse>) => {
  try {
    const { slug } = req.params;
    const posts: Post[] = await storage.readJson('posts.json', []);
    const postIndex = posts.findIndex(p => p.slug === slug);

    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        error: '文章不存在'
      });
    }

    // 删除文章
    posts.splice(postIndex, 1);
    await storage.writeJson('posts.json', posts);

    return res.json({
      success: true,
      message: '删除文章成功'
    });

  } catch (error) {
    console.error('删除文章错误:', error);
    return res.status(500).json({
      success: false,
      error: '服务器内部错误'
    });
  }
});

export default router; 