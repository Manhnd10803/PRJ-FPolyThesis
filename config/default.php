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
            'suspend' => '2',
        ],
    ],
    'blog' => [
        'status' => [
            'pending' => 0,
            'approved' => 1,
            'reject' => 2,
        ],
    ],
    'friend' => [
        'status' => [
            'pending' => 0,
            'accepted' => 1,
        ],
        'friendship_type' => [
            'request' => 0,
            'friend' => 1,
            'favourite' => 2,
        ]
    ],
    'valid_emotions' => ['like', 'love', 'haha', 'wow', 'sad', 'angry'],
];
