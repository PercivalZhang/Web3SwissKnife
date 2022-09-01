export declare class JSONDBBuilder {
    private db;
    constructor(dbFileName: string, saveOnPush: boolean, humanReadable: boolean, path: string);
    getData(path: string): any;
    push(path: string, data: Object): void;
    delete(path: string): void;
    pushArray(path: string, data: Object, key: string): void;
    findArray(path: string, value: string, key: string): any;
}
