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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('event_creator');
            $table->string('event_name');
            $table->string('event_description');
            $table->string('event_time');
            $table->string('event_location');
            $table->string('event_type');
            // event_type ('concert','seminar','sports_event')
            $table->string('status')->default('unactive');
            //status ('unactive','active','end')
            $table->timestamps();
            $table->foreign('event_creator')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
