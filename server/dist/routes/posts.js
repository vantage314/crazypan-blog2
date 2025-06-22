"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storage_1 = require("../utils/storage");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const posts = await storage_1.storage.readJson('posts.json', []);
        const publishedPosts = posts
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
    }
    catch (error) {
        console.error('获取文章列表错误:', error);
        return res.status(500).json({
            success: false,
            error: '服务器内部错误'
        });
    }
});
router.get('/all', auth_1.authMiddleware, auth_1.adminMiddleware, async (_req, res) => {
    try {
        const posts = await storage_1.storage.readJson('posts.json', []);
        return res.json({
            success: true,
            data: posts,
            message: '获取所有文章成功'
        });
    }
    catch (error) {
        console.error('获取所有文章错误:', error);
        return res.status(500).json({
            success: false,
            error: '服务器内部错误'
        });
    }
});
router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const posts = await storage_1.storage.readJson('posts.json', []);
        const post = posts.find(p => p.slug === slug);
        if (!post) {
            return res.status(404).json({
                success: false,
                error: '文章不存在'
            });
        }
        const isAdmin = req.user?.role === 'admin';
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
    }
    catch (error) {
        console.error('获取文章错误:', error);
        return res.status(500).json({
            success: false,
            error: '服务器内部错误'
        });
    }
});
router.post('/:slug', auth_1.authMiddleware, auth_1.adminMiddleware, async (req, res) => {
    try {
        const { slug } = req.params;
        const postData = req.body;
        const now = new Date().toISOString();
        if (!postData.title || !postData.content) {
            return res.status(400).json({
                success: false,
                error: '标题和内容不能为空'
            });
        }
        const posts = await storage_1.storage.readJson('posts.json', []);
        const existingPostIndex = posts.findIndex(p => p.slug === slug);
        let post;
        if (existingPostIndex >= 0) {
            post = {
                ...posts[existingPostIndex],
                ...postData,
                slug,
                updatedAt: now
            };
            posts[existingPostIndex] = post;
        }
        else {
            post = {
                ...postData,
                slug,
                createdAt: now,
                updatedAt: now
            };
            posts.push(post);
        }
        await storage_1.storage.writeJson('posts.json', posts);
        return res.json({
            success: true,
            data: post,
            message: existingPostIndex >= 0 ? '更新文章成功' : '创建文章成功'
        });
    }
    catch (error) {
        console.error('保存文章错误:', error);
        return res.status(500).json({
            success: false,
            error: '服务器内部错误'
        });
    }
});
router.delete('/:slug', auth_1.authMiddleware, auth_1.adminMiddleware, async (req, res) => {
    try {
        const { slug } = req.params;
        const posts = await storage_1.storage.readJson('posts.json', []);
        const postIndex = posts.findIndex(p => p.slug === slug);
        if (postIndex === -1) {
            return res.status(404).json({
                success: false,
                error: '文章不存在'
            });
        }
        posts.splice(postIndex, 1);
        await storage_1.storage.writeJson('posts.json', posts);
        return res.json({
            success: true,
            message: '删除文章成功'
        });
    }
    catch (error) {
        console.error('删除文章错误:', error);
        return res.status(500).json({
            success: false,
            error: '服务器内部错误'
        });
    }
});
exports.default = router;
//# sourceMappingURL=posts.js.map