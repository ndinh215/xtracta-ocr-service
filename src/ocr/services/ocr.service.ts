import {ImageDto} from "../models/dtos/image.dto";

export class OCRService {
    upload(imageDto: ImageDto): ImageDto {
        delete imageDto.file;
        return imageDto;
    }

    hightlight(imageDto: ImageDto): ImageDto {
        return imageDto;
    }
}
