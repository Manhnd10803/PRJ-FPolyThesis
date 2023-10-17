<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $fillable =[
        'user_id','title','content','feeling','image','hashtag','status','view'
    ];
    public function likes()
{
    return $this->hasMany(Like::class);
}
    public function comments()
{   
    return $this->hasMany(Comment::class);
}
}