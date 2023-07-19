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
}
