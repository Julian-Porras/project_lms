<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\RoleModel;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [RoleEnum::ADMIN->value, 'admin'],
            [RoleEnum::DEVELOPER->value, 'developer'],
            [RoleEnum::INSTRUCTOR->value, 'instructor'],
            [RoleEnum::STUDENT->value, 'student'],
        ];

        foreach($roles as $role){
            RoleModel::insert([
                "id"            => $role[0],
                "role_name"     => $role[1],
            ]);
        }
    }
}
