import {ImageDto} from "../models/dtos/image.dto";
import {join} from 'path';
import {AppConstants} from "../../common/config/constants";

const {ocrSpace} = require('ocr-space-api-wrapper');

export class OCRService {
    async hightlight(imageDto: ImageDto) {
        try {
            return await ocrSpace(join(process.cwd(), AppConstants.STORAGE_PATH + imageDto.image_name), {
                apiKey: process.env.OCR_API_KEY,
                isOverlayRequired: true,
                filetype: 'jpg'
            });
        } catch (error) {
            console.error(error);
        }
    }
}
