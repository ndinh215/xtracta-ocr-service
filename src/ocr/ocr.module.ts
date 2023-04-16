import {Module} from '@nestjs/common';
import {OCRService} from './services/ocr.service';
import {OCRController} from './ocr.controller';

@Module({
    imports: [],
    exports: [OCRService],
    controllers: [OCRController],
    providers: [OCRService],
})
export class OcrModule {
}
