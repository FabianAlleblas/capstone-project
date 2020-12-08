<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;

class Base64ConvertService extends UploadedFile
{

    public function __construct(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        if(!$data['imageData']) 
        {
            return null;
        }
        
        $originalName = $data['imageData']['name'];
        $base64Content = $data['imageData']['value'];

        $filePath = tempnam(sys_get_temp_dir(), 'UploadedFile');
        $data = base64_decode($this->getBase64String($base64Content));
        file_put_contents($filePath, $data);

        $error = null;
        $mimeType = null;
        $test = true;

        parent::__construct($filePath, $originalName, $mimeType, $error, $test);
    }

    private function getBase64String(string $base64Content)
    {

        $data = explode(';base64,', $base64Content);
        return $data[1];

    }

}