<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Qa extends Model
{
    use HasFactory;
    protected $table = 'question_and_answers';
    protected $fillable = [
        'user_id',
        'title',
        'content',
        'majors_id',
        'hashtag',
        'views'

    ];
    public function likes()
    {
        return $this->hasMany(Like::class);
    }
  
    public function comments()
    {   
        return $this->hasMany(Comment::class);
    }
  
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}