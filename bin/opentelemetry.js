import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter, SimpleSpanProcessor, BatchSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';

const setupOpenTelemetry = () => {
    const traceExporter = new OTLPTraceExporter({
        url: 'http://your_host/v1/traces',
    });

    const metricExporter = new OTLPMetricExporter({
        url: 'http://your_host/v1/metrics',
    });

    const sdk = new NodeSDK({
        traceExporter: traceExporter,
        serviceName: 'testing',
        // idGenerator:,
        metricReader: new PeriodicExportingMetricReader({
            exporter: metricExporter,
            exportIntervalMillis: 6000,
        }),
        spanProcessors: [
            // new SimpleSpanProcessor(new ConsoleSpanExporter()),
            new BatchSpanProcessor(traceExporter, {
                maxQueueSize: 500, // Maximum number of spans in queue
                maxExportBatchSize: 100, // Maximum number of spans to export in one batch
                scheduledDelayMillis: 5000, // Delay between export attempts
                exportTimeoutMillis: 30000 // Timeout for export operation
            })],
        instrumentations: getNodeAutoInstrumentations({
            '@opentelemetry/instrumentation-express': { enabled: true },
            '@opentelemetry/instrumentation-redis': { enabled: true },
            '@opentelemetry/instrumentation-ioredis': { enabled: true },
            '@opentelemetry/instrumentation-http': { enabled: true },
            '@opentelemetry/instrumentation-aws-sdk': { enabled: true },
            '@opentelemetry/instrumentation-mongodb': { enabled: true },
            '@opentelemetry/instrumentation-mysql': { enabled: true },
            '@opentelemetry/instrumentation-mysql2': { enabled: true },
            '@opentelemetry/instrumentation-fastify': { enabled: true },
        }),
    });
    // const metric = meter.getMeter('cricket-node-api');
    sdk.start();
};

export { setupOpenTelemetry };
