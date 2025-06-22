import fs from 'fs/promises';
import path from 'path';

/**
 * 数据存储工具类
 * 提供 JSON 文件的读写操作
 */
export class Storage {
  private dataDir: string;

  constructor(dataDir: string = './data') {
    this.dataDir = dataDir;
  }

  /**
   * 确保数据目录存在
   */
  private async ensureDataDir(): Promise<void> {
    try {
      await fs.access(this.dataDir);
    } catch {
      await fs.mkdir(this.dataDir, { recursive: true });
    }
  }

  /**
   * 读取 JSON 文件
   * @param filename 文件名
   * @param defaultValue 默认值（如果文件不存在）
   */
  async readJson<T>(filename: string, defaultValue: T): Promise<T> {
    await this.ensureDataDir();
    const filePath = path.join(this.dataDir, filename);
    
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data) as T;
    } catch (error) {
      // 如果文件不存在，返回默认值并创建文件
      await this.writeJson(filename, defaultValue);
      return defaultValue;
    }
  }

  /**
   * 写入 JSON 文件
   * @param filename 文件名
   * @param data 要写入的数据
   */
  async writeJson<T>(filename: string, data: T): Promise<void> {
    await this.ensureDataDir();
    const filePath = path.join(this.dataDir, filename);
    
    try {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      throw new Error(`写入文件失败: ${filename}`);
    }
  }

  /**
   * 检查文件是否存在
   * @param filename 文件名
   */
  async exists(filename: string): Promise<boolean> {
    try {
      await fs.access(path.join(this.dataDir, filename));
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 删除文件
   * @param filename 文件名
   */
  async delete(filename: string): Promise<void> {
    const filePath = path.join(this.dataDir, filename);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      throw new Error(`删除文件失败: ${filename}`);
    }
  }

  /**
   * 获取文件完整路径
   * @param filename 文件名
   */
  getFilePath(filename: string): string {
    return path.join(this.dataDir, filename);
  }
}

// 导出默认实例
export const storage = new Storage(); 