<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id'); 
            $table->string('name')->nullable();
            $table->string('fullname')->nullable();
            $table->string('email')->unique();
            $table->string('address')->nullable();
            $table->string('contact')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('image')->nullable();
            $table->unsignedBigInteger('role_id')->nullable();
            $table->string('gender')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->text('about_me')->nullable();

        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
