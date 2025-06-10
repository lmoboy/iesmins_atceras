<?php

use App\Http\Controllers\leadearboardsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('game', function () {
        return Inertia::render('easy');
    })->name('game');
    Route::get('game/easy', function () {
        return Inertia::render('easy');
    })->name('game.easy');
    Route::get('game/medium', function () {
        return Inertia::render('medium');
    })->name('game.medium');
    Route::get('game/hard', function () {
        return Inertia::render('hard');
    })->name('game.hard');
    Route::get('game/monster', function () {
        return Inertia::render('monster');
    })->name('game.monster');
    Route::get('leaderboard', function () {
        return Inertia::render('leaderboard');
    })->name('leaderboard');





    Route::get('leaderboard/{mode}', [leadearboardsController::class, 'index'])->name('leaderboard.index');
    Route::post('leaderboard/store', [leadearboardsController::class, 'store'])->name('leaderboard.store');


});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
