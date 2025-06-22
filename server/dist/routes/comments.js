"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storage_1 = require("../utils/storage");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const comments = await storage_1.storage.readJson('comments.json', []);
        const approvedComments = comments.filter(comment => comment.approved);
        return res.json({
            success: true,
            data: approvedComments,
            message: '获取留言列表成功'
        });
    }
    catch (error) {
        console.error('获取留言列表错误:', error);
        return res.status(500).json({
            success: false,
            error: '服务器内部错误'
        });
    }
});
router.get('/all', auth_1.authMiddleware, auth_1.adminMiddleware, async (_req, res) => {
    try {
        const comments = await storage_1.storage.readJson('comments.json', []);
        return res.json({
            success: true,
            data: comments,
            message: '获取所有留言成功'
        });
    }
    catch (error) {
        console.error('获取所有留言错误:', error);
        return res.status(500).json({
            success: false,
            error: '服务器内部错误'
        });
    }
});
router.post('/', async (req, res) => {
    try {
        const { content, author } = req.body;
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
        const comments = await storage_1.storage.readJson('comments.json', []);
        const newComment = {
            id: Date.now().toString(),
            content: content.trim(),
            author: author.trim(),
            createdAt: new Date().toISOString(),
            approved: false
        };
        comments.push(newComment);
        await storage_1.storage.writeJson('comments.json', comments);
        return res.status(201).json({
            success: true,
            data: newComment,
            message: '留言提交成功，等待审核'
        });
    }
    catch (error) {
        console.error('添加留言错误:', error);
        return res.status(500).json({
            success: false,
            error: '服务器内部错误'
        });
    }
});
router.delete('/:id', auth_1.authMiddleware, auth_1.adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await storage_1.storage.readJson('comments.json', []);
        const commentIndex = comments.findIndex(c => c.id === id);
        if (commentIndex === -1) {
            return res.status(404).json({
                success: false,
                error: '留言不存在'
            });
        }
        comments.splice(commentIndex, 1);
        await storage_1.storage.writeJson('comments.json', comments);
        return res.json({
            success: true,
            message: '删除留言成功'
        });
    }
    catch (error) {
        console.error('删除留言错误:', error);
        return res.status(500).json({
            success: false,
            error: '服务器内部错误'
        });
    }
});
router.put('/:id/approve', auth_1.authMiddleware, auth_1.adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { approved } = req.body;
        const comments = await storage_1.storage.readJson('comments.json', []);
        const commentIndex = comments.findIndex(c => c.id === id);
        if (commentIndex === -1) {
            return res.status(404).json({
                success: false,
                error: '留言不存在'
            });
        }
        const comment = comments[commentIndex];
        if (comment) {
            comment.approved = approved;
            await storage_1.storage.writeJson('comments.json', comments);
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
    }
    catch (error) {
        console.error('审核留言错误:', error);
        return res.status(500).json({
            success: false,
            error: '服务器内部错误'
        });
    }
});
exports.default = router;
//# sourceMappingURL=comments.js.map