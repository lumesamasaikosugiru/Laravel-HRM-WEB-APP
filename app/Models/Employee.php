<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'user_id',
        'department_id',
        'position_id',
        'full_name',
        'email',
        'phone',
        'hire_date',
        'status',
        'photo_path'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
    public function position()
    {
        return $this->belongsTo(Position::class);
    }
    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
    public function leaveRequests()
    {
        return $this->hasMany(LeaveRequest::class);
    }
    public function projects()
    {
        return $this->belongsToMany(Project::class)
            ->withPivot('role_on_project')
            ->withTimestamps();
    }
}
