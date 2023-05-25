import { Inject } from "@nestjs/common";
import { EasyTracerConfig } from "../dto";
import { CustomLoggerService, EasyTracerService } from "../services";

export const Trace =
  (options?: EasyTracerConfig) =>
  (
    target: Object,
    propertyName: string,
    propertyDesciptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const method = propertyDesciptor.value;
    const injectLogger = Inject(CustomLoggerService);
    const injecyTracerConfig = Inject(EasyTracerService);
    injectLogger(target, "logger");
    injecyTracerConfig(target, "tracerConfig");

    propertyDesciptor.value = async function (...args: any[]) {
      const logger: CustomLoggerService = this.logger;
      const tracerConfig: EasyTracerService = this.tracerConfig;
      const configuration = options ? options : tracerConfig.getOptions();
      configuration?.showLogs && logger.request(propertyName, args);
      const result = await method.apply(this, args);
      configuration?.showLogs && logger.response(propertyName, result);
      return result;
    };
    return propertyDesciptor;
  };
