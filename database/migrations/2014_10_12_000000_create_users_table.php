<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('password');
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->integer('group_id')->comment('1-superadmin, 2-admin, 3-student, 4-guest');
            $table->string('email')->unique();
            $table->date('birthday')->nullable();
            $table->string('avatar')->nullable();
            $table->string('phone',10)->nullable();
            $table->text('address')->nullable();
            $table->text('biography')->nullable();
            $table->string('gender')->nullable();
            $table->integer('status')->nullable();
            $table->unsignedBigInteger('major_id')->nullable();
            $table->string('permissions')->nullable();
            $table->string('verification_code')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
