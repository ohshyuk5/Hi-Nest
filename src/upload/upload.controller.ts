import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File): string {
    console.log(file.buffer.toString());
    return file.buffer.toString();
  }

  @Post('array')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFileArray(@UploadedFiles() files: Express.Multer.File) {
    console.log(files);
  }

  @Post('/multiple')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  uploadMultipleFiles(@UploadedFiles() files) {
    console.log(files);
  }
}
