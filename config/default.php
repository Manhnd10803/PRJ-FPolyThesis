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
            'follow' => 0,
            'friend' => 1,
        ]
    ],
    'valid_emotions' => ['dislike','like', 'love', 'haha', 'wow', 'sad', 'angry'],
    'private_messages' =>[
        'status'=>[
            'sending' => 0,
            'send' => 1,
            'read' => 2,
        ] 
    ]
];