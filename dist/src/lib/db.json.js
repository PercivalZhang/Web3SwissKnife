"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONDBBuilder = void 0;
const node_json_db_1 = require("node-json-db");
const JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
const LoggerFactory_1 = require("./LoggerFactory");
const logger = LoggerFactory_1.LoggerFactory.getInstance().getLogger('DB');
class JSONDBBuilder {
    constructor(dbFileName, saveOnPush, humanReadable, path) {
        this.db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config(dbFileName, saveOnPush, humanReadable, path));
    }
    getData(path) {
        try {
            return this.db.getData(path);
        }
        catch (e) {
            logger.debug(e.toString());
            return null;
        }
    }
    push(path, data) {
        logger.debug(`add data to path: ${path}`);
        this.db.push(path, data);
    }
    delete(path) {
        this.db.delete(path);
    }
    pushArray(path, data, key) {
        let items = this.db.getData(path);
        let duplicated = false;
        for (const item of items) {
            if (item[key] === data[key]) {
                logger.warn(`duplicated item`);
                duplicated = true;
                break;
            }
        }
        if (!duplicated) {
            this.db.push(path + '[]', data);
        }
    }
    findArray(path, value, key) {
        const items = this.db.getData(path);
        for (const item of items) {
            if (item[key] === value) {
                return item;
            }
        }
        return null;
    }
}
exports.JSONDBBuilder = JSONDBBuilder;
//# sourceMappingURL=db.json.js.map