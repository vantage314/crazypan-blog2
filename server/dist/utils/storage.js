"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.Storage = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
class Storage {
    constructor(dataDir = './data') {
        this.dataDir = dataDir;
    }
    async ensureDataDir() {
        try {
            await promises_1.default.access(this.dataDir);
        }
        catch {
            await promises_1.default.mkdir(this.dataDir, { recursive: true });
        }
    }
    async readJson(filename, defaultValue) {
        await this.ensureDataDir();
        const filePath = path_1.default.join(this.dataDir, filename);
        try {
            const data = await promises_1.default.readFile(filePath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            await this.writeJson(filename, defaultValue);
            return defaultValue;
        }
    }
    async writeJson(filename, data) {
        await this.ensureDataDir();
        const filePath = path_1.default.join(this.dataDir, filename);
        try {
            await promises_1.default.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        }
        catch (error) {
            throw new Error(`写入文件失败: ${filename}`);
        }
    }
    async exists(filename) {
        try {
            await promises_1.default.access(path_1.default.join(this.dataDir, filename));
            return true;
        }
        catch {
            return false;
        }
    }
    async delete(filename) {
        const filePath = path_1.default.join(this.dataDir, filename);
        try {
            await promises_1.default.unlink(filePath);
        }
        catch (error) {
            throw new Error(`删除文件失败: ${filename}`);
        }
    }
    getFilePath(filename) {
        return path_1.default.join(this.dataDir, filename);
    }
}
exports.Storage = Storage;
exports.storage = new Storage();
//# sourceMappingURL=storage.js.map