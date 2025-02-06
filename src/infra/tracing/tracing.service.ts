import { NodeSDK } from '@opentelemetry/sdk-node';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { Resource } from '@opentelemetry/resources';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces',
});

export const tracingService = new NodeSDK({
  resource: new Resource({
    'service.name': 'nestjs-api-boilerplate',
  }),
  spanProcessor: new SimpleSpanProcessor(traceExporter),
  instrumentations: [new HttpInstrumentation(), new NestInstrumentation()],
});
