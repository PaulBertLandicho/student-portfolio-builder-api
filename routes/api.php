<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\ApiController;
use Inertia\Inertia;


    Route::get('/v1/users/{id}', [ApiController::class, 'showProfile'])->name('api.profile.show');
    Route::get('/users/search', [ApiController::class, 'searchUsers']);

    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// test on thunder client/postman  

    Route::get('/users', [ApiController::class, 'list']);
    Route::post('/add-users', [ApiController::class, 'addUser']);
    Route::put('/update-users', [ApiController::class, 'updateUser']);
    Route::delete('/delete-users/{id}', [ApiController::class, 'deleteUser']);


