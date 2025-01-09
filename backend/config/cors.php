<?php

return [

    'paths' => ['api/*', 'login', 'sanctum/csrf-cookie'], // Sesuaikan dengan path API Anda

    'allowed_methods' => ['*'], // Izinkan semua metode (GET, POST, dll.)

    'allowed_origins' => ['http://localhost:5173'], // URL frontend React Anda

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // Izinkan semua header

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // Aktifkan jika menggunakan autentikasi berbasis cookie
];
