<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RolePermission extends Model
{
    use HasFactory;
    protected $fillable = [
        'role_id',
        'permission',
    ];
    public static function getUserPermistion($role_id) {
        return self::where('role_id', $role_id)->pluck('permission')->toArray();
    }
}
