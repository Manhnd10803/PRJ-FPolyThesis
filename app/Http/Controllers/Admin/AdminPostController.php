<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class AdminPostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        return view('admin.posts.index', compact('posts'));
    }

    public function create()
    {
        return view('admin.posts.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'content' => 'required|string',
            'feeling' => 'nullable|string',
            'image' => 'nullable|json',
            'hashtag' => 'nullable|string',
            'status' => 'required|integer',
            'views' => 'required|integer',
        ]);

        Post::create($request->all());

        return redirect()->route('admin.posts.index')->with('success', 'Post has been created successfully.');
    }

    public function edit(Post $post)
    {
        return view('admin.posts.edit', compact('post'));
    }

    public function update(Request $request, Post $post)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'content' => 'required|string',
            'feeling' => 'nullable|string',
            'image' => 'nullable|json',
            'hashtag' => 'nullable|string',
            'status' => 'required|integer',
            'views' => 'required|integer',
        ]);

        $post->update($request->all());

        return redirect()->route('admin.posts.index')->with('success', 'Post has been updated successfully.');
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('admin.posts.index')->with('success', 'Post has been deleted successfully.');
    }
}
