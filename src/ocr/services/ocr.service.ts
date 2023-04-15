import {ImageDto} from "../models/dtos/image.dto";
import {join} from "path";
import {AppConstants} from "../../common/config/constants";
import {HttpException, HttpStatus} from "@nestjs/common";
import * as FormData from "form-data";
import axios from "axios";

const fs = require("fs");

export class OCRService {
    async hightlight(imageDto: ImageDto) {
        const filePath = join(process.cwd(), AppConstants.STORAGE_PATH + imageDto.image_name);
        if (!fs.existsSync(filePath)) {
            throw new HttpException("File not found", HttpStatus.NOT_FOUND);
        }

        try {
            return await this.ocrSpace(filePath, {
                apiKey: process.env.OCR_API_KEY,
                isOverlayRequired: true,
                filetype: 'jpg'
            });
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    detectInput(input) {
        if (input.startsWith('http')) return 'url';
        if (input.startsWith('data:')) return 'base64Image';
        return 'file';
    }

    async ocrSpace(input, options: any = {}) {
        try {
            if (!input || typeof input !== 'string') {
                throw Error('Param input is required and must be typeof string');
            }

            const {
                apiKey, ocrUrl, language, isOverlayRequired,
                filetype, detectOrientation, isCreateSearchablePdf,
                isSearchablePdfHideTextLayer, scale, isTable, OCREngine,
            } = options;

            const formData = new FormData();

            const detectedInput = this.detectInput(input);
            switch (detectedInput) {
                case 'file':
                    formData.append('file', fs.createReadStream(input));
                    break;
                case 'url':
                case 'base64Image':
                    formData.append(detectedInput, input);
                    break;
            }

            formData.append('language', String(language || 'eng'));
            formData.append('isOverlayRequired', String(isOverlayRequired || 'false'));
            if (filetype) {
                formData.append('filetype', String(filetype));
            }
            formData.append('detectOrientation', String(detectOrientation || 'false'));
            formData.append('isCreateSearchablePdf', String(isCreateSearchablePdf || 'false'));
            formData.append('isSearchablePdfHideTextLayer', String(isSearchablePdfHideTextLayer || 'false'));
            formData.append('scale', String(scale || 'false'));
            formData.append('isTable', String(isTable || 'false'));
            formData.append('OCREngine', String(OCREngine || '1'));

            const request = {
                method: 'POST',
                url: String(ocrUrl || 'https://api.ocr.space/parse/image'),
                headers: {
                    apikey: String(apiKey),
                    ...formData.getHeaders(),
                },
                data: formData,
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
            };

            const {data} = await axios(request);

            return data;
        } catch (error) {
            console.error(error);
        }
    }
}
