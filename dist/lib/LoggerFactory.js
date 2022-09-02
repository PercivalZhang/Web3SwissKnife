"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerFactory = void 0;
const log4js_1 = require("log4js");
class LoggerFactory {
    constructor(pathConfigFile = "config/log4js.json") {
        (0, log4js_1.configure)(pathConfigFile);
    }
    static getInstance() {
        if (!LoggerFactory.instance) {
            LoggerFactory.instance = new LoggerFactory();
        }
        return LoggerFactory.instance;
    }
    getLogger(category) {
        return (0, log4js_1.getLogger)(category);
    }
}
exports.LoggerFactory = LoggerFactory;
//# sourceMappingURL=LoggerFactory.js.map