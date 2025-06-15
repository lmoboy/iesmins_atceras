<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Leaderboard;
use App\Models\MinesLeaderboard;
use App\Models\TypingLeaderboard;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'test@test.test',
            'email' => 'test@test.test',
            'password' => bcrypt('test@test.test')
        ]);

        Leaderboard::factory(10)->create();
        TypingLeaderboard::factory(10)->create();
        MinesLeaderboard::factory(10)->create();
    }
}
