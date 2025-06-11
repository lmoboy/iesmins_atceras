<?php

use App\Http\Controllers\leadearboardsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    //main card game routes
    Route::get('game', function () {
        return Inertia::render('cards/easy');
    })->name('game');
    Route::get('game/easy', function () {
        return Inertia::render('cards/easy');
    })->name('game.easy');
    Route::get('game/medium', function () {
        return Inertia::render('cards/medium');
    })->name('game.medium');
    Route::get('game/hard', function () {
        return Inertia::render('cards/hard');
    })->name('game.hard');
    Route::get('game/monster', function () {
        return Inertia::render('cards/monster');
    })->name('game.monster');
    Route::get('game/leaderboard', function () {
        return Inertia::render('cards/leaderboard');
    })->name('leaderboard');

    //main card game api
    Route::get('leaderboard/{mode}', [leadearboardsController::class, 'index'])->name('leaderboard.index');
    Route::post('leaderboard/store', [leadearboardsController::class, 'store'])->name('leaderboard.store');



    //typing game routes
    Route::get('typing', function () {
        return Inertia::render('typing/game');
    })->name('typing');



    //typing game api


});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
