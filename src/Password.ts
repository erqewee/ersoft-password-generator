import { writeFileSync } from "node:fs";
import { LogTypes, SaveTypes } from "./export";

import { Logger } from "./base/Logger";
const logger: Logger = new Logger();

import { DatabaseTypes } from "./base/@types/DatabaseOptions";
import { Database } from "./base/Database";
const jdb = new Database({ path: ".\\@erqewee", name: "database", adapter: DatabaseTypes.JSON });
const ydb = new Database({ path: ".\\@erqewee", name: "database", adapter: DatabaseTypes.YAML });

export class Password {
    /*
    private lettersLower: boolean;
    private lettersUpper: boolean;
    private numbers: boolean;
    private symbols: boolean;
    */
    private length: number;

    public password?: string | any | null;

    // constructor(length: number = 16, lowerLetters: boolean = true, upperLetters: boolean = true, symbols: boolean = false, numbers: boolean = true) 

    constructor({ length }: { length?: number }) {
        /*
        * this.lettersLower = lowerLetters;
        * this.lettersUpper = upperLetters;
        * this.numbers = numbers;
        * this.symbols = symbols;
        */
        this.length ??= 64;

        this.password = null;
    };

    public generate({ log }: { log?: boolean }) {
        if (this.length < 8) logger.log("WARNING!!", "We recommended password length \"16\" or above!", LogTypes.Warn);

        const psw: any = this.create();
        
        if (log) {
            logger.log("Your password created successfully! Password:", this.password, 2);
            return psw;
        } else return psw;
    };

    public clear({ force }: { force?: boolean }) {
        if (force) return this.password = "";
        if (!this.password) return logger.log("No password for clean!", "Create password with \"generate()\" function. Or set force mode to true! (default: false)", 0);

        return this.password = "";
    };

    /**
     * Save password with custom save types
     */
    public save(type: SaveTypes = SaveTypes.File, path: string = "password.txt") {
        if (!this.password) logger.log("No password for save!", "Create password with \"generate()\" function!", 0);

        const date: Date = new Date();
        const day: number = date.getDate()
        const year: number = date.getFullYear();
        let month: any = date.getMonth();

        let hour: any = date.getHours();
        let minute: any = date.getMinutes();
        let second: any = date.getSeconds();
        let millisecond: any = date.getMilliseconds();

        if (month < 10) month = "0" + month;
        if (hour < 10) hour = "0" + hour;
        if (minute < 10) minute = "0" + minute;
        if (second < 10) second = "0" + second;

        const time: string = `${month}/${day}/${year} - ${hour}:${minute}:${second}::${millisecond}`;

        if (type === SaveTypes.File) {
            const detailed: string = `|==============
| Password: ${this.password}
| Created At: ${time}
|==============\n\n`;

            return writeFileSync(path, detailed, { flag: "a" });
        };

        logger.log("INFORMATION!", "Json and Yaml database provided with \"wio.db\" module.");

        if (type === SaveTypes.JsonDatabase) {
            jdb.set("pw-gen", {
                Password: this.password,
                Date: time
            });

            return logger.log("Your password successfully saved in database!", "", 2);
        };

        if (type === SaveTypes.YamlDatabase) {
            ydb.set("pw-gen", {
                Password: this.password,
                Date: time
            });

            return logger.log("Your password successfully saved in database!", "", 2);
        };
    };


    private create() {
        if (!this.length || this.length < 1) return logger.log(`[InvalidLength]`, "Please provide a valid length!", LogTypes.Error);

        const data = {
            upperLetters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            lowerLetters: "abcdefghijklmnopqrstuvwxyz",
            numbers: "1234567890",
            symbols: "\"#=>?$@%&'()*+-,/.:;~ƒ€Š§",
            all: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890\"#=>?$@%&'()*+-,/.:;~ƒ€Š§"
        };

        for (let l = 1; l <= this.length; l++) {
            this.password += data.all.charAt(Math.floor(Math.random() * this.length));
        };

        return this.password;
    };
};