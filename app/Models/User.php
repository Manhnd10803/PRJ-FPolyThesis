<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'group_id',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    public function messages()
    {
        return $this->hasMany(PrivateMessage::class, 'sender_id');
    }

    public function blogs()
    {
        return $this->hasMany(Blog::class, 'user_id');
    }
    public function friends()
    {
        return $this->belongsToMany(User::class, 'friends', 'user_id_1', 'user_id_2')
            ->withPivot('status')
            ->wherePivot('status', 'accepted');
    }
    public function posts()
    {
    return $this->hasMany(Post::class);
    }
    public function messagesSent() {
        return $this->hasMany(PrivateMessage::class, 'sender_id');
    }
    
    public function messagesReceived() {
        return $this->hasMany(PrivateMessage::class, 'receiver_id');
    }

    public function major()
    {
        return $this->belongsTo(Major::class);
    }

}