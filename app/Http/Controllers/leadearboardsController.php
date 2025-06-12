<?php

namespace App\Http\Controllers;

use App\Models\Leaderboard;
use App\Models\TypingLeaderboard;
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


    public function typingMode($mode)
    {
        if ($mode == "*")
            return TypingLeaderboard::orderBy("score")->get();
        return TypingLeaderboard::where("mode", $mode)->orderBy("score")->get();
    }

    public function typingStore(Request $request)
    {
        if (TypingLeaderboard::create($request->all()))
            return response()->json(['message' => "success"]);
        return response()->json(['message' => "all pizda"]);
    }


}
