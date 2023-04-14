import {ImageDto} from "../models/dtos/image.dto";
import {join} from "path";
import {AppConstants} from "../../common/config/constants";
import {HttpException, HttpStatus} from "@nestjs/common";

const ocrSpace = require("ocr-space-api-wrapper");
const fs = require("fs");

export class OCRService {
    async hightlight(imageDto: ImageDto) {
        const filePath = join(process.cwd(), AppConstants.STORAGE_PATH + imageDto.image_name);
        if (!fs.existsSync(filePath)) {
            throw new HttpException("File not found", HttpStatus.NOT_FOUND);
        }

        try {
            return await ocrSpace(filePath, {
                apiKey: process.env.OCR_API_KEY,
                isOverlayRequired: true,
                filetype: 'jpg'
            });
        } catch (error) {
            console.error(error);
        }
    }
}
