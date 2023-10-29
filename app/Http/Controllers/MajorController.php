<?php

namespace App\Http\Controllers;

use App\Models\Major;
use Illuminate\Http\Request;

class MajorController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/majors",
     *     tags={"Majors"},
     *     summary="Danh sách tất cả chuyển ngành",
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách chuyên ngành",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="majors_name", type="string"),
     *                 @OA\Property(property="majors_code", type="string"),
     *                 @OA\Property(property="description", type="string"),
     *             ),
     *         ),
     *     ),
     * )
     */

    public function list_majors(){
        $majors = Major::all();
        return response()->json($majors);
    }
}
