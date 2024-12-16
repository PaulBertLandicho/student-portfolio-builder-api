<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Projects;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{

     // Fetch all projects for the logged-in user
     public function index()
     {
         $projects = Projects::where('user_id', Auth::id())->get();
 
         return response()->json([
             'success' => true,
             'projects' => $projects,
         ]);
     }
     
    // Store new project
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'projectName' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'projectImage' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle the image upload
        if ($request->hasFile('projectImage')) {
            $image = $request->file('projectImage');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/projects'), $imageName);
        } else {
            $imageName = 'default_project.png';
        }

        // Save the project
        $project = new Projects();
        $project->user_id = Auth::id();
        $project->name = $validatedData['projectName'];
        $project->url = $validatedData['url'];
        $project->image = $imageName;
        $project->save();

        return response()->json([
            'success' => true,
            'project' => $project
        ]);
    }

    public function destroy($id)
    {
        $project = Projects::find($id);
        if ($project) {
            if ($project->image != 'default_project.png') {
                Storage::delete('images/projects/' . $project->image);
            }
            $project->delete();
            return response()->json(['status' => 'success', 'message' => 'Project deleted successfully!']);
        }

        return response()->json(['status' => 'error', 'message' => 'Project not found.']);
    }
}
