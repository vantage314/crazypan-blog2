import { Router, Request, Response } from 'express';
import { storage } from '../utils/storage';
import { Comment, ApiResponse } from '../types';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router: Router = Router();

/**
 * 获取留言列表
 * GET /api/comments
 */
router.get('/', async (_req: Request, res: Response<ApiResponse<Comment[]>>) => {
  try {
    const comments: Comment[] = await storage.readJson('comments.json', []);
    
    // 只返回已批准的留言
    const approvedComments = comments.filter(comment => comment.approved);

    return res.json({
      success: true,
      data: approvedComments,
      message: '获取留言列表成功'
    });

  } catch (error) {
    console.error('获取留言列表错误:', error);
    return res.status(500).json({
      success: false,
      error: '服务器内部错误'
    });
  }
});

/**
 * 获取所有留言（管理员）
 * GET /api/comments/all
 */
router.get('/all', authMiddleware, adminMiddleware, async (_req: Request, res: Response<ApiResponse<Comment[]>>) => {
  try {
    const comments: Comment[] = await storage.readJson('comments.json', []);

    return res.json({
      success: true,
      data: comments,
      message: '获取所有留言成功'
    });

  } catch (error) {
    console.error('获取所有留言错误:', error);
    return res.status(500).json({
      success: false,
      error: '服务器内部错误'
    });
  }
});

/**
 * 添加留言
 * POST /api/comments
 */
router.post('/', async (req: Request<{}, {}, { content: string; author: string }>, res: Response<ApiResponse<Comment>>) => {
  try {
    const { content, author } = req.body;

    // 验证输入
    if (!content || !author) {
      return res.status(400).json({
        success: false,
        error: '留言内容和作者不能为空'
      });
    }

    if (content.length > 500) {
      return res.status(400).json({
        success: false,
        error: '留言内容不能超过500字符'
      });
    }

    const comments: Comment[] = await storage.readJson('comments.json', []);
    
    const newComment: Comment = {
      id: Date.now().toString(),
      content: content.trim(),
      author: author.trim(),
      createdAt: new Date().toISOString(),
      approved: false // 新留言需要审核
    };

    comments.push(newComment);
    await storage.writeJson('comments.json', comments);

    return res.status(201).json({
      success: true,
      data: newComment,
      message: '留言提交成功，等待审核'
    });

  } catch (error) {
    console.error('添加留言错误:', error);
    return res.status(500).json({
      success: false,
      error: '服务器内部错误'
    });
  }
});

/**
 * 删除留言
 * DELETE /api/comments/:id
 */
router.delete('/:id', authMiddleware, adminMiddleware, async (req: Request<{ id: string }>, res: Response<ApiResponse>) => {
  try {
    const { id } = req.params;
    const comments: Comment[] = await storage.readJson('comments.json', []);
    const commentIndex = comments.findIndex(c => c.id === id);

    if (commentIndex === -1) {
      return res.status(404).json({
        success: false,
        error: '留言不存在'
      });
    }

    // 删除留言
    comments.splice(commentIndex, 1);
    await storage.writeJson('comments.json', comments);

    return res.json({
      success: true,
      message: '删除留言成功'
    });

  } catch (error) {
    console.error('删除留言错误:', error);
    return res.status(500).json({
      success: false,
      error: '服务器内部错误'
    });
  }
});

/**
 * 审核留言
 * PUT /api/comments/:id/approve
 */
router.put('/:id/approve', authMiddleware, adminMiddleware, async (req: Request<{ id: string }, {}, { approved: boolean }>, res: Response<ApiResponse<Comment>>) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;
    const comments: Comment[] = await storage.readJson('comments.json', []);
    const commentIndex = comments.findIndex(c => c.id === id);

    if (commentIndex === -1) {
      return res.status(404).json({
        success: false,
        error: '留言不存在'
      });
    }

    // 更新审核状态
    const comment = comments[commentIndex];
    if (comment) {
      comment.approved = approved;
      await storage.writeJson('comments.json', comments);

      return res.json({
        success: true,
        data: comment,
        message: approved ? '留言审核通过' : '留言已拒绝'
      });
    }

    return res.status(404).json({
      success: false,
      error: '留言不存在'
    });

  } catch (error) {
    console.error('审核留言错误:', error);
    return res.status(500).json({
      success: false,
      error: '服务器内部错误'
    });
  }
});

export default router; 