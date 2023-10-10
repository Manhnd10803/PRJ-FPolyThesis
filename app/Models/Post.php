<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $fillable =[
        'title','content','images','tags','major_id','user_id','status'
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