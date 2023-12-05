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
            'male' => '1',
            'female' => '2',
        ],
        'avatar' => [
            'default' => 'http://res.cloudinary.com/dgl6vfxqw/image/upload/v1700270799/blog/wh2x5kgmo3zla8r7y5tr.jpg',
        ],
        'score'=>[
            'like'=>1,
            'dislike'=>-1,
            'create_blog'=>10,
            'reject_blog'=>-10,
            'create_qa'=>5,
        ],
        'major' => [
            'default' => '1',
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
    'post' => [
        'status' => [
            'approved' => 1,
            'suspend' => 2
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
            'friend' => 'friend',
            'like_post' => 'like_post',
            'like_blog' => 'like_blog',
            'like_qa' => 'like_qa',
            'comment_post' => 'comment_post',
            'comment_blog' => 'comment_blog',
            'comment_qa' => 'comment_qa',
            'reply_post' => 'reply_post',
            'reply_blog' => 'reply_blog',
            'reply_qa' => 'reply_qa',
            'message' => 'message',
        ],
        'status' => [
            'not_seen' => 0,
            'seen' => 1,
        ]
    ],
    'report' => [
        'status' => [
            'pending' => 'pending',
            'resolved' => 'resolved',
            'dismissed' => 'dismissed',
        ]
    ],
];
