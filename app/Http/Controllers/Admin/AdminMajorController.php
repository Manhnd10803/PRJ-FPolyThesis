<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Major;
use Illuminate\Http\Request;

class AdminMajorController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/admin/majors",
     *     summary="Get the list of majors",
     *     tags={"Admin Majors"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation", 
     *     )
     * )
     */
    public function listMajor()
    {
        $majors = Major::all();
        return response()->json($majors);
    }

    /**
     * @OA\Post(
     *     path="/api/admin/majors",
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
    public function addMajor(Request $request)
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
     *     path="/api/admin/majors/{major}",
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
    public function detailMajor(Major $major)
    {
        return response()->json($major);
    }

    /**
     * @OA\Put(
     *     path="/api/admin/majors/{major}",
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
    public function editMajor(Request $request, Major $major)
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
     *     path="/api/admin/majors/{major}",
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
    public function deleteMajor(Major $major)
    {
        $major->delete();
        return response()->json(['message' => 'Major deleted'], 200);
    }

    //Admin web
    public function index()
    {
        $majors = Major::all();
        return view('admin.majors.index', compact('majors'));
    }

    public function create()
    {
        return view('admin.majors.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'majors_name' => 'required|string|max:255',
            'majors_code' => 'nullable|string|max:255|unique:majors',
            'description' => 'nullable|string',
        ]);

        Major::create($request->only(['majors_name', 'majors_code', 'description']));

        return redirect()->route('admin.majors.index')->with('success', 'Major has been created successfully.');
    }

    public function edit(Major $major)
    {
        return view('admin.majors.edit', compact('major'));
    }

    public function update(Request $request, Major $major)
    {
        $request->validate([
            'majors_name' => 'required|string|max:255',
            'majors_code' => 'nullable|string|max:255|unique:majors,majors_code,' . $major->id,
            'description' => 'nullable|string',
        ]);

        $major->update($request->only(['majors_name', 'majors_code', 'description']));

        return redirect()->route('admin.majors.index')->with('success', 'Major has been updated successfully.');
    }

    public function destroy(Major $major)
    {
        $major->delete();

        return redirect()->route('admin.majors.index')->with('success', 'Major has been deleted successfully.');
    }
}
