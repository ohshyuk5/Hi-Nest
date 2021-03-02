import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  runWithFileString(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    return this.inferencesService.runWithFileString(file.buffer.toString());
  }
  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // runWithFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
  //   return this.inferencesService.runWithFile(file);
  // }
}
