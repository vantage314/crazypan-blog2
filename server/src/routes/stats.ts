import { Router, Request, Response } from 'express';
import { storage } from '../utils/storage';
import { Stats, ApiResponse } from '../types';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router: Router = Router();

/**
 * 获取统计数据
 * GET /api/stats
 */
router.get('/', async (_req: Request, res: Response<ApiResponse<Stats>>) => {
  try {
    const stats: Stats = await storage.readJson('stats.json', {});

    return res.json({
      success: true,
      data: stats,
      message: '获取统计数据成功'
    });

  } catch (error) {
    console.error('获取统计数据错误:', error);
    return res.status(500).json({
      success: false,
      error: '服务器内部错误'
    });
  }
});

/**
 * 增加阅读量
 * POST /api/stats/view/:slug
 */
router.post('/view/:slug', async (req: Request<{ slug: string }>, res: Response<ApiResponse>) => {
  try {
    const { slug } = req.params;
    const stats: Stats = await storage.readJson('stats.json', {});

    // 初始化文章统计
    if (!stats[slug]) {
      stats[slug] = { views: 0, likes: 0 };
    }

    // 增加阅读量
    stats[slug].views += 1;
    await storage.writeJson('stats.json', stats);

    return res.json({
      success: true,
      data: { views: stats[slug].views },
      message: '阅读量增加成功'
    });

  } catch (error) {
    console.error('增加阅读量错误:', error);
    return res.status(500).json({
      success: false,
      error: '服务器内部错误'
    });
  }
});

/**
 * 增加点赞数
 * POST /api/stats/like/:slug
 */
router.post('/like/:slug', async (req: Request<{ slug: string }>, res: Response<ApiResponse>) => {
  try {
    const { slug } = req.params;
    const stats: Stats = await storage.readJson('stats.json', {});

    // 初始化文章统计
    if (!stats[slug]) {
      stats[slug] = { views: 0, likes: 0 };
    }

    // 增加点赞数
    stats[slug].likes += 1;
    await storage.writeJson('stats.json', stats);

    return res.json({
      success: true,
      data: { likes: stats[slug].likes },
      message: '点赞成功'
    });

  } catch (error) {
    console.error('增加点赞数错误:', error);
    return res.status(500).json({
      success: false,
      error: '服务器内部错误'
    });
  }
});

/**
 * 获取特定文章的统计数据
 * GET /api/stats/:slug
 */
router.get('/:slug', async (req: Request<{ slug: string }>, res: Response<ApiResponse<{ views: number; likes: number }>>) => {
  try {
    const { slug } = req.params;
    const stats: Stats = await storage.readJson('stats.json', {});

    const articleStats = stats[slug] || { views: 0, likes: 0 };

    return res.json({
      success: true,
      data: articleStats,
      message: '获取文章统计数据成功'
    });

  } catch (error) {
    console.error('获取文章统计数据错误:', error);
    return res.status(500).json({
      success: false,
      error: '服务器内部错误'
    });
  }
});

/**
 * 重置统计数据（管理员）
 * DELETE /api/stats/:slug
 */
router.delete('/:slug', authMiddleware, adminMiddleware, async (req: Request<{ slug: string }>, res: Response<ApiResponse>) => {
  try {
    const { slug } = req.params;
    const stats: Stats = await storage.readJson('stats.json', {});

    if (stats[slug]) {
      delete stats[slug];
      await storage.writeJson('stats.json', stats);
    }

    return res.json({
      success: true,
      message: '重置统计数据成功'
    });

  } catch (error) {
    console.error('重置统计数据错误:', error);
    return res.status(500).json({
      success: false,
      error: '服务器内部错误'
    });
  }
});

/**
 * 获取统计概览（管理员）
 * GET /api/stats/overview
 */
router.get('/overview', authMiddleware, adminMiddleware, async (_req: Request, res: Response<ApiResponse>) => {
  try {
    const stats: Stats = await storage.readJson('stats.json', {});

    // 计算总统计
    const totalViews = Object.values(stats).reduce((sum, stat) => sum + stat.views, 0);
    const totalLikes = Object.values(stats).reduce((sum, stat) => sum + stat.likes, 0);
    const articleCount = Object.keys(stats).length;

    // 获取最受欢迎的文章
    const popularArticles = Object.entries(stats)
      .sort(([, a], [, b]) => b.views - a.views)
      .slice(0, 5)
      .map(([slug, stat]) => ({
        slug,
        views: stat.views,
        likes: stat.likes
      }));

    return res.json({
      success: true,
      data: {
        totalViews,
        totalLikes,
        articleCount,
        popularArticles
      },
      message: '获取统计概览成功'
    });

  } catch (error) {
    console.error('获取统计概览错误:', error);
    return res.status(500).json({
      success: false,
      error: '服务器内部错误'
    });
  }
});

export default router; 