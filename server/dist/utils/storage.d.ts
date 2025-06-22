export declare class Storage {
    private dataDir;
    constructor(dataDir?: string);
    private ensureDataDir;
    readJson<T>(filename: string, defaultValue: T): Promise<T>;
    writeJson<T>(filename: string, data: T): Promise<void>;
    exists(filename: string): Promise<boolean>;
    delete(filename: string): Promise<void>;
    getFilePath(filename: string): string;
}
export declare const storage: Storage;
//# sourceMappingURL=storage.d.ts.map