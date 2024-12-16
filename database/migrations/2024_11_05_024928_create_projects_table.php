<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->bigIncrements('id'); 
            $table->unsignedBigInteger('user_id'); 
            $table->string('name'); 
            $table->string('image')->nullable(); 
            $table->string('url');
            $table->timestamps(); 

        });
    }

    public function down()
    {
        Schema::dropIfExists('projects'); 
    }
}
