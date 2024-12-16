<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Notifications\Notifiable;
use App\Models\User;
use App\Models\Professions;
use App\Models\Skills;

class SetupController extends Controller
{
    public function setup(Request $request)
    {
        $userId = auth()->user()->id;

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'fullname' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'address' => 'required|string|max:255',
            'contact' => 'required|string|max:255|unique:users,contact',
            'gender' => 'required|string|max:255',
            'role_id' => 'required|integer|in:1,2',
        ]);

        $user = User::find($userId);

        // Handle profile picture
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/profile'), $filename);
            $user->image = $filename;
        }

        // Update user profile
        $user->update([
            'name' => $validatedData['name'],
            'fullname' => $validatedData['fullname'],
            'role_id' => $validatedData['role_id'],
            'address' => $validatedData['address'],
            'contact' => $validatedData['contact'],
            'gender' => $validatedData['gender'],
        ]);

        // Save professions
        foreach ($request->input('professions', []) as $profession) {
            Professions::create([
                'user_id' => $userId,
                'professions' => $profession,
            ]);
        }

        // Save skills
        foreach ($request->input('skills', []) as $skill) {
            Skills::create([
                'user_id' => $userId,
                'skills' => $skill,
            ]);
        }

        return redirect('/LoadingPage')->with('success', 'Profile setup successful!');
    }
}
