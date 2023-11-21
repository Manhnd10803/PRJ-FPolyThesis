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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('reporter_id'); /* người báo cáo */
            $table->unsignedBigInteger('reported_id');/* người bị báo cáo  */
            $table->string('report_title'); /* Tiêu đề báo cáo */
            $table->text('report_content')->nullable(); /* Nội dung báo cáo(Nếu có)*/
            $table->string('report_type'); /* Loại báo cáo */
            $table->unsignedBigInteger('report_type_id'); /* Id của user post blog hoặc qa */
            $table->string('report_status'); /* Trạng thái báo cáo */
            $table->string('report_image')->nullable(); /* Hình ảnh báo cáo (Nếu có) */
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
