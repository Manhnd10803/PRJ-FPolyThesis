<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 10; $i++) {
            DB::table('posts')->insert([
                'user_id' => rand(1, 5),
                'content' => 'Fake content for post #abcff' . $i,
                'feeling' => 'Fake feeling for post ' . $i,
                'image' => json_encode(['image_url' => 'URL_fake']),
                'hashtag' => '#abcff',
                'status' => rand(0, 1),
                'views' => rand(0, 1000),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}