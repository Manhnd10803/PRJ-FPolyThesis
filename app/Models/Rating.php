<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Rating extends Model
{
    use HasFactory,LogsActivity;
    protected static $recordEvents = ['created', 'updated', 'deleted'];
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['*'])
            ->useLogName('ratings');
    }
    public function getDescriptionForEvent(string $eventName): string
    {
        return "User has been {$eventName}";
    }
    protected $table = 'ratings';
    protected $fillable = [
        'user_id',
        'blog_id',
        'rating_scores',
        'created_at',
        'updated_at'
    ];
}