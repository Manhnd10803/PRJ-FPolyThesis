<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', 'content', 'post_id', 'parent_id', 'blog_id', 'qa_id'
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
    public function qa()
    {
        return $this->belongsTo(Qa::class);
    }
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }
}
