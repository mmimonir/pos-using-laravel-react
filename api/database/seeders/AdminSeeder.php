<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            'name' => 'Md Monirul Islam',
            'email' => 'admin@gmail.com',
            'phone' => '01974353555',
            'password' => Hash::make('12345678'),
            'role_id' => 1,

        ];
        User::create($data);
    }
}
