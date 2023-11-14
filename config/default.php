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
        'gender' => [
            'male' => 1,
            'female' => 2,
        ]
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
    'post'=> [
        'status'=>[
            'approved'=>1,
            'suspend'=>2
        ]
    ],
    'valid_emotions' => ['dislike', 'like', 'love', 'haha', 'wow', 'sad', 'angry'],
    'private_messages' => [
        'status' => [
            'sending' => 0,
            'send' => 1,
            'read' => 2,
        ]
    ],
    'notification' => [
        'notification_type' => [
            'friend' => 1,
            'like_post' => 2,
            'like_blog' => 3,
            'like_qa' => 4,
            'comment_post' => 5,
            'comment_blog' => 6,
            'comment_qa' => 7,
            'reply_post' => 8,
            'reply_blog' => 9,
            'reply_qa' => 10,
        ],
        'status' => [
            'not_seen' => 0,
            'seen' => 1,
        ]
    ]
];
