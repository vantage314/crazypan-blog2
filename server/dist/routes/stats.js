"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storage_1 = require("../utils/storage");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const stats = await storage_1.storage.readJson('stats.json', {});
        return res.json({
            success: true,
            data: stats,
            message: '获取统计数据成功'
        });
    }
    catch (error) {
        console.error('获取统计数据错误:', error);
        return res.status(500).json({
            success: false,
            error: '服务器内部错误'
        });
    }
});
router.post('/view/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const stats = await storage_1.storage.readJson('stats.json', {});
        if (!stats[slug]) {
            stats[slug] = { views: 0, likes: 0 };
        }
        stats[slug].views += 1;
        await storage_1.storage.writeJson('stats.json', stats);
        return res.json({
            success: true,
            data: { views: stats[slug].views },
            message: '阅读量增加成功'
        });
    }
    catch (error) {
        console.error('增加阅读量错误:', error);
        return res.status(500).json({
            success: false,
            error: '服务器内部错误'
        });
    }
});
router.post('/like/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const stats = await storage_1.storage.readJson('stats.json', {});
        if (!stats[slug]) {
            stats[slug] = { views: 0, likes: 0 };
        }
        stats[slug].likes += 1;
        await storage_1.storage.writeJson('stats.json', stats);
        return res.json({
            success: true,
            data: { likes: stats[slug].likes },
            message: '点赞成功'
        });
    }
    catch (error) {
        console.error('增加点赞数错误:', error);
        return res.status(500).json({
            success: false,
            error: '服务器内部错误'
        });
    }
});
router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const stats = await storage_1.storage.readJson('stats.json', {});
        const articleStats = stats[slug] || { views: 0, likes: 0 };
        return res.json({
            success: true,
            data: articleStats,
            message: '获取文章统计数据成功'
        });
    }
    catch (error) {
        console.error('获取文章统计数据错误:', error);
        return res.status(500).json({
            success: false,
            error: '服务器内部错误'
        });
    }
});
router.delete('/:slug', auth_1.authMiddleware, auth_1.adminMiddleware, async (req, res) => {
    try {
        const { slug } = req.params;
        const stats = await storage_1.storage.readJson('stats.json', {});
        if (stats[slug]) {
            delete stats[slug];
            await storage_1.storage.writeJson('stats.json', stats);
        }
        return res.json({
            success: true,
            message: '重置统计数据成功'
        });
    }
    catch (error) {
        console.error('重置统计数据错误:', error);
        return res.status(500).json({
            success: false,
            error: '服务器内部错误'
        });
    }
});
router.get('/overview', auth_1.authMiddleware, auth_1.adminMiddleware, async (_req, res) => {
    try {
        const stats = await storage_1.storage.readJson('stats.json', {});
        const totalViews = Object.values(stats).reduce((sum, stat) => sum + stat.views, 0);
        const totalLikes = Object.values(stats).reduce((sum, stat) => sum + stat.likes, 0);
        const articleCount = Object.keys(stats).length;
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
    }
    catch (error) {
        console.error('获取统计概览错误:', error);
        return res.status(500).json({
            success: false,
            error: '服务器内部错误'
        });
    }
});
exports.default = router;
//# sourceMappingURL=stats.js.map