<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Major;
use Illuminate\Http\Request;

class AdminMajorController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/majors",
     *     summary="Get the list of majors",
     *     tags={"Admin Majors"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation", 
     *     )
     * )
     */
    public function index()
    {
        $majors = Major::all();
        return response()->json($majors);
    }

    public function create()
    {
        //
    }

    /**
     * @OA\Post(
     *     path="/api/majors",
     *     summary="Create a new major",
     *     tags={"Admin Majors"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="majors_name", type="string", example="Computer Science"),
     *             @OA\Property(property="majors_code", type="string", example="CS"),
     *             @OA\Property(property="description", type="string", example="Study of computer systems and software engineering.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Major created successfully"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The given data was invalid."),
     *             @OA\Property(property="errors", type="object", example={"majors_name": {"The majors name field is required."}})
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'majors_name' => 'required|string',
            'majors_code' => 'unique:majors|nullable|string',
            'description' => 'nullable|string'
        ]);

        $major = Major::create($request->all());
        return response()->json($major, 201);
    }

   /**
     * @OA\Get(
     *     path="/api/majors/{major}",
     *     summary="Get details of a major",
     *     tags={"Admin Majors"},
     *     @OA\Parameter(
     *         name="major",
     *         in="path",
     *         required=true,
     *         description="ID of the major",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Major not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Major not found.")
     *         )
     *     )
     * )
     */
    public function show(Major $major)
    {
        return response()->json($major);
    }

    public function edit(string $id)
    {
        //
    }

    /**
     * @OA\Put(
     *     path="/api/majors/{major}",
     *     summary="Update a major",
     *     tags={"Admin Majors"},
     *     @OA\Parameter(
     *         name="major",
     *         in="path",
     *         required=true,
     *         description="ID of the major",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="majors_name", type="string", example="New Major Name"),
     *             @OA\Property(property="majors_code", type="string", example="NEW"),
     *             @OA\Property(property="description", type="string", example="Updated description of the major.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Major updated successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Major not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Major not found.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The given data was invalid."),
     *             @OA\Property(property="errors", type="object", example={"majors_name": {"The majors name field must be a string."}})
     *         )
     *     )
     * )
     */
    public function update(Request $request, Major $major)
    {
        $this->validate($request, [
            'majors_name' => 'string',
            'majors_code' => 'unique:majors|nullable|string',
            'description' => 'nullable|string'
        ]);

        $major->update($request->all());
        return response()->json($major, 200);
    }
    /**
     * @OA\Delete(
     *     path="/api/majors/{major}",
     *     summary="Delete a major",
     *     tags={"Admin Majors"},
     *     @OA\Parameter(
     *         name="major",
     *         in="path",
     *         required=true,
     *         description="ID of the major",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Major deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Major deleted.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Major not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Major not found.")
     *         )
     *     )
     * )
     */
    public function destroy(Major $major)
    {
        $major->delete();
        return response()->json(['message' => 'Major deleted'], 200);
    }
}
