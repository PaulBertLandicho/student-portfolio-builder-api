<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Models\User;
use App\Models\Skills;
use App\Models\Projects;
use App\Models\Professions;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function uploadProfileImage(Request $request)
    {
        $request->validate([
            'image' => ['required', 'image', 'max:2048'], // Ensure it's an image and restrict size
        ]);

        $user = Auth::user();

        // Handle file upload
        $file = $request->file('image');
        $filename = time() . '.' . $file->getClientOriginalExtension();

        // Save image in public/images/profile
        $file->move(public_path('images/profile'), $filename);

        // Delete the old image if it exists
        if ($user->image && $user->image !== 'default.png') {
            $oldImagePath = public_path('images/profile/' . $user->image);
            if (file_exists($oldImagePath)) {
                unlink($oldImagePath);
            }
        }

        // Save the new image filename
        $user->image = $filename;
        $user->save();

        return response()->json(['message' => 'Profile image updated successfully!', 'image' => $filename], 200);
    }

    public function index(Request $request): Response
    {
        // Fetch Skills/Professions for the authenticated user
        $skills = Skills::where('user_id', auth()->user()->id)
            ->get()
            ->pluck('skills')
            ->toArray();
    
        $professions = Professions::where('user_id', auth()->user()->id)
            ->get()
            ->pluck('professions')
            ->toArray();
    
        // Render the settings page with skills and professions
        return Inertia::render('Profile/Setting', [

            'user' => auth()->user(),  // Pass authenticated user data
            'skills' => $skills,       // Pass skills/professions/projects data to the frontend
            'professions' => $professions,  
        ]);
    }
    

    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
    
  
    //   Update the user's profile information.
   
    public function update(ProfileUpdateRequest $request): RedirectResponse
{
    $request->user()->fill($request->validated());

    if ($request->user()->isDirty('email')) {
        $request->user()->email_verified_at = null;
    }

    $request->user()->save();

    return Redirect::route('profile.edit')->with('status', 'Profile updated successfully!');
}


    //  Delete the user's account.
    
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('login');
    }
}
