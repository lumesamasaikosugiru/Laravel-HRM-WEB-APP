<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'status',
    ];

    public function employees()
    {
        return $this->belongsToMany(Employee::class, 'employee_project')
            ->withPivot('role_on_project')
            ->withTimestamps();
    }
}
