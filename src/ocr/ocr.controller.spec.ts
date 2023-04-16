import {Test, TestingModule} from '@nestjs/testing';
import {OCRController} from './ocr.controller';
import {OCRService} from './services/ocr.service';
import {ImageDto} from "./models/dtos/image.dto";

describe('OCRController', () => {
    let ocrController: OCRController;
    let ocrService: OCRService;

    beforeEach(async () => {
        const service: TestingModule = await Test.createTestingModule({
            controllers: [OCRController],
            providers: [OCRService],
        }).compile();

        ocrController = service.get<OCRController>(OCRController);
        ocrService = service.get<OCRService>(OCRService);
    });

    describe('upload', () => {
        it('should return an image DTO', async () => {
            const file: Express.Multer.File = {
                fieldname: 'file',
                filename: 'Test image',
                originalname: 'Original image',
                encoding: null,
                mimetype: null,
                size: null,
                stream: null,
                destination: null,
                path: null,
                buffer: null
            };
            const resultImage = new ImageDto();
            resultImage.image_name = file.fieldname;
            jest.spyOn(ocrService, 'upload').mockImplementation(() => resultImage);

            expect(await ocrController.upload(file)).toBe(resultImage);
            expect(await ocrController.upload(file).image_name).toBe(file.fieldname);
        });
    });

    describe('highlight', () => {
        it('should return a highlight', async () => {
            const highlight = {
                'ParsedResults': []
            }

            const imageDto = new ImageDto();
            imageDto.image_name = 'Test image';

            jest.spyOn(ocrService, 'hightlight').mockImplementation(async () => highlight);

            expect(await ocrController.highlight(imageDto)).toBe(highlight);
        });
    });

    describe('getImage', () => {
        it('should return a image', async () => {
            const response = {
                sendFile: (imageId, options) => {
                    return "Test";
                }
            }

            expect(await ocrController.getImage('test-image', response)).toBe("Test");
        });
    });
});
