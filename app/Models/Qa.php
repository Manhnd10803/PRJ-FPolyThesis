<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Qa extends Model
{
    use HasFactory, LogsActivity;
    protected static $recordEvents = ['created', 'updated', 'deleted'];
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['*'])
            ->useLogName('qas');
    }
    public function getDescriptionForEvent(string $eventName): string
    {
        return "User has been {$eventName}";
    }
    protected $table = 'questions';
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
    public function major()
    {
        return $this->belongsTo(Major::class, 'majors_id', 'id');
    }
}
