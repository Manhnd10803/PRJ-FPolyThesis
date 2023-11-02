<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $users = User::all();

        foreach ($users as $user) {
            foreach (range(1, 10) as $index) {
                Post::create([
                    'user_id' => $user->id,
                    'content' => $faker->paragraph,
                    'feeling' => $faker->word,
                    'image' => json_encode($faker->imageUrl()),
                    'hashtag' => $faker->word,
                    'status' => $faker->numberBetween(0, 1),
                    'views' => $faker->numberBetween(0, 1000),
                ]);
            }
        }
    }
}