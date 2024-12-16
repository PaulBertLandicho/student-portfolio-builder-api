<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Skills;
use App\Models\Projects;
use App\Models\Professions;

class DashboardController extends Controller
{
    public function index()
    {
        // Fetch Skills/Professions/Projects for the authenticated user
        $skills = Skills::where('user_id', auth()->user()->id)
            ->get()
            ->pluck('skills')
            ->toArray();

        $professions = Professions::where('user_id', auth()->user()->id)
            ->get()
            ->pluck('professions')
            ->toArray();

        $projects = Projects::where('user_id', auth()->user()->id)
        ->get();


         // Render the Dashboard page with skills/professions/projects
        return Inertia::render('Dashboard', [

            'user' => auth()->user(),        // Pass authenticated user data
            'skills' => $skills,             // Pass skills/professions/projects data to the frontend
            'professions' => $professions, 
            'projects' => $projects, 
        ]);
    }
}
