<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', 'post_id','emotion','blog_id','qa_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    } 
    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }    
    public function Qa()
    {
        return $this->belongsTo(Qa::class);
    } 
}