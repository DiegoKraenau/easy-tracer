import { Module } from "@nestjs/common";
import { EasyTracerConfig } from "./dto";
import { TRACER_CONFIG } from "./util";
import { CustomLoggerService, EasyTracerService } from "./services";

@Module({})
export class EasyTracerModule {
  static forRoot(options: EasyTracerConfig) {
    return {
      global: true,
      module: EasyTracerModule,
      providers: [
        { provide: TRACER_CONFIG, useValue: options },
        CustomLoggerService,
        EasyTracerService,
      ],
      exports: [CustomLoggerService, EasyTracerService],
    };
  }
}
