import { JsonDatabase, YamlDatabase } from "wio.db";

import { DatabaseOptions, DatabaseTypes } from "./@types/DatabaseOptions";

export class Database {

    public set: (key: string, value: string | number | any) => unknown;
    public del: (key: string) => void;
    public push: (key: string, value: string | number | any) => unknown;
    public pull: (key: string, callback: any) => unknown;
    public fetch: (key: string) => unknown;
    public get: (key: string) => unknown;
    public has: (key: string) => boolean;

    constructor(database: DatabaseOptions) {
        let db: JsonDatabase<any> | YamlDatabase<any>;
        if (database.adapter === DatabaseTypes.YAML) db = new YamlDatabase({ databasePath: `${database.path}/${database.name}.yml` });
        else if(database.adapter === DatabaseTypes.JSON) db = new JsonDatabase({ databasePath: `${database.path}/${database.name}.json` });

        this.set = function (key: string, value: string | number | any) {
            return db.set(key, value);
        };

        this.del = function (key: string) {
            return db.delete(key);
        };

        this.push = function (key: string, value: string | number | any) {
            return db.push(key, value);
        };

        this.pull = function (key: string, callback: any) {
            return db.pull(key, callback);
        };

        this.fetch = function (key: string) {
            return db.fetch(key);
        };

        this.get = function (key: string) {
            return db.get(key);
        };

        this.has = function (key: string) {
            return db.has(key);
        };
    };
};