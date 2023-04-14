import {Module} from '@nestjs/common';
import {OCRService} from './services/ocr.service';
import {OcrController} from './ocr.controller';

@Module({
    imports: [],
    exports: [OCRService],
    controllers: [OcrController],
    providers: [OCRService],
})
export class OcrModule {
}
