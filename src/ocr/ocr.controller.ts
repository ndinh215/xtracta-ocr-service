import {Body, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {OCRService} from "./services/ocr.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {ImageDto} from "./models/dtos/image.dto";
@Controller('ocr')
export class OcrController {
  constructor(private readonly orcService: OCRService) {
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log(file)
  }

  @Post('highlight')
  highlight(@Body() image: ImageDto) {
    console.log(image)
  }
}
