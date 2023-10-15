<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friend extends Model
{
    use HasFactory;
    protected $fillable  = [
'user_id_1','user_id_2','status','friendship_type',
    ];
    public function friend()
{
    return $this->belongsTo(User::class, 'user_id_2');
}
}