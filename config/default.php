<?php
return [
    'user' => [
        'password' => 'fpoly2023',
        'groupID' => [
            'superAdmin' => '1',
            'admin' => '2',
            'student' => '3',
            'guest' => '4',
        ],
        'status' => [
            'lock' => '0',
            'active' => '1',
        ],
    ],
    'blog' => [
        'status' => [
            'pending' => 0,
            'approved' => 1,
            'reject' => 2,
        ],
    ],
];
