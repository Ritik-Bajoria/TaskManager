const fs = require('fs');
const path = require('path');

class Logger {
    constructor() {
        if (Logger.instance == null) {
            // console.log("finally it is updated");
            this.logFilePath = path.join('./', 'combined.log');
            Logger.instance = this;
            this.info(`App started on process id:${process.pid}`);
        }
        return Logger.instance;
    }

    log(message, level) {
        const logMessage = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} [${level}]:  ${message}\n`;
        fs.appendFileSync(this.logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        });
    }

    info(message) {
        this.log(message, 'INFO');
    }

    warn(message) {
        this.log(message, 'WARN');
    }

    error(message) {
        this.log(message, 'ERROR');
    }
}

// Ensure only one instance is created
const loggerInstance = new Logger();
Object.freeze(loggerInstance);

module.exports = loggerInstance;
