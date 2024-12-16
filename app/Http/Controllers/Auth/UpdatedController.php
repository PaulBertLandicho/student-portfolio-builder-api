<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Skills;
use App\Models\User;
use App\Models\Professions;

class UpdatedController extends Controller
{
    public function editSettings() {
        return view('settings'); 
    }

    // Fetch the current About Me
    public function getAboutMe() {
        $user = Auth::user();
        return response()->json(['aboutMe' => $user->about_me]);
    }

    // Update About Me
    public function updateAboutMe(Request $request) {
        $request->validate([
            'aboutMe' => 'required|string|max:1000',
        ]);

        $user = Auth::user();
        $user->about_me = $request->input('aboutMe');
        $user->save();

        return response()->json(['success' => true]);
    }

    // Skills

    public function addSkill(Request $request) {
        try {
            $userId = Auth::id();
            $newSkills = $request->input('skills', []);

            foreach ($newSkills as $skill) {
                Skills::updateOrCreate(
                    ['user_id' => $userId, 'skills' => $skill]
                );
            }

            return response()->json(['status' => 'success', 'message' => 'Skills added successfully.']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function deleteSkill(Request $request) {
        try {
            $userId = Auth::id();
            $deleteSkill = $request->input('skills');

            Skills::where('user_id', $userId)->where('skills', $deleteSkill)->delete();

            return response()->json(['status' => 'success', 'message' => 'Skill deleted successfully.']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    //  Professions
    public function addProfession(Request $request) {
        try {
            $userId = Auth::id();
            $newProfessions = $request->input('professions', []);

            foreach ($newProfessions as $profession) {
                Professions::updateOrCreate(
                    ['user_id' => $userId, 'professions' => $profession]
                );
            }

            return response()->json(['status' => 'success', 'message' => 'Professions added successfully.']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function deleteProfession(Request $request) {
        try {
            $userId = Auth::id();
            $deleteProfession = $request->input('profession');

            Professions::where('user_id', $userId)->where('professions', $deleteProfession)->delete();

            return response()->json(['status' => 'success', 'message' => 'Profession deleted successfully.']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}
