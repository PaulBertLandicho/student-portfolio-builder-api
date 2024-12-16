<?php


namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller; 
use App\Http\Controllers\ProjectController; 
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Projects;
use App\Models\Skills;
use App\Models\Professions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class ApiController extends Controller
{

   // Display user profile with skills, professions, and projects
   public function showProfile($id)
{
    // Fetch user data
    $user = User::select('fullname', 'name', 'address', 'contact', 'email', 'image', 'about_me')
        ->find($id);

    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    // Fetch professions, skills, and projects
    $professions = Professions::where('user_id', $id)->pluck('professions')->toArray();
    $skills = Skills::where('user_id', $id)->pluck('skills')->toArray();
    $projects = Projects::where('user_id', $id)->get();

    // Render the API page with data
    return Inertia::render('Api', [
        'user' => $user,
        'professions' => $professions,
        'skills' => $skills,
        'projects' => $projects,
    ]);
}

    
    // User search API controller
    public function searchUsers(Request $request)
{
    $query = $request->input('query');

    if (!$query) {
        return response()->json(['error' => 'Query parameter is required'], 400);
    }

    $users = User::where('fullname', 'LIKE', "%$query%")
        ->get(['id', 'fullname', 'image']);

    if ($users->isEmpty()) {
        return response()->json(['message' => 'No users found'], 404);
    }

    return response()->json($users);
}


// // test on thunder client/postman  

    public function list()  {
        return User::all();
    }
    
     function addUser(Request $request)  {
        $user = new User();
        $user->name=$request->name;
        $user->email=$request->email;
        $user->address=$request->address;
        $user->password=$request->password;
        $user->role_id=$request->role_id;
        $user->image=$request->image;

       if($user->save()){

        return ["result" => "User Successfully"];
       }else{
        return  ["result" => "not Successfully"];
    }
}
        
public function updateUser(Request $request)
{
    $validated = $request->validate([
        'id' => 'required|exists:users,id',
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'address' => 'nullable|string|max:255',
        'role_id' => 'required|integer',
        'password' => 'nullable|string|min:8',
        'image' => 'nullable|string', 
    ]);

    $user = User::find($request->id);

    if (!$user) {
        return response()->json(['result' => 'User not found'], 404);
    }

    if ($user->save()) {
        return response()->json(['result' => 'Updated User Successfully'], 200);
    } else {
        return response()->json(['result' => 'Failed to update user'], 500);
    }
}

    function deleteUser($id){
       $user = User::destroy($id);
       if($user){
        return["result"=> "User record deleted"];
    }else{
        return  ["result" => "not deleted"];
    }       
   }

   function searchUser($name) {
    $users = User::where('fullname', 'LIKE', "%$query%")
    ->get(['id', 'fullname', 'image']);

if ($users->isEmpty()) {
    return response()->json(['message' => 'No users found'], 404);
}

return response()->json($users);
}
}