export class ImageDto {

    image_name: string;

    image_url: string;

    image_height: number;

    image_width: number;

    file: Express.Multer.File;

    mime_type: string;

    size: number;

    original_name: string;

    highlight: any

    path: string;
}
