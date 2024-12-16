<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\SetupController;
use App\Http\Controllers\Auth\UpdatedController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\Auth\ProjectController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\Projects;
use Inertia\Inertia;
 
  Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

  Route::get('/LoadingPage', function () {
    return Inertia::render('LoadingPage');
    })->name('LoadingPage');

  Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

  Route::middleware('auth')->group(function () {
    Route::get('/setup', fn() => Inertia::render('Setup'))->name('setup.create');
    Route::post('/setup', [SetupController::class, 'setup']);
});

  Route::middleware(['auth'])->group(function () {
    Route::get('/get-about-me', [UpdatedController::class, 'getAboutMe']);
    Route::post('/update-about-me', [UpdatedController::class, 'updateAboutMe']);
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::post('/projects/store', [ProjectController::class, 'store']);
    Route::delete('/projects/delete/{id}', [ProjectController::class, 'destroy']);
});

  Route::middleware('auth')->group(function () {
    Route::post('/profile/image/upload', [ProfileController::class, 'uploadProfileImage'])->name('profile.image.upload');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/setting', [ProfileController::class, 'index'])->name('profile.setting');
});

    Route::post('/skills/add', [UpdatedController::class, 'addSkill']);
    Route::delete('/skills/delete', [UpdatedController::class, 'deleteSkill']);
    Route::post('/professions/add', [UpdatedController::class, 'addProfession']);
    Route::delete('/professions/delete', [UpdatedController::class, 'deleteProfession']);



require __DIR__.'/auth.php';
