<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MinesLeaderboard extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'mode',
        'score',
    ];
}
