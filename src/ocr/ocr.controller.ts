import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
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
        let imageDto = new ImageDto();
        imageDto.file = file;
        return this.orcService.upload(imageDto);
    }

    @Post('highlight')
    highlight(@Body() image: ImageDto) {
        return this.orcService.hightlight(image);
    }
}
