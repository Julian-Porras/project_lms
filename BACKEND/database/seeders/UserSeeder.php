<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'role_id'       => RoleEnum::ADMIN->value,
            'username'      => 'Porras',
            'first_name'    => 'Julian',
            'last_name'     => 'Porras',
            'middle_name'   => 'Aquino',
            'email_address' => 'porrasjulian10@gmail.com',
            'password'      => Hash::make('admin123'),
        ]);
    }
}
