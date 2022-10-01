import { LogColors, LogTypes } from "../export";
import { Instance } from "chalk";
const chalk = new Instance({ level: 3 });

const h: string = chalk.bgBlue("[@erqewee/password-generator]");

export class Logger {
    private message: string;

    constructor(defaultMessage: string = "An error occured.") {
        this.message = defaultMessage;
    };

    public async log(content?: string, text?: any, type: LogTypes = LogTypes.Info, color: LogColors = LogColors.Blue) {
        content = content ?? this.message;
        text = text ?? "";

        if (type === 0) {
            console.log(`${h} ${content} ${chalk[LogColors.Red](text)}`);
            this.terminate(1);
        } else if (type === 1) {
            console.log(`${h} ${content} ${chalk[LogColors.Yellow](text)}`);
        } else if (type === 2) {
            console.log(`${h} ${content} ${chalk[LogColors.Blue](text)}`);
        } else if (type === 4) {
            console.log(`${h} ${content} ${chalk[color](text)}`);
        };
    };

    /**
     * Terminate process. (0: Success | 1: Error)
     */
    private async terminate(code: number = 0) {
        return process.exit(code);
    };
};