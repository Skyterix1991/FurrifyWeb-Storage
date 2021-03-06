import {MediaType} from "../enum/media-type.enum";

export class MediaExtensionsConfig {

    public static PREFIX = "EXTENSION_";

    private static IMAGES = [
        'webp',
        'ico',
        'svg',
        'bm',
        'tif',
        'tiff',
        'wbmp',
        'bmp',
        'bm',
        'png',
        'jpeg',
        'jpg'
    ];

    private static AUDIO = [
        'ogg',
        'flac',
        'mp3',
        'wav'
    ];

    private static VIDEOS = [
        'ts',
        'mov',
        'flv',
        'avi',
        'wmv',
        'mkv',
        'webm',
        'mp4',
        'mpeg'
    ];

    public static ANIMATIONS = [
        'gif'
    ];

    public static EXTENSIONS = [...this.IMAGES, ...this.VIDEOS, ...this.ANIMATIONS, ...this.AUDIO];

    public static getExtensionsByType(type: MediaType): string[] {
        switch (type) {
            case MediaType.IMAGE:
                return this.IMAGES;
            case MediaType.VIDEO:
                return this.VIDEOS;
            case MediaType.ANIMATION:
                return this.ANIMATIONS;
            case MediaType.AUDIO:
                return this.AUDIO;
            default:
                return [];
        }
    }

    public static getTypeByExtension(extension: string): MediaType | null {
        extension = extension.replace(this.PREFIX, "").toLowerCase();

        if (this.IMAGES.includes(extension)) {
            return MediaType.IMAGE;
        } else if (this.ANIMATIONS.includes(extension)) {
            return MediaType.ANIMATION;
        } else if (this.AUDIO.includes(extension)) {
            return MediaType.AUDIO;
        } else if (this.VIDEOS.includes(extension)) {
            return MediaType.VIDEO;
        }

        return null;
    }
}
