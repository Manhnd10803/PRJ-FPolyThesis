<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class AdminEmotionController extends Controller
{
    public function __construct()
    {
        $this->middleware('authAdmin');
    }
    //Admin web
    public function index()
    {
        $emotions = Config::get('emotions.valid_emotions', []); 
        return view('admin.emotions.index', compact('emotions'));
    }
    public function create()
    {
        return view('admin.emotions.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'emotion' => 'required|string',
        ]);
    
        $newEmotion = $request->input('emotion');
        $emotionsFilePath = config_path('emotions.php');
    
        // Đọc danh sách cảm xúc từ tệp emotions.php (nếu tệp không tồn tại, tạo một mảng rỗng)
        $emotions = File::exists($emotionsFilePath) ? include($emotionsFilePath) : ['valid_emotions' => []];
    
        // Kiểm tra xem cảm xúc đã tồn tại hay chưa
        if (!in_array($newEmotion, $emotions['valid_emotions'])) {
            // Thêm cảm xúc mới vào danh sách
            $emotions['valid_emotions'][] = $newEmotion;
    
            // Ghi danh sách cảm xúc vào tệp emotions.php
            $emotionsContent = '<?php return ' . var_export($emotions, true) . ';';
            File::put($emotionsFilePath, $emotionsContent);
    
            return redirect()->route('admin.emotions.index')->with('success', 'Cảm xúc đã được thêm thành công.');
        }
    
        return redirect()->route('admin.emotions.create')->with('error', 'Cảm xúc đã tồn tại.');
    }

    public function edit($emotion)
    {
        $emotions = Config::get('emotions.valid_emotions');
        $key = array_search($emotion, $emotions);

        if ($key !== false) {
            $selectedEmotion = $emotions[$key];
            return view('admin.emotions.edit', compact('selectedEmotion'));
        }

        return redirect()->route('admin.emotions.index')->with('error', 'Cảm xúc không tồn tại.');
    }

    public function update(Request $request, $emotion)
    {
        $request->validate([
            'new_emotion' => 'required|string'
        ]);

        $newEmotion = $request->input('new_emotion');
        $emotionsFilePath = config_path('emotions.php');

        // Đọc danh sách cảm xúc từ tệp emotions.php (nếu tệp không tồn tại, tạo một mảng rỗng)
        $emotions = File::exists($emotionsFilePath) ? include($emotionsFilePath) : ['valid_emotions' => []];

        // Kiểm tra xem cảm xúc mới đã tồn tại hay chưa
        if (!in_array($newEmotion, $emotions['valid_emotions'])) {
            $key = array_search($emotion, $emotions['valid_emotions']);
            if ($key !== false) {
                // Cập nhật cảm xúc
                $emotions['valid_emotions'][$key] = $newEmotion;

                // Ghi danh sách cảm xúc vào tệp emotions.php
                $emotionsContent = '<?php return ' . var_export($emotions, true) . ';';
                File::put($emotionsFilePath, $emotionsContent);

                return redirect()->route('admin.emotions.index')->with('success', 'Cảm xúc đã được cập nhật thành công.');
            }
        }

        return redirect()->route('admin.emotions.index')->with('error', 'Cảm xúc không tồn tại hoặc cảm xúc mới đã tồn tại.');
    }

    public function destroy($emotion)
    {
        $emotionsFilePath = config_path('emotions.php');

        // Đọc danh sách cảm xúc từ tệp emotions.php (nếu tệp không tồn tại, tạo một mảng rỗng)
        $emotions = File::exists($emotionsFilePath) ? include($emotionsFilePath) : ['valid_emotions' => []];

        // Kiểm tra xem cảm xúc đã tồn tại trong danh sách hay không
        $key = array_search($emotion, $emotions['valid_emotions']);
        if ($key !== false) {
            // Xóa cảm xúc khỏi danh sách
            unset($emotions['valid_emotions'][$key]);

            // Ghi danh sách cảm xúc vào tệp emotions.php
            $emotionsContent = '<?php return ' . var_export($emotions, true) . ';';
            File::put($emotionsFilePath, $emotionsContent);

            return redirect()->route('admin.emotions.index')->with('success', 'Cảm xúc đã được xóa thành công.');
        }

        return redirect()->route('admin.emotions.index')->with('error', 'Cảm xúc không tồn tại.');
    }

}
