import {Body, Controller, Get, Header, Param, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {OCRService} from "./services/ocr.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {ImageDto} from "./models/dtos/image.dto";
import {diskStorage} from "multer";
import {AppConstants} from "../common/config/constants"

@Controller('ocr')
export class OCRController {
    constructor(private readonly ocrService: OCRService) {
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
            storage: diskStorage({
                destination: AppConstants.UPLOAD_PATH,
            })
        })
    )
    upload(@UploadedFile() file: Express.Multer.File) {
        return this.ocrService.upload(file);
    }

    @Get('images/:imageId')
    @Header('content-type', 'image/*')
    getImage(@Param('imageId') imageId: string, @Res() response) {
        return response.sendFile(imageId, {root: AppConstants.UPLOAD_PATH});
    }

    @Post('highlight')
    highlight(@Body() image: ImageDto) {
        return this.ocrService.hightlight(image);
    }
}
