console.log('OpenTelemetry Initializing...');

const { NodeSDK } = require('@opentelemetry/sdk-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const { logs } = require('@opentelemetry/api-logs');
const { LoggerProvider, SimpleLogRecordProcessor } = require('@opentelemetry/sdk-logs');
const { OTLPLogExporter } = require('@opentelemetry/exporter-logs-otlp-http');

const otlpEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://splunk-otel-collector-agent.observability.svc.cluster.local:4318';
const logExporter = new OTLPLogExporter({
  url: `${otlpEndpoint.replace(/\/$/, '')}/v1/logs`,
});

const loggerProvider = new LoggerProvider({
  processors: [new SimpleLogRecordProcessor(logExporter)],
});

logs.setGlobalLoggerProvider(loggerProvider);

const sdk = new NodeSDK({
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

const originalConsoleLog = console.log;
console.log = (...args) => {
  const message = args.map((arg) => typeof arg === 'string' ? arg : JSON.stringify(arg)).join(' ');
  const logger = logs.getLogger('web-app');
  logger.emit({
    body: message,
    severityText: 'INFO',
    attributes: {
      service: 'web-app',
      environment: process.env.OTEL_RESOURCE_ATTRIBUTES || 'unknown',
    },
  });
  originalConsoleLog(...args);
};
console.log.__otelWrapped = true;

console.log('OpenTelemetry Started');