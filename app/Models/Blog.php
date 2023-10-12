<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id','title','content','thumbnail','majors_id','hashtag','views',
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