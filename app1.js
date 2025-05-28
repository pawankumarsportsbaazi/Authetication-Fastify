import fs from 'fs';
import { performance } from 'perf_hooks';
import pino from 'pino';
import winston from 'winston';

// Setup
const iterations = 10000;
const logMessage = 'Benchmark log message\n';

// Logger setup
const pinoLogger = pino(pino.destination('pino.log'));
const winstonLogger = winston.createLogger({
    transports: [new winston.transports.File({ filename: 'winston.log' })]
});
const fsStream = fs.createWriteStream('fs.log', { flags: 'a' });

function logWithFs(callback) {
    let count = 0;
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        fsStream.write(logMessage, () => {
            count++;
            if (count === iterations) {
                const time = performance.now() - start;
                callback();
                console.log(`fs.write: ${time.toFixed(2)}ms`);
            }
        });
    }
}

function logWithPino(callback) {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        pinoLogger.info(logMessage);
    }
    pinoLogger.flush();
    const time = performance.now() - start;
    callback();
    console.log(`pino: ${time.toFixed(2)}ms`);
}

function logWithWinston(callback) {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        winstonLogger.info(logMessage);
    }
    const time = performance.now() - start;
    callback();
    console.log(`winston: ${time.toFixed(2)}ms`);
}

// Run in sequence
logWithFs(() => {
    logWithPino(() => {
        logWithWinston(() => {
            console.log('Benchmark complete');
        });
    });
});
