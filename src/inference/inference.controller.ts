import { Controller, Get } from '@nestjs/common';
import { InferenceService } from './inference.service';

@Controller('inference')
export class InferenceController {
  constructor(private readonly inferencesService: InferenceService) {}

  @Get()
  runScript(): Promise<string> {
    return this.inferencesService.test();
  }

  @Get('/sync')
  runSync(): Promise<string> {
    return this.inferencesService.testSync();
  }

  @Get('/async')
  runAsync(): Promise<string> {
    return this.inferencesService.testAsync();
  }
}
