<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Blog;
use Illuminate\Support\Facades\DB;
class BlogSeeder extends Seeder
{
    public function run()
    {
        DB::table('blogs')->truncate(); // If you want to clear the table before seeding

        // Seed some example blogs
        Blog::create([
            'user_id' => 18,
            'title' => 'Sample Blog 1',
            'content' => 'This is the content of Sample Blog 1.',
            'thumbnail' => 'https://media.istockphoto.com/id/1498375824/vi/anh/h%C3%ACnh-th%C3%A0nh-%C4%91%C3%A1-%E1%BB%9F-sa-m%E1%BA%A1c-israel.webp?s=170667a&w=0&k=20&c=bUqBKEvtxa212gn1DbHvTC_qaD63f1XAYK0fx9dKjtA=',
            'majors_id' => 1,
            'hashtag' => 'sample, blog',
            'views' => 100,
            'status' => 1,
        ]);

        Blog::create([
            'user_id' => 18,
            'title' => 'Sample Blog 2',
            'content' => 'This is the content of Sample Blog 2.',
            'thumbnail' => 'https://images.unsplash.com/photo-1682687220211-c471118c9e92?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'majors_id' => 1,
            'hashtag' => 'sample, example',
            'views' => 150,
            'status' => 1,
        ]);

        // Add more Blog records as needed
    }
}