<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class AdminEmotionController extends Controller
{
    /**
     * @OA\Post(
     *      path="/api/admin/emotions",
     *      operationId="addEmotion",
     *      tags={"Admin Emotions"},
     *      summary="Add a new emotion",
     *      description="Add a new emotion to the list of valid emotions.",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Emotion object to be added",
     *          @OA\JsonContent(
     *              required={"emotion"},
     *              @OA\Property(property="emotion", type="string", example="Happy")
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Emotion added successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Emotion added successfully")
     *          )
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="Emotion already exists",
     *          @OA\JsonContent(
     *              @OA\Property(property="error", type="string", example="Emotion already exists")
     *          )
     *      )
     * )
     *
     * Handle the request to add a new emotion.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function addEmotion(Request $request) {
        $newEmotion = $request->input('emotion');
        $validEmotions = config('app.valid_emotions') ?? []; 
    
        if (!in_array($newEmotion, $validEmotions)) {
            $validEmotions[] = $newEmotion;
            config(['app.valid_emotions' => $validEmotions]);
            return response()->json(['message' => 'Emotion added successfully']);
        }
    
        return response()->json(['error' => 'Emotion already exists'], 400);
    }    
    /**
     * @OA\Put(
     *      path="/api/admin/emotions/{oldEmotion}",
     *      operationId="updateEmotion",
     *      tags={"Admin Emotions"},
     *      summary="Update an existing emotion",
     *      description="Update an existing emotion in the list of valid emotions.",
     *      @OA\Parameter(
     *          name="oldEmotion",
     *          description="Old emotion to be updated",
     *          required=true,
     *          in="path",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          description="Updated emotion object",
     *          @OA\JsonContent(
     *              required={"new_emotion"},
     *              @OA\Property(property="new_emotion", type="string", example="Joyful")
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Emotion updated successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Emotion updated successfully")
     *          )
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Emotion not found",
     *          @OA\JsonContent(
     *              @OA\Property(property="error", type="string", example="Emotion not found")
     *          )
     *      )
     * )
     *
     * Handle the request to update an existing emotion.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $oldEmotion
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateEmotion(Request $request, $oldEmotion) {
        $newEmotion = $request->input('new_emotion');
        $validEmotions = config('app.valid_emotions') ?? []; 
        $key = array_search($oldEmotion, $validEmotions);
        if ($key !== false) {
            $validEmotions[$key] = $newEmotion;
            config(['app.valid_emotions' => $validEmotions]);
            return response()->json(['message' => 'Emotion updated successfully']);
        }
        return response()->json(['error' => 'Emotion not found'], 404);
    }
    /**
     * @OA\Delete(
     *      path="/api/admin/emotions/{emotionToDelete}",
     *      operationId="deleteEmotion",
     *      tags={"Admin Emotions"},
     *      summary="Delete an existing emotion",
     *      description="Delete an existing emotion from the list of valid emotions.",
     *      @OA\Parameter(
     *          name="emotionToDelete",
     *          description="Emotion to be deleted",
     *          required=true,
     *          in="path",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Emotion deleted successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Emotion deleted successfully")
     *          )
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Emotion not found",
     *          @OA\JsonContent(
     *              @OA\Property(property="error", type="string", example="Emotion not found")
     *          )
     *      )
     * )
     *
     * Handle the request to delete an existing emotion.
     *
     * @param  string  $emotionToDelete
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteEmotion($emotionToDelete) {
        $validEmotions = config('app.valid_emotions') ?? []; 
        
        $key = array_search($emotionToDelete, $validEmotions);
        
        if ($key !== false) {
            unset($validEmotions[$key]);
            config(['app.valid_emotions' => array_values($validEmotions)]);
            return response()->json(['message' => 'Emotion deleted successfully']);
        }
        
        return response()->json(['error' => 'Emotion not found'], 404);
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
