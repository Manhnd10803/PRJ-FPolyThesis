<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Report extends Model
{
    use HasFactory,LogsActivity;
    protected static $recordEvents = ['created', 'updated', 'deleted'];
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['*'])
            ->useLogName('reports');
    }
    public function getDescriptionForEvent(string $eventName): string
    {
        return "User has been {$eventName}";
    }
    protected $table = 'reports';
    protected $fillable = [
        'reporter_id',
        'reported_id',
        'report_title',
        'report_content',
        'report_type',
        'report_type_id',
        'report_status',
        'report_image',
    ];
    public function reporter()
    {
        return $this->belongsTo(User::class, 'reporter_id');
    }

    public function reported()
    {
        return $this->belongsTo(User::class, 'reported_id');
    }
}