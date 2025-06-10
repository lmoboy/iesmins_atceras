<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get('/game')->assertRedirect('/login');
});

test('authenticated users can visit the game', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get('/game')->assertOk();
});