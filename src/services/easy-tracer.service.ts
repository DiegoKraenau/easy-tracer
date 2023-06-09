import { Inject, Injectable } from '@nestjs/common';
import { TRACER_CONFIG } from '../util';
import { EasyTracerConfig } from '../dto';

@Injectable()
export class EasyTracerService {
  constructor(@Inject(TRACER_CONFIG) public options: EasyTracerConfig) {}

  /**
   * Get options from root module.
   */
  getOptions() {
    return this.options;
  }
}
