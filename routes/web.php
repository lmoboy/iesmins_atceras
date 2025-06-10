<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
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

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
