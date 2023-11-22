<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;
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
}