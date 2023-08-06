<?php

namespace App\Manager;

use Intervention\Image\Facades\Image;

class ImageUploadManager
{
    public const DEFAULT_IMAGE = 'images/default.webp';
    final public static function uploadImage($name, $width, $height, $path, $file)
    {
        $image_file_name = $name . '.webp';
        Image::make($file)->fit($width, $height)->save(public_path($path . $image_file_name), 50, 'webp');
        return $image_file_name;
    }

    final public static function deletePhoto($path, $img)
    {
        $path = public_path($path) . $img;
        if ($img != '' && file_exists($path)) {
            unlink($path);
        }
    }
    final public static function prepareImageUrl($path, $img)
    {
        $url = url($path . $img);
        if (empty($img)) {
            $url = url(self::DEFAULT_IMAGE);
        }
        return $url;
    }
    public static function processImageUpload(
        $file,
        $name,
        $path,
        $width,
        $height,
        $path_thumb = null,
        $width_thumb = 0,
        $height_thumb = 0,
        $existing_photo = ''
    ) {
        if (!empty($existing_photo)) {
            self::deletePhoto($path, $existing_photo);
            if (!empty($path_thumb)) {
                self::deletePhoto($path_thumb, $existing_photo);
            }
        }

        $photo_name = self::uploadImage($name, $width, $height, $path, $file);
        if (!empty($path_thumb)) {
            self::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
        }

        return $photo_name;
    }
}
