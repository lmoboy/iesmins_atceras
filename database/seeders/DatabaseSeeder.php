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
            'name' => 'admin@admin.admin',
            'email' => 'admin@admin.admin',
            'password' => bcrypt(
                'admin@admin.admin')
        ]);

        Leaderboard::factory(10)->create();
        TypingLeaderboard::factory(10)->create();
        MinesLeaderboard::factory(10)->create();
    }
}
