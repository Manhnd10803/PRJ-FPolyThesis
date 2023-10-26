<?php

namespace App\Http\Controllers;

use App\Models\Major;
use Illuminate\Http\Request;

class MajorController extends Controller
{
    public function list_majors(){
        $majors = Major::all();
        return response()->json($majors);
    }
}
