import winston from 'winston';

const config = {
    level: 'info',
    handleException: true,
    format: winston.format.combine(winston.format.colorize())
};

export const logger = winston.createLogger({
    transports: [new winston.transports.Console(config)],
    exitOnError: false
})