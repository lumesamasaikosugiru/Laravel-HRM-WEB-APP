<?php

namespace App\Filament\Resources\Employees\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class EmployeeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                //section 1--------------
                Section::make()
                    ->description('Employee Information')
                    ->schema([
                        Select::make('user_id')
                            ->relationship('user', 'name')
                            ->required(),
                        Select::make('department_id')
                            ->relationship('department', 'name')
                            ->required(),
                        Select::make('position_id')
                            ->relationship('position', 'name')
                            ->required(),
                        DateTimePicker::make('hire_date')
                            ->default(now()),
                        Select::make('status')
                            ->options(['active' => 'Active', 'inactive' => 'Inactive'])
                            ->required(),
                    ]),

                Section::make()
                    ->description('Personal Information')
                    ->schema([
                        TextInput::make('full_name')
                            ->required(),
                        TextInput::make('email')
                            ->label('Email address')
                            ->email()
                            ->required(),
                        TextInput::make('phone')
                            ->tel()
                            ->default(null),
                        FileUpload::make('photo_path')
                            ->default(null),
                    ]),
            ]);
    }
}
