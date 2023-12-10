<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Friend extends Model
{

    use HasFactory, LogsActivity;
    protected static $recordEvents = ['created', 'updated', 'deleted'];
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['*'])
            ->useLogName('friends');
    }
    public function getDescriptionForEvent(string $eventName): string
    {
        return "User has been {$eventName}";
    }
    protected $fillable  = [
        'user_id_1', 'user_id_2', 'status', 'friendship_type',
    ];
    public function friend()
    {
        return $this->belongsTo(User::class, 'user_id_2');
    }
}