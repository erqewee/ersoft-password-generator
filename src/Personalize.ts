import { writeFileSync } from "node:fs";
import { Logger } from "./base/Logger";
const logger = new Logger();

import { JsonDatabase, YamlDatabase } from "wio.db";
const jdb = new JsonDatabase({ databasePath: ".\\@erqewee\\database.json" });
const ydb = new YamlDatabase({ databasePath: ".\\@erqewee\\database.yml" });

import { Positions, SaveTypes } from "./export";

export class Personalize {
    public readonly password: {
        input: string;
        output: string;
        length: { new: number; old: number }
    };

    constructor(password: any) {
        this.password = {
            input: password,
            output: "",
            length: {
                new: 0,
                old: 0
            }
        };
    };

    /**
     * Returns a section of a string.
     */
    async slice({ start, end }: { start?: number, end?: number }) {
        if (!this.password.input) return logger.log("No password for slice!", "Enter password in class constructor!", 0);

        this.password.length.new = String(this.password.input).length;
        const sliced: string = String(this.password.input).slice(start, end);
        this.password.length.old = String(sliced).length;
        this.password.output = sliced;

        return logger.log("Your password successfully sliced!", `\nEntered Password  : ${this.password.input}\nTrimmed Password  : ${sliced}\n\nNew Length: ${this.password.length.new}\nOld Length: ${this.password.length.old}`, 2);
    };

    /**
     * Removes the leading and trailing white space and line terminator characters from a string.
     */
    async trim() {
        if (!this.password.input) return logger.log("No password for trim!", "Enter password in class constructor!", 0);

        this.password.length.old = String(this.password.input).length;
        const trimmed: string = String(this.password.input).trim();
        this.password.length.new = String(trimmed).length;
        this.password.output = trimmed;

        return logger.log("Your password successfully trimmed!", `\nEntered Password  : ${this.password.input}\nTrimmed Password  : ${trimmed}\n\nNew Length: ${this.password.length.new}\nOld Length: ${this.password.length.old}`, 2);
    };

    /**
     * Add your text to provided password!
     */
    async add(text: string, position: Positions = Positions.Right) {
        if (!this.password.input) return logger.log("No password for add!", "Enter password in class constructor!", 0);

        if (position === Positions.Left) {
            this.password.length.old = String(this.password.input).length;
            const added: string = text + String(this.password.input);
            this.password.length.new = String(added).length;
            this.password.output = added;

            return logger.log("Your password successfully edited!", `\nEntered Password  : ${this.password.input}\nNew Password  : ${added}\n\nNew Length: ${this.password.length.new}\nOld Length: ${this.password.length.old}`, 2);
         };

        if (position === Positions.Right) {
            this.password.length.old = String(this.password.input).length;
            const added: string = String(this.password.input) + text;
            this.password.length.new = String(added).length;
            this.password.output = added;

            return logger.log("Your password successfully edited!", `\nEntered Password  : ${this.password.input}\nNew Password  : ${added}\n\nNew Length: ${this.password.length.new}\nOld Length: ${this.password.length.old}`, 2);
         };

        if (position === Positions.Center) {
            const p: string = this.password.input;

            this.password.length.old = String(this.password.input).length;
            const middle: number = Math.ceil(p.length / 2);
            const add: string = p.substring(0, middle) + text + p.substring(middle);            
            this.password.length.new = String(add).length;
            this.password.output = add;

            return logger.log("Your password successfully edited!", `\nEntered Password  : ${this.password.input}\nNew Password  : ${add}\n\nNew Length: ${this.password.length.new}\nOld Length: ${this.password.length.old}`, 2);
        };
    };
    /**
     * Returns the position of the first occurrence of a substring.
     */
    async index(search: string, position?: number) {
        if (!this.password.input) return logger.log("No password for get index number!", "Enter password in class constructor!", 0);

        const indexed: number = String(this.password.input).indexOf(search, position);

        return logger.log("Your password successfully indexed!", `\nEntered Password  : ${this.password.input} \nIndex No          : ${indexed}`, 2);
    };

    /**
     * Save your password with custom personalized save types!
     */
    async save(type: SaveTypes = SaveTypes.File, path: string = "password.txt") {
        if (!this.password.input) logger.log("No password for save!", "Create password with \"generate()\" function!", 0);

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
            path = path ?? "password.txt";

            const detailed: string = `|==============
| Password: ${this.password.input}
| Created At: ${time}
|==============\n\n`;

            return writeFileSync(path, detailed, { flag: "a" });
        };

        logger.log("INFORMATION!", "JSON and YAML database provided with \"wio.db\" module.");

        if (type === SaveTypes.JsonDatabase) {
            jdb.set("pw-gen", {
                Password: this.password.input,
                Date: time
            });

            return logger.log("Your password successfully saved in database!", "", 2);
        };

        if (type === SaveTypes.YamlDatabase) {
            ydb.set("pw-gen", {
                Password: this.password.input,
                Date: time
            });

            return logger.log("Your password successfully saved in database!", "", 2);
        };
    };
};