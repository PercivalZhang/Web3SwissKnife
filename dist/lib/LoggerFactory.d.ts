import { Logger } from "log4js";
export declare class LoggerFactory {
    private static instance;
    private constructor();
    static getInstance(): LoggerFactory;
    getLogger(category: string): Logger;
}
