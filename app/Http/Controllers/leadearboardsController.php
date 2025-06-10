<?php

namespace App\Http\Controllers;

use App\Models\Leaderboard;
use Illuminate\Http\Request;

class leadearboardsController extends Controller
{
    public function index($mode)
    {
        if ($mode == "*")
            return Leaderboard::orderBy("score")->get();
        return Leaderboard::where("mode", $mode)->orderBy("score")->get();
    }

    public function store(Request $request)
    {
        if (Leaderboard::create($request->all()))
            return response()->json(['message' => "success"]);
        return response()->json(['message' => "all pizda"]);
    }


}
