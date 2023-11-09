<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Qa;

class AdminQaController extends Controller
{
    public function index()
    {
        $qas = Qa::all();
        return view('admin.qa.index', compact('qas'));
    }

    public function create()
    {
        return view('admin.qa.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'user_id' => 'required|integer',
            'majors_id' => 'required|integer',
            'hashtag' => 'nullable|string',
            'views' => 'required|integer',
        ]);

        Qa::create($request->all());

        return redirect()->route('admin.qa.index')->with('success', 'Question and Answer has been created successfully.');
    }

    public function edit(Qa $qa)
    {
        return view('admin.qa.edit', compact('qa'));
    }

    public function update(Request $request, Qa $qa)
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'user_id' => 'required|integer',
            'majors_id' => 'required|integer',
            'hashtag' => 'nullable|string',
            'views' => 'required|integer',
        ]);

        $qa->update($request->all());

        return redirect()->route('admin.qa.index')->with('success', 'Question and Answer has been updated successfully.');
    }

    public function destroy(Qa $qa)
    {
        $qa->delete();

        return redirect()->route('admin.qa.index')->with('success', 'Question and Answer has been deleted successfully.');
    }
}
