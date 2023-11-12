<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'role_id'
    ];
    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }
    public function getPermissions($id)
    {
        return $id;
        $role_id = UserRole::where('user_id', $id)->first()->role_id;
        return $this->hasMany(RolePermission::class, $role_id);
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
